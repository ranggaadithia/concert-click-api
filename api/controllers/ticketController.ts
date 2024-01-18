import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketController {
  async index(req: Request, res: Response) {
    const { eventId } = req.params;
    const tickets = await prisma.ticket.findMany({
    where: {
      eventId: Number(eventId)
    }
    }).then((tickets) => { 
      res.send({
        status: 'success',
        message: 'Tickets retrieved',
        data: tickets
      });
    }).catch((err) => {
      res.status(500).send({
        status: "Failed",
        err
      });
    });
    
 }

 async create(req: Request, res: Response) {
  const { eventId } = req.params;
  const { name, price, description, stock, status, startSale, endSale} = req.body;
  const ticket = await prisma.ticket.create({
   data: {
   name,
   price,
   description,
   stock,
   status,
   eventId: Number(eventId),
   startSale,
   endSale
  }
 }).then((ticket) => {
  res.send({
   status: 'success',
   message: 'Ticket created',
   data: ticket
  });
 }).catch((err) => {
  res.status(500).send({
   status: "Failed",
   err
  });
 })
 }


 async delete(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await prisma.ticket.delete({
   where: {
    id: Number(id)
   }
  }).then((ticket) => {
   res.send({
    status: 'success',
    message: 'Ticket deleted',
    data: ticket
   });
  }).catch((err) => {
   res.status(500).send({
    status: "Failed",
    err
   });
  })
 }
}