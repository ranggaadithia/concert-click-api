import express from "express";
import multer from "multer";
import { EventController } from "../controllers/eventController";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";

const eventController = new EventController();

const routes = express.Router();
const upload = multer({ dest: 'uploads/' })

export const eventRouter = () => {
 routes.use('/', checkAuthMiddleware);
 routes.get('/', eventController.index);
 routes.post('/', upload.single('banner'), eventController.create);

 return routes;
}