import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketPurchaseController {
  async createTicketPurchase(req: Request, res: Response) {
    const { ticketId } = req.params;
    const purchaserId  = req.body.purchaser.id;
    const quantity = req.body.quantity;

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: Number(ticketId),
      }
    });

    if (!Number(ticketId)) {
      res.status(404).json({ error: `Ticket with id ${ticketId} not found` });
      return;
    }
    const totalPrice = ticket!.price * quantity;

    try {
      const TicketPurchase = await prisma.ticketPurchase.create({
        data: {
          purchaserId,
          ticketId: Number(ticketId),
          quantity,
          totalPrice,
        }
      });
      res.status(201).json(TicketPurchase);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  }
}