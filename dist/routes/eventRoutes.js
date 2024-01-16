"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const eventController_1 = require("../controllers/eventController");
const checkAuthMiddleware_1 = require("../middleware/checkAuthMiddleware");
const eventController = new eventController_1.EventController();
const routes = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'banners');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
const eventRouter = () => {
    routes.use('/', checkAuthMiddleware_1.checkAuthMiddleware);
    routes.get('/', eventController.index);
    routes.post('/', upload.single('banner'), checkAuthMiddleware_1.checkAuthMiddleware, eventController.create);
    return routes;
};
exports.eventRouter = eventRouter;
//# sourceMappingURL=eventRoutes.js.map