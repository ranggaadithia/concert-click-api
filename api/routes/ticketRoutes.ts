import express from 'express';
import { TicketController } from '../controllers/ticketController';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware';

const routes = express.Router();

const ticketController = new TicketController();