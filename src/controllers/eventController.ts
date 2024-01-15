import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const prisma = new PrismaClient();

export class EventController {
 async index(req: Request, res: Response) { 
  const { name, id } = req.body.user; // auth user
  await prisma.event.findMany({
   where: {
    organizerId: id
   }
  }).then((events) => {
   res.status(200).json({
    status: 'success',
    message: `List of Events by ${name}`,
    data: events
   });
  }).catch((err) => {
   res.status(500).json({
    status: 'error',
    message: err.message
   });
  });
 }

 async create(req: Request, res: Response) {
  const { name, description, banner, artists, locationName, locationUrl, dateStart, dateEnd, timeStart, timeEnd } = req.body;
  try {
   const organizerId = req.body.user.id; // auth user
   const banner = req?.file?.filename;
   const event = await prisma.event.create({
    data: {
     name,
     description,
     banner,
     artists,
     organizerId,
     locationName,
     locationUrl,
     dateStart,
     dateEnd,
     timeStart,
     timeEnd
    }
   }); 
   return res.status(201).json({
    status: 'success',
    message: 'Event created',
    data: event
   });
  } catch (err) {
   console.log(err);
   res.status(500).json({
    status: 'error',
    message: err
   });
  }
 }
}