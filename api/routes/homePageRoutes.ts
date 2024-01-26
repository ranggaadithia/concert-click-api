import express from 'express';
import { HomePageController } from '../controllers/homePageController';

const router = express.Router();
const homePageController = new HomePageController();

export const homePageRoutes = () => {
  router.get('/events', homePageController.getAllEvents);
  router.get('/event/:id', homePageController.getEventById);
  router.get('/top-events', homePageController.getTopEvents);
  router.get('/organizers', homePageController.getAllOrganizers);
  router.get('/organizers/:id', homePageController.getOrganizerById);
  return router
}