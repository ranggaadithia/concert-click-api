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

 async notification(req: Request, res: Response) {

  const notificationJson = req.body;

  apiClient.transaction.notification(notificationJson)
    .then(async (statusResponse: any) => {

      let { order_id, transaction_status, fraud_status, payment_type } = statusResponse;

      console.log(`Transaction notification received. Order ID: ${order_id}. Transaction status: ${transaction_status}. Fraud status: ${fraud_status}. Payment Type: ${payment_type}`);

      const ticketPurchase = await prisma.ticketPurchase.findUnique({
        where: { id: order_id }
      });

      if (transaction_status == 'capture' && fraud_status == 'accept') {
        try {
          await prisma.ticketPurchase.update({
            where: { id: ticketPurchase!.id },
            data: {
              paymentType: payment_type,
              transactionStatus: "SUCCESS",
            },
          });
      
            await prisma.ticket.update({
              where: { id: ticketPurchase!.ticketId },
              data: {
                stock: {
                  decrement: ticketPurchase!.quantity,
                },
              },
            });
      
          } catch (error) {
            console.error('Error updating transaction status:', error);
            res.status(500).send('Internal Server Error');
          }
      } else if (transaction_status == 'settlement') {
        try {
          await prisma.ticketPurchase.update({
            where: { id: ticketPurchase!.id },
            data: {
              paymentType: payment_type,
              transactionStatus: "SUCCESS",
            },
          });
      
            await prisma.ticket.update({
              where: { id: ticketPurchase!.ticketId },
              data: {
                stock: {
                  decrement: ticketPurchase!.quantity,
                },
              },
            });
      
          } catch (error) {
            console.error('Error updating transaction status:', error);
            res.status(500).send('Internal Server Error');
          }
      } else if (transaction_status == 'cancel' ||
        transaction_status == 'deny' ||
        transaction_status == 'expire') {
          try {
            await prisma.ticketPurchase.update({
              where: { id: ticketPurchase!.id },
              data: {
                paymentType: payment_type,
                transactionStatus: "FAILED",
              },
            });
        
            } catch (error) {
              console.error('Error updating transaction status:', error);
              res.status(500).send('Internal Server Error');
            }
      } else if (transaction_status == 'pending') {
        try {
          await prisma.ticketPurchase.update({
            where: { id: ticketPurchase!.id },
            data: {
              paymentType: payment_type,
              transactionStatus: "PENDING",
            },
          });

          } catch (error) {
            console.error('Error updating transaction status:', error);
            res.status(500).send('Internal Server Error');
          }
      } else {
        console.log(`Unhandled transaction status: ${transaction_status}`);
        res.status(400).send('Invalid transaction status.');
      }
    })
    .catch((error: any) => {
      console.error('Error processing notification:', error);
      res.status(500).send('Internal Server Error');
    });
    
 }
 
}