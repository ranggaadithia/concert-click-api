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
exports.EventController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EventController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, id } = req.body.user; // auth user
            yield prisma.event.findMany({
                where: {
                    organizerId: id
                }
            }).then((events) => {
                res.status(200).json({
                    status: 'success',
                    message: `List of Events by ${name}`,
                    data: events
                });
            }).catch((err) => {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            });
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, banner, artists, locationName, locationUrl, dateStart, dateEnd, timeStart, timeEnd } = req.body;
            try {
                const organizerId = req.body.user.id; // auth user
                const banner = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
                const event = yield prisma.event.create({
                    data: {
                        name,
                        description,
                        banner,
                        artists,
                        organizerId,
                        locationName,
                        locationUrl,
                        dateStart,
                        dateEnd,
                        timeStart,
                        timeEnd
                    }
                });
                return res.status(201).json({
                    status: 'success',
                    message: 'Event created',
                    data: event
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    status: 'error',
                    message: err
                });
            }
        });
    }
}
exports.EventController = EventController;
//# sourceMappingURL=eventController.js.map