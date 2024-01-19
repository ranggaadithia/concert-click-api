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
exports.TicketController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TicketController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            const tickets = yield prisma.ticket.findMany({
                where: {
                    eventId: Number(eventId)
                }
            }).then((tickets) => {
                res.send({
                    status: 'success',
                    message: 'Tickets retrieved',
                    data: tickets
                });
            }).catch((err) => {
                res.status(500).send({
                    status: "Failed",
                    err
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            const { name, price, description, stock, status, startSale, endSale } = req.body;
            const ticket = yield prisma.ticket.create({
                data: {
                    name,
                    price,
                    description,
                    stock,
                    status,
                    eventId: Number(eventId),
                    startSale,
                    endSale
                }
            }).then((ticket) => {
                res.send({
                    status: 'success',
                    message: 'Ticket created',
                    data: ticket
                });
            }).catch((err) => {
                res.status(500).send({
                    status: "Failed",
                    err
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticket = yield prisma.ticket.delete({
                where: {
                    id: Number(id)
                }
            }).then((ticket) => {
                res.send({
                    status: 'success',
                    message: 'Ticket deleted',
                    data: ticket
                });
            }).catch((err) => {
                res.status(500).send({
                    status: "Failed",
                    err
                });
            });
        });
    }
}
exports.TicketController = TicketController;
//# sourceMappingURL=ticketController.js.map