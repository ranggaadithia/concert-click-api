import express from "express";
import { upload } from "../utility/uploadFile";
import { EventController } from "../controllers/eventController";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";

const eventController = new EventController();

const routes = express.Router();

export const eventRouter = () => {
 routes.get('/', checkAuthMiddleware, eventController.index);
 routes.post('/', upload.single('banner'), checkAuthMiddleware,  eventController.create);

 return routes;
}