import express from "express";
import multer from "multer";
import { EventController } from "../controllers/eventController";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";

const eventController = new EventController();

const routes = express.Router();
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'banners')
 },
 filename: function (req, file, cb) {
   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   cb(null, file.fieldname+ '-' +uniqueSuffix + '-' + file.originalname)
 }
})
const upload = multer({storage})

export const eventRouter = () => {
 routes.use('/', checkAuthMiddleware);
 routes.get('/', eventController.index);
 routes.post('/', upload.single('banner'), checkAuthMiddleware,  eventController.create);

 return routes;
}