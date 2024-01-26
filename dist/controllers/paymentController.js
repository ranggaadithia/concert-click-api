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
exports.PaymentController = void 0;
const client_1 = require("@prisma/client");
const midtransPayment_1 = require("../utility/midtransPayment");
const prisma = new client_1.PrismaClient();
class PaymentController {
    Ewallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketPurchaseId = req.params.ticketPurchaseId;
            const data = yield prisma.ticketPurchase.findUnique({
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
                    "gross_amount": data.totalPrice,
                    "order_id": data.id,
                },
                "item_details": {
                    "id": data === null || data === void 0 ? void 0 : data.id,
                    "price": data === null || data === void 0 ? void 0 : data.Ticket.price,
                    "quantity": data === null || data === void 0 ? void 0 : data.quantity,
                    "name": data === null || data === void 0 ? void 0 : data.Ticket.name,
                },
                "customer_details": {
                    "first_name": data === null || data === void 0 ? void 0 : data.Purchaser.firstName,
                    "last_name": data === null || data === void 0 ? void 0 : data.Purchaser.lastName,
                    "email": data === null || data === void 0 ? void 0 : data.Purchaser.email,
                    "phone": data === null || data === void 0 ? void 0 : data.Purchaser.phone,
                },
            };
            midtransPayment_1.core.charge(parameter)
                .then((chargeResponse) => {
                return res.json(chargeResponse);
            });
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=paymentController.js.map