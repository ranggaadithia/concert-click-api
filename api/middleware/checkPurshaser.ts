import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = typeof req.headers.purshacerToken === 'string' ? req.headers.purshacerToken.split(' ')[1] : undefined;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Purchaser Token Require' });
      }
      req.body.purchaser = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Purchaser Token Require' });
  }
};
