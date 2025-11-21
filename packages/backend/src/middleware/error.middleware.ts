import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiResponse } from '../types';

/**
 * Global error handler middleware
 */
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Ошибка валидации данных',
        details: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
    };

    return res.status(400).json(response);
  }

  // Handle Prisma errors
  if (error.code && error.code.startsWith('P')) {
    let message = 'Ошибка базы данных';

    // Common Prisma error codes
    switch (error.code) {
      case 'P2002':
        message = 'Запись с такими данными уже существует';
        break;
      case 'P2025':
        message = 'Запись не найдена';
        break;
      case 'P2003':
        message = 'Нарушение внешнего ключа';
        break;
    }

    const response: ApiResponse = {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message,
        details: { prismaCode: error.code },
      },
    };

    return res.status(400).json(response);
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Неверный или истекший токен',
      },
    };

    return res.status(401).json(response);
  }

  // Default error response
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Внутренняя ошибка сервера',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    },
  };

  res.status(500).json(response);
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response) {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Маршрут ${req.method} ${req.path} не найден`,
    },
  };

  res.status(404).json(response);
}
