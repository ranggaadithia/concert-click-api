"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = __importDefault(require("../utility/uploadFile"));
const eventController_1 = require("../controllers/eventController");
const checkAuthMiddleware_1 = require("../middleware/checkAuthMiddleware");
const eventController = new eventController_1.EventController();
const routes = express_1.default.Router();
const eventRouter = () => {
    routes.get('/', checkAuthMiddleware_1.checkAuthMiddleware, eventController.index);
    routes.post('/', uploadFile_1.default.single('banner'), checkAuthMiddleware_1.checkAuthMiddleware, eventController.create);
    routes.delete('/:id', checkAuthMiddleware_1.checkAuthMiddleware, eventController.delete);
    return routes;
};
exports.eventRouter = eventRouter;
//# sourceMappingURL=eventRoutes.js.map