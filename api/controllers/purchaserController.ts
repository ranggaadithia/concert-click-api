import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class PurchaserController { 
  async index(req: Request, res: Response) {
    await prisma.purchaser.findMany()
    .then((purchasers) => {
      res.status(200).json({
        status: 'success',
        message: `List of Purchasers`,
        data: purchasers
      });
    }).catch((err) => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });
  }

  async register(req: Request, res: Response) {
    const { firstName, lastName, phone, nik, birthdate, gender, email } = req.body;
    await prisma.purchaser.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        nik,
        birthdate,
        gender
      }
    }).then((purchaser) => {
      const secretKey = process.env.SECRET_KEY;

      const token = jwt.sign({ id: purchaser.id }, secretKey!, { expiresIn: '1h' });

      res.status(200).json({
        status: 'success',
        message: `Purchaser created`,
        token,
        data: purchaser
      });
    }).catch((err) => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });
  }
}