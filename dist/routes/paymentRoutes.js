"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const paymentController = new paymentController_1.PaymentController();
const router = express_1.default.Router();
const paymentRoutes = () => {
    router.get('/e-wallet/:ticketPurchaseId', paymentController.Ewallet);
    router.get('/virtual-account/:bank/:ticketPurchaseId', paymentController.VirtualAccount);
    return router;
};
exports.paymentRoutes = paymentRoutes;
//# sourceMappingURL=paymentRoutes.js.map