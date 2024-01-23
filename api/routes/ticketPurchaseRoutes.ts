import express from 'express';
import { TicketPurchaseController } from '../controllers/ticketPurchaseController';
import { checkPurchaser } from '../middleware/checkPurchaserMiddleware';

const router = express.Router();
const ticketPurchaseController = new TicketPurchaseController();

export const ticketPurchaseRoutes = () => {

  router.post('/', checkPurchaser, ticketPurchaseController.createTicketPurchase);

  router.get('/e-wallet/:userId', ticketPurchaseController.Ewallet);
  return router;
}