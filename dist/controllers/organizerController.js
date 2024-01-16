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
exports.OrganizerController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class OrganizerController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizers = yield prisma.organizer.findMany();
                return res.status(200).send({
                    status: "success",
                    message: "List organizer",
                    data: organizers,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const organizer = yield prisma.organizer.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                });
                return res.status(201).send({
                    status: "success",
                    message: "Organizer created",
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const organizer = yield prisma.organizer.findFirst({
                    where: {
                        email,
                    },
                });
                if (!organizer) {
                    return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, organizer.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
                }
                const secretKey = process.env.SECRET_KEY;
                const token = jsonwebtoken_1.default.sign({ email, id: organizer.id, name: organizer.name }, secretKey, { expiresIn: '1h' });
                return res.status(201).json({
                    status: "success",
                    message: "Login success",
                    token,
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ status: "Failed", message: "Internal server Error" });
            }
        });
    }
    bio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.organizerId;
            const { phone, address, about, url, sosmed } = req.body;
            try {
                const organizer = yield prisma.organizer.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        phone,
                        address,
                        about,
                        url,
                        sosmed,
                    },
                });
                return res.status(201).send({
                    status: "success",
                    message: "Organizer updated",
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server Error" });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.organizerId;
            try {
                const organizer = yield prisma.organizer.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                return res.status(200).send({
                    status: "success",
                    message: "Organizer detail",
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server Error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.organizerId;
            try {
                const organizer = yield prisma.organizer.delete({
                    where: {
                        id: Number(id),
                    },
                });
                return res.status(200).send({
                    status: "success",
                    message: "Organizer deleted",
                    data: organizer,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server Error" });
            }
        });
    }
}
exports.OrganizerController = OrganizerController;
//# sourceMappingURL=organizerController.js.map