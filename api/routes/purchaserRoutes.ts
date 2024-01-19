import express from 'express';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware';
import { PurchaserController } from '../controllers/purchaserController';

const router = express.Router();
const purchaserController = new PurchaserController();

export const purchaserRouter = () => {
  router.get('/', checkAuthMiddleware, purchaserController.index);
  router.post('/', purchaserController.register);
  return router
}

