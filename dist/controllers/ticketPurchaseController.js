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
            const userId = req.params.userId;
            const purchaser = yield prisma.purchaser.findUnique({
                where: {
                    id: Number(userId),
                }, select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                }
            });
            const data = yield prisma.ticketPurchase.findMany({
                where: {
                    purchaserId: Number(userId),
                },
                include: {
                    Ticket: {
                        select: {
                            name: true,
                            price: true
                        },
                    },
                }
            });
            const totalAmount = data.reduce((acc, curr) => {
                return acc + curr.totalPrice;
            }, 0);
            let parameter = {
                "payment_type": "gopay",
                "transaction_details": {
                    "gross_amount": totalAmount,
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
                "customer_details": {
                    "first_name": purchaser.firstName,
                    "last_name": purchaser.lastName,
                    "email": purchaser.email,
                    "phone": purchaser.phone,
                },
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