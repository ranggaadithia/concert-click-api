import express from 'express';
import { PaymentNotifController } from '../controllers/paymentNotifController';

const router = express.Router();
const paymentNotifController = new PaymentNotifController();

export const paymentNotificationRoutes = () => {

  router.post('/', paymentNotifController.notification);

  return router
}