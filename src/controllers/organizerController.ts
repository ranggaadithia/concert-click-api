import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const prisma = new PrismaClient();

export class OrganizerController {
 async index(req: Request, res: Response) {
  try {
   const organizers = await prisma.organizer.findMany();
   return res.status(201).json(organizers);
  } catch (error) {
   console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
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
   return res.status(201).json(organizer);
  } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server Error" });
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
    return res.status(401).json({ message: "Invalid credentials" });
   }
   const isPasswordValid = await bcrypt.compare(password, organizer.password);
   if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
   }
   const secretKey = process.env.SECRET_KEY;
   const token = jwt.sign({ email }, secretKey!, { expiresIn: '1h' });
   return res.status(201).json(token);
  } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server Error" });
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
   return res.status(201).json(organizer);
  } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server Error" });
  }
 }
 
}
