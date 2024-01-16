import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
const token = req.headers.authorization?.split(' ')[1];

 if (token) {
   jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
     if (err) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     req.body.user = decoded;
     next();
   });
 } else {
   return res.status(401).json({ message: 'Unauthorized' });
 }
};
