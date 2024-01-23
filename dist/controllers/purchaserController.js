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
exports.PurchaserController = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class PurchaserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.purchaser.findMany()
                .then((purchasers) => {
                res.status(200).json({
                    status: 'success',
                    message: `List of Purchasers`,
                    data: purchasers
                });
            }).catch((err) => {
                res.status(500).json({
                    status: 'error',
                    message: err
                });
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phone, nik, birthdate, gender, email } = req.body;
            yield prisma.purchaser.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    nik,
                    birthdate,
                    gender
                }
            }).then((purchaser) => {
                const secretKey = process.env.SECRET_KEY;
                const token = jsonwebtoken_1.default.sign({ id: purchaser.id }, secretKey, { expiresIn: '1h' });
                res.status(200).json({
                    status: 'success',
                    message: `Purchaser created`,
                    token,
                    data: purchaser
                });
            }).catch((err) => {
                res.status(500).json({
                    status: 'error',
                    message: err
                });
            });
        });
    }
}
exports.PurchaserController = PurchaserController;
//# sourceMappingURL=purchaserController.js.map