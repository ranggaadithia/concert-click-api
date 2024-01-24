import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const midtransClient = require('midtrans-client');

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

const prisma = new PrismaClient();

export class PaymentNotifController {

async updateTransactionStatus(ticketPurchaseId: string, ticketId: number, quantity: number, paymentType: string, transactionStatus: string, res: Response) {
  try {
    await prisma.ticketPurchase.update({
      where: { id: ticketPurchaseId },
      data: {
        paymentType: paymentType,
        transactionStatus: transactionStatus as any,
      },
    });

    if(transactionStatus == 'SUCCESS') {
      await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });
    }

    res.status(200).send('Ok');
    } catch (error) {
      console.error('Error updating transaction status:', error);
      res.status(500).send('Internal Server Error');
    }
}

notification: (req: Request, res: Response) => Promise<void> = async (req, res) => {

  const notificationJson = req.body;

  apiClient.transaction.notification(notificationJson)
    .then(async (statusResponse: any) => {

      let { order_id, transaction_status, fraud_status, payment_type } = statusResponse;

      const ticketPurchase = await prisma.ticketPurchase.findUnique({
        where: { id: order_id }
      });

      if (transaction_status == 'capture' && fraud_status == 'accept') {
        await this.updateTransactionStatus(ticketPurchase!.id, ticketPurchase!.ticketId, ticketPurchase!.quantity, payment_type, "SUCCESS", res);
      }
      
      else if (transaction_status == 'settlement') {
        await this.updateTransactionStatus(ticketPurchase!.id, ticketPurchase!.ticketId, ticketPurchase!.quantity, payment_type, "SUCCESS", res);
      } 
      
      else if (transaction_status == 'cancel' ||
        transaction_status == 'deny' ||
        transaction_status == 'expire') {
          await this.updateTransactionStatus(ticketPurchase!.id, ticketPurchase!.ticketId, ticketPurchase!.quantity, payment_type, "FAILED", res);
      } 
      
      else if (transaction_status == 'pending') {
        await this.updateTransactionStatus(ticketPurchase!.id, ticketPurchase!.ticketId, ticketPurchase!.quantity, payment_type, "PENDING", res);
      } 
    })
    .catch((error: any) => {
      console.error('Error processing notification:', error);
      res.status(500).send('Internal Server Error');
    });
    
 }
 
}