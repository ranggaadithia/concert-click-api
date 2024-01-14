import { PrismaClient } from "@prisma/client";
import express from "express";
import { OrganizerController } from "../controllers/organizerController";

const organizerController = new OrganizerController();

const routes = express.Router();

export const organizerRouter = () => {
  routes.get('/', organizerController.index);
  routes.post('/register', organizerController.register);
  return routes;
}
