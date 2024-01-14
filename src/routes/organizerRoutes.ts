import { PrismaClient } from "@prisma/client";
import express, {Request, Response} from "express";

const prisma = new PrismaClient();

const routes = express.Router();

export const organizerRouter = () => {
  routes.get('/', async (req: Request, res: Response) => {
      const organizers = await prisma.organizer.findMany();
      res.json(organizers);
  });
  return routes;
}
