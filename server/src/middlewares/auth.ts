import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../utils/validateEnv';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (token == null) throw new Error();

    const decoded = jwt.verify(token, env.JWT_SECRET);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Access denied. Please authenticate' });
  }
}
