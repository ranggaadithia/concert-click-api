"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentNotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const paymentNotifController_1 = require("../controllers/paymentNotifController");
const router = express_1.default.Router();
const paymentNotifController = new paymentNotifController_1.PaymentNotifController();
const paymentNotificationRoutes = () => {
    router.post('/', paymentNotifController.notification);
    return router;
};
exports.paymentNotificationRoutes = paymentNotificationRoutes;
//# sourceMappingURL=paymentNotifRoutes.js.map