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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
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
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, artists, locationName, locationUrl, dateStart, dateEnd, timeStart, timeEnd } = req.body;
            try {
                const organizerId = req.body.user.id; // auth user
                const reqfile = req.file;
                const banner = reqfile.publicUrl;
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const event = yield prisma.event.delete({
                    where: {
                        id: Number(id)
                    }
                });
                if (event.banner) {
                    fs_1.default.unlinkSync(`./banners/${event.banner}`);
                }
                return res.status(200).json({
                    status: 'success',
                    message: 'Event deleted',
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