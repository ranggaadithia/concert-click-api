import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class HomePageController {
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).send({
        status: "success",
        message: "List events",
        data: events,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error" });
    }
  }

  async getEventById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const event = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          Ticket: true
        }
      });
      return res.status(200).send({
        status: "success",
        message: "List event",
        data: event,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error" });
    }
  }
  async getTopEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        take: 3,
        orderBy: {
          ticketSales: 'desc'
        }
      });
      return res.status(200).send({
        status: "success",
        message: "List events",
        data: events,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error" });
    }
  }

  async getAllOrganizers(req: Request, res: Response) {
    try {
      const organizers = await prisma.organizer.findMany();
      return res.status(200).send({
        status: "success",
        message: "List organizers",
        data: organizers,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error" });
    }
  }

  async getOrganizerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const organizer = await prisma.organizer.findUnique({
        where: {
          id: Number(id),
        }, include: {
          Event: true
        }
      });
      return res.status(200).send({
        status: "success",
        message: "List organizer",
        data: organizer,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error" });
    }
  }
}