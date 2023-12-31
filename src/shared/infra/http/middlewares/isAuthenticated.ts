import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = authConfig.jwt.secret ?? '';
    const decodedToken = verify(token, secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    throw new AppError('Invalid JWT Token.', StatusCodes.UNAUTHORIZED);
  }
}
