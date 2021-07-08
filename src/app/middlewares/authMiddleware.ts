import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface payloadToken {
    id: string;
    iat: number;
    exp: number;
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, '4c4687ef87543fefcfa41c633c7e19a4e5a03ae1');
    const { id } = data as payloadToken;
    request.userId = id;
    return next();
  } catch {
    return response.sendStatus(401);
  }
}

export { authMiddleware };
