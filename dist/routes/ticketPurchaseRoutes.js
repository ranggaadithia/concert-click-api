"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketPurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ticketPurchaseController_1 = require("../controllers/ticketPurchaseController");
const checkPurchaserMiddleware_1 = require("../middleware/checkPurchaserMiddleware");
const router = express_1.default.Router();
const ticketPurchaseController = new ticketPurchaseController_1.TicketPurchaseController();
const ticketPurchaseRoutes = () => {
    router.post('/', checkPurchaserMiddleware_1.checkPurchaser, ticketPurchaseController.createTicketPurchase);
    router.get('/e-wallet/:ticketPurchaseId', ticketPurchaseController.Ewallet);
    return router;
};
exports.ticketPurchaseRoutes = ticketPurchaseRoutes;
//# sourceMappingURL=ticketPurchaseRoutes.js.map