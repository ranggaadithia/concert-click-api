import express from "express";
import { PaymentController } from "../controllers/paymentController";

const paymentController = new PaymentController();

const router = express.Router();

export const paymentRoutes = () => {
  router.get('/e-wallet/:ticketPurchaseId', paymentController.Ewallet);
  
  return router;
};