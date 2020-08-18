import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validar o token
  const authHeader = request.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    console.log('JWT token is missing');
    throw new AppError('JWT token is missing');
  }

  // Bearer toke
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    // console.log(request.user); // pegando o id do user logado
    return next();
  } catch {
    throw new AppError('Invalid JWT token');
  }
}
