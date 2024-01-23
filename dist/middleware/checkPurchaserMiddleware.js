"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPurchaser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkPurchaser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Purchaser Token Require' });
            }
            req.body.purchaser = decoded;
            next();
        });
    }
    else {
        return res.status(401).json({ message: 'Purchaser Token Require' });
    }
};
exports.checkPurchaser = checkPurchaser;
//# sourceMappingURL=checkPurchaserMiddleware.js.map