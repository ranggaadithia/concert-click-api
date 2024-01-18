import express from 'express';
import { TicketController } from '../controllers/ticketController';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware';

const routes = express.Router();

const ticketController = new TicketController();

export const ticketRouter = () => {
 routes.get('/event/:eventId',  ticketController.index);
 routes.post('/event/:eventId', checkAuthMiddleware, ticketController.create);
 routes.delete('/:id', checkAuthMiddleware, ticketController.delete);
 return routes;
}