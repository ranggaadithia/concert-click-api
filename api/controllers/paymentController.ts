import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { core } from '../utility/midtransPayment';
import axios from 'axios';

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

  async VirtualAccount(req: Request, res: Response) {
    const bank = req.params.bank;
    const ticketPurchaseId = req.params.ticketPurchaseId;
    try {
    const data = await prisma.ticketPurchase.findUnique({
      where: {
        id: ticketPurchaseId,
      },
      include: {
        Ticket: true,
        Purchaser: true,
      }
    });

    const dataVirtualAccount = {
      "payment_type": "bank_transfer",
      "transaction_details": {
          "order_id": ticketPurchaseId,
          "gross_amount": data!.totalPrice
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
      "bank_transfer": {
          "bank": bank
      }
    };

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
      url: 'https://api.sandbox.midtrans.com/v2/charge',
      headers: { 
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1ENWRMM25ybThaeU5Xall1cndxU3ZHSmg=:'
      },
      data : dataVirtualAccount
    };
    

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });

  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
    
  }
}