import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { core } from '../utility/midtransPayment';
import { v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

export class TicketPurchaseController {
  async createTicketPurchase(req: Request, res: Response) {
    const purchaserId  = req.body.purchaser.id;
    const id = uuidv4();
    const {quantity, ticketId} = req.body;

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
          id: String(id),
          purchaserId,
          ticketId,
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
  async Ewallet(req: Request, res: Response) {
    const ticketPurchaseId = req.params.ticketPurchaseId;  
    const data = await prisma.ticketPurchase.findMany({
      where: {
        id: ticketPurchaseId,
      },
      include: {
        Ticket: true,
        Purchaser: true,
      }
    });

    let parameter = {
      "payment_type": "gopay",
      "transaction_details": {
          "gross_amount": data[0].totalPrice,
          "order_id": data[0].id,
      },
      "gopay": {
          "enable_callback": true,                
          "callback_url": "http://localhost:3000/"  
      }, 
      "item_details": data.map(item => ({
        "id": item.id,
        "price": item.Ticket.price,
        "quantity": item.quantity,
        "name": item.Ticket.name,
      })),
      "customer_details": data.map(item => ({
        "first_name": item.Purchaser.firstName,
        "last_name": item.Purchaser.lastName,
        "email": item.Purchaser.email,
        "phone": item.Purchaser.phone,
      })),
    };

    core.charge(parameter)
    .then((chargeResponse: any)=>{
        return res.json(chargeResponse)
    });
  
  }

}