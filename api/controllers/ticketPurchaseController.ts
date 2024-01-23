import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { core } from '../utility/midtransPayment';
import { v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

export class TicketPurchaseController {
  async createTicketPurchase(req: Request, res: Response) {
    const purchaserId  = req.body.purchaser.id;
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
  async getUserTicket(req: Request, res: Response) {
    const userId = req.params.userId;  
    const purchaser = await prisma.purchaser.findUnique({
      where: {
        id: Number(userId),
      }, select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      }
    });
    const data = await prisma.ticketPurchase.findMany({
      where: {
        purchaserId: Number(userId),
      },
      include: {
        Ticket: {
          select: {
            name: true, 
            price: true
          },
        },
      }
    });

    const totalAmount = data.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);

    let parameter = {
      "payment_type": "gopay",
      "transaction_details": {
          "gross_amount": totalAmount,
          "order_id": `concert-click-${uuidv4()}`,
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
      "customer_details": {
          "first_name": purchaser!.firstName,
          "last_name": purchaser!.lastName,
          "email": purchaser!.email,
          "phone": purchaser!.phone,
      },
    };

    core.charge(parameter)
    .then((chargeResponse: any)=>{
        return res.json(chargeResponse)
    });
  
    // return res.json({ purchaser, data, totalAmount });
  }

}