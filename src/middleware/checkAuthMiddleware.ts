import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
// Middleware untuk memeriksa apakah pengguna telah login
export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
 const token = req.headers.authorization?.split(' ')[1];

 if (token) {
   jwt.verify(token, process.env.SECRET_KEY!, (err) => {
     if (err) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     next();
   });
 } else {
   return res.status(401).json({ message: 'Unauthorized' });
 }
};
