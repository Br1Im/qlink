import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { verifyAccessToken } from '../utils/jwt.utils';
import { ApiResponse } from '../types';

/**
 * Extend Express Request to include user data
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
      };
    }
  }
}

/**
 * Middleware to require authentication
 * Verifies JWT token and attaches user data to request
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Токен не предоставлен');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const payload = verifyAccessToken(token);

    // Attach user data to request
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: error.message || 'Требуется аутентификация',
      },
    };

    res.status(401).json(response);
  }
}

/**
 * Middleware to require specific role
 * Must be used after requireAuth middleware
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('Пользователь не авторизован');
      }

      if (!roles.includes(req.user.role)) {
        throw new Error('Недостаточно прав доступа');
      }

      next();
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: error.message || 'Доступ запрещен',
        },
      };

      res.status(403).json(response);
    }
  };
}

/**
 * Middleware to optionally authenticate user
 * Attaches user data if token is valid, but doesn't fail if not
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);

      req.user = {
        userId: payload.userId,
        role: payload.role,
      };
    }
  } catch (error) {
    // Ignore errors for optional auth
  }

  next();
}
