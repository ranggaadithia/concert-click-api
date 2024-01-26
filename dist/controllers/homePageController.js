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
exports.HomePageController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class HomePageController {
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield prisma.event.findMany();
                return res.status(200).send({
                    status: "success",
                    message: "List events",
                    data: events,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const event = yield prisma.event.findUnique({
                    where: {
                        id: Number(id),
                    },
                    include: {
                        Ticket: true
                    }
                });
                return res.status(200).send({
                    status: "success",
                    message: "List event",
                    data: event,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    getTopEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield prisma.event.findMany({
                    take: 3,
                    orderBy: {
                        ticketSales: 'desc'
                    }
                });
                return res.status(200).send({
                    status: "success",
                    message: "List events",
                    data: events,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    getAllOrganizers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizers = yield prisma.organizer.findMany();
                return res.status(200).send({
                    status: "success",
                    message: "List organizers",
                    data: organizers,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    getOrganizerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const organizer = yield prisma.organizer.findUnique({
                    where: {
                        id: Number(id),
                    }, include: {
                        Event: true
                    }
                });
                return res.status(200).send({
                    status: "success",
                    message: "List organizer",
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
}
exports.HomePageController = HomePageController;
//# sourceMappingURL=homePageController.js.map