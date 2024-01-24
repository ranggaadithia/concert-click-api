import express from "express";
import multer from "../utility/uploadFile";
import { EventController } from "../controllers/eventController";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";

const eventController = new EventController();

const routes = express.Router();

export const eventRouter = () => {
 routes.get('/', checkAuthMiddleware, eventController.index);
 routes.post('/', multer.single('banner'), checkAuthMiddleware,  eventController.create);
 routes.delete('/:id', checkAuthMiddleware, eventController.delete);
 return routes;
}