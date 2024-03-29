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
exports.PaymentNotifController = void 0;
const client_1 = require("@prisma/client");
const midtransClient = require('midtrans-client');
let apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});
const prisma = new client_1.PrismaClient();
class PaymentNotifController {
    constructor() {
        this.notification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const notificationJson = req.body;
            apiClient.transaction.notification(notificationJson)
                .then((statusResponse) => __awaiter(this, void 0, void 0, function* () {
                let { order_id, transaction_status, fraud_status, payment_type } = statusResponse;
                const ticketPurchase = yield prisma.ticketPurchase.findUnique({
                    where: { id: order_id }
                });
                if (transaction_status == 'capture' && fraud_status == 'accept') {
                    yield this.updateTransactionStatus(ticketPurchase.id, ticketPurchase.ticketId, ticketPurchase.quantity, payment_type, "SUCCESS", res);
                }
                else if (transaction_status == 'settlement') {
                    yield this.updateTransactionStatus(ticketPurchase.id, ticketPurchase.ticketId, ticketPurchase.quantity, payment_type, "SUCCESS", res);
                }
                else if (transaction_status == 'cancel' ||
                    transaction_status == 'deny' ||
                    transaction_status == 'expire') {
                    yield this.updateTransactionStatus(ticketPurchase.id, ticketPurchase.ticketId, ticketPurchase.quantity, payment_type, "FAILED", res);
                }
                else if (transaction_status == 'pending') {
                    yield this.updateTransactionStatus(ticketPurchase.id, ticketPurchase.ticketId, ticketPurchase.quantity, payment_type, "PENDING", res);
                }
            }))
                .catch((error) => {
                console.error('Error processing notification:', error);
                res.status(500).send('Internal Server Error');
            });
        });
    }
    updateTransactionStatus(ticketPurchaseId, ticketId, quantity, paymentType, transactionStatus, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.ticketPurchase.update({
                    where: { id: ticketPurchaseId },
                    data: {
                        paymentType: paymentType,
                        transactionStatus: transactionStatus,
                    },
                });
                if (transactionStatus == 'SUCCESS') {
                    try {
                        yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                            // Update ticket stock
                            yield prismaTransaction.ticket.update({
                                where: { id: ticketId },
                                data: {
                                    stock: {
                                        decrement: quantity,
                                    },
                                },
                            });
                            // Get eventId from the ticket
                            const ticket = yield prismaTransaction.ticket.findUnique({
                                where: { id: ticketId },
                                select: {
                                    eventId: true,
                                },
                            });
                            // Update event ticketSales
                            yield prismaTransaction.event.update({
                                where: { id: ticket === null || ticket === void 0 ? void 0 : ticket.eventId },
                                data: {
                                    ticketSales: {
                                        increment: quantity,
                                    },
                                },
                            });
                        }));
                    }
                    catch (error) {
                        console.error('Error updating ticket or event:', error);
                        res.status(500).send('Internal Server Error');
                    }
                }
                res.status(200).send('Ok');
            }
            catch (error) {
                console.error('Error updating transaction status:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.PaymentNotifController = PaymentNotifController;
//# sourceMappingURL=paymentNotifController.js.map