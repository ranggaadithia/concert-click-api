"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const checkAuthMiddleware_1 = require("../middleware/checkAuthMiddleware");
const routes = express_1.default.Router();
const ticketController = new ticketController_1.TicketController();
const ticketRouter = () => {
    routes.get('/event/:eventId', ticketController.index);
    routes.post('/event/:eventId', checkAuthMiddleware_1.checkAuthMiddleware, ticketController.create);
    routes.delete('/:id', checkAuthMiddleware_1.checkAuthMiddleware, ticketController.delete);
    return routes;
};
exports.ticketRouter = ticketRouter;
//# sourceMappingURL=ticketRoutes.js.map