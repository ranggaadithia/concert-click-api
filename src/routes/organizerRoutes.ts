import express from "express";
import { OrganizerController } from "../controllers/organizerController";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";

const organizerController = new OrganizerController();

const routes = express.Router();

export const organizerRouter = () => {
  routes.get('/', organizerController.index);
  routes.get('/:organizerId', organizerController.show);
  routes.delete('/:organizerId', organizerController.delete);
  routes.post('/login', organizerController.login);
  routes.post('/register', organizerController.register);
  routes.use('/bio/:organizerId', checkAuthMiddleware);
  routes.put('/bio/:organizerId', organizerController.bio);
  return routes;
}
