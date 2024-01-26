import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { core } from '../utility/midtransPayment';

const prisma = new PrismaClient();

export class PaymentController {
  async Ewallet(req: Request, res: Response) {
    const ticketPurchaseId = req.params.ticketPurchaseId;  
    const data = await prisma.ticketPurchase.findUnique({
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
          "gross_amount": data!.totalPrice,
          "order_id": data!.id,
      },
      "item_details": {
        "id": data?.id,
        "price": data?.Ticket.price,
        "quantity": data?.quantity,
        "name": data?.Ticket.name,
      },
      "customer_details": {
        "first_name": data?.Purchaser.firstName,
        "last_name": data?.Purchaser.lastName,
        "email": data?.Purchaser.email,
        "phone": data?.Purchaser.phone,
      },
    };

    core.charge(parameter)
    .then((chargeResponse: any)=>{
        return res.json(chargeResponse)
    });
  
  }
}