"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homePageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const homePageController_1 = require("../controllers/homePageController");
const router = express_1.default.Router();
const homePageController = new homePageController_1.HomePageController();
const homePageRoutes = () => {
    router.get('/events', homePageController.getAllEvents);
    router.get('/event/:id', homePageController.getEventById);
    router.get('/top-events', homePageController.getTopEvents);
    router.get('/organizers', homePageController.getAllOrganizers);
    router.get('/organizers/:id', homePageController.getOrganizerById);
    return router;
};
exports.homePageRoutes = homePageRoutes;
//# sourceMappingURL=homePageRoutes.js.map