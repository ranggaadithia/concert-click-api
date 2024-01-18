"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizerRouter = void 0;
const express_1 = __importDefault(require("express"));
const organizerController_1 = require("../controllers/organizerController");
const checkAuthMiddleware_1 = require("../middleware/checkAuthMiddleware");
const organizerController = new organizerController_1.OrganizerController();
const routes = express_1.default.Router();
const organizerRouter = () => {
    routes.get('/', organizerController.index);
    routes.get('/:organizerId', organizerController.show);
    routes.delete('/:organizerId', organizerController.delete);
    routes.post('/login', organizerController.login);
    routes.post('/register', organizerController.register);
    routes.use('/bio/:organizerId', checkAuthMiddleware_1.checkAuthMiddleware);
    routes.put('/bio/:organizerId', organizerController.bio);
    return routes;
};
exports.organizerRouter = organizerRouter;
//# sourceMappingURL=organizerRoutes.js.map