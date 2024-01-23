"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaserRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuthMiddleware_1 = require("../middleware/checkAuthMiddleware");
const purchaserController_1 = require("../controllers/purchaserController");
const router = express_1.default.Router();
const purchaserController = new purchaserController_1.PurchaserController();
const purchaserRouter = () => {
    router.get('/', checkAuthMiddleware_1.checkAuthMiddleware, purchaserController.index);
    router.post('/', purchaserController.register);
    return router;
};
exports.purchaserRouter = purchaserRouter;
//# sourceMappingURL=purchaserRoutes.js.map