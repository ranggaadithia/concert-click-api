"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketPurchaseController = void 0;
const client_1 = require("@prisma/client");
const midtransPayment_1 = require("../utility/midtransPayment");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class TicketPurchaseController {
    createTicketPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchaserId = req.body.purchaser.id;
            const id = (0, uuid_1.v4)();
            const { quantity, ticketId } = req.body;
            const ticket = yield prisma.ticket.findUnique({
                where: {
                    id: Number(ticketId),
                }
            });
            if (!Number(ticketId)) {
                res.status(404).json({ error: `Ticket with id ${ticketId} not found` });
                return;
            }
            const totalPrice = ticket.price * quantity;
            try {
                const TicketPurchase = yield prisma.ticketPurchase.create({
                    data: {
                        id: String(id),
                        purchaserId,
                        ticketId,
                        quantity,
                        totalPrice,
                    }
                });
                res.status(201).json(TicketPurchase);
            }
            catch (err) {
                res.status(400).json(err);
                console.log(err);
            }
        });
    }
    Ewallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketPurchaseId = req.params.ticketPurchaseId;
            const data = yield prisma.ticketPurchase.findMany({
                where: {
                    id: ticketPurchaseId,
                },
                include: {
                    Ticket: true,
                    Purchaser: true,
                }
            });
            let parameter = {
                "payment_type": "gopay",
                "transaction_details": {
                    "gross_amount": data[0].totalPrice,
                    "order_id": data[0].id,
                },
                "gopay": {
                    "enable_callback": true,
                    "callback_url": "http://localhost:3000/"
                },
                "item_details": data.map(item => ({
                    "id": item.id,
                    "price": item.Ticket.price,
                    "quantity": item.quantity,
                    "name": item.Ticket.name,
                })),
                "customer_details": data.map(item => ({
                    "first_name": item.Purchaser.firstName,
                    "last_name": item.Purchaser.lastName,
                    "email": item.Purchaser.email,
                    "phone": item.Purchaser.phone,
                })),
            };
            midtransPayment_1.core.charge(parameter)
                .then((chargeResponse) => {
                return res.json(chargeResponse);
            });
        });
    }
}
exports.TicketPurchaseController = TicketPurchaseController;
//# sourceMappingURL=ticketPurchaseController.js.map