import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export class OrganizerController {
 async index(req: Request, res: Response) {
  try {
   const organizers = await prisma.organizer.findMany();
   return res.status(200).send({
    status: "success",
    message: "List organizer",
    data: organizers,
   });
  } catch (error) {
   console.log(error);
    return res.status(500).json({ status: "Failed", message: "Internal server Error" });
  }
 }

 async register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
   const hashedPassword = await bcrypt.hash(password, 10);
   const organizer = await prisma.organizer.create({
    data: {
     name,
     email,
     password: hashedPassword,
    },
   });
   return res.status(201).send({
    status: "success",
    message: "Organizer created",
    data: organizer,
   });
  } catch (error) {
   console.log(error);
   return res.status(500).json({ status: "Failed", message: "Internal server Error" });
  }
 }

 async login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
   const organizer = await prisma.organizer.findFirst({
    where: {
      email,
    },
  });
   if (!organizer) {
    return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
   }
   const isPasswordValid = await bcrypt.compare(password, organizer.password);
   if (!isPasswordValid) {
    return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
   }
   const secretKey = process.env.SECRET_KEY;

   const token = jwt.sign({ email, id: organizer.id, name: organizer.name }, secretKey!, { expiresIn: '1h' });
   
   return res.status(201).json({
    status: "success",
    message: "Login success",
    token,
    data: organizer,
   });
  } catch (error) {
   console.log(error);
   return res.status(500).json({ status: "Failed", message: "Internal server Error" });
  }
 }

 async bio(req: Request, res: Response) { 
  const id = req.params.organizerId;
  const { phone, address, about, url, sosmed } = req.body;
  try {
   const organizer = await prisma.organizer.update({
    where: {
     id: Number(id),
    },
    data: {
     phone,
     address,
     about,
     url,
     sosmed,
    },
   });
   return res.status(201).send({
    status: "success",
    message: "Organizer updated",
    data: organizer,
   });
  } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server Error" });
  }
 }

  async show(req: Request, res: Response) {
    const id = req.params.organizerId;
    try {
    const organizer = await prisma.organizer.findUnique({
      where: {
      id: Number(id),
      },
    });
    return res.status(200).send({
      status: "success",
      message: "Organizer detail",
      data: organizer,
    });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.organizerId;
    try {
    const organizer = await prisma.organizer.delete({
      where: {
      id: Number(id),
      },
    });
    return res.status(200).send({
      status: "success",
      message: "Organizer deleted",
      data: organizer,
    });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
    }
  }
 
}
