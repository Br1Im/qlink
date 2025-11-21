import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateProfileSchema,
  changePasswordSchema,
  telegramAuthSchema,
} from '../schemas';
import { ApiResponse } from '../types';

/**
 * Register new user
 * POST /api/auth/register
 */
export async function register(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Register user
    const result = await authService.register(validatedData);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.status(201).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'REGISTRATION_FAILED',
        message: error.message || 'Ошибка при регистрации',
      },
    };

    res.status(400).json(response);
  }
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Login user
    const result = await authService.login(validatedData);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: error.message || 'Ошибка при входе',
      },
    };

    res.status(401).json(response);
  }
}

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export async function refresh(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = refreshTokenSchema.parse(req.body);

    // Refresh token
    const tokens = await authService.refreshAccessToken(
      validatedData.refreshToken
    );

    const response: ApiResponse = {
      success: true,
      data: { tokens },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'REFRESH_FAILED',
        message: error.message || 'Ошибка при обновлении токена',
      },
    };

    res.status(401).json(response);
  }
}

/**
 * Get current user profile
 * GET /api/auth/me
 */
export async function getMe(req: Request, res: Response) {
  try {
    // User ID is set by auth middleware
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new Error('Пользователь не авторизован');
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const response: ApiResponse = {
      success: true,
      data: { user },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'GET_PROFILE_FAILED',
        message: error.message || 'Ошибка при получении профиля',
      },
    };

    res.status(400).json(response);
  }
}

/**
 * Update user profile
 * PATCH /api/auth/profile
 */
export async function updateProfile(req: Request, res: Response) {
  try {
    // User ID is set by auth middleware
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new Error('Пользователь не авторизован');
    }

    // Validate request body
    const validatedData = updateProfileSchema.parse(req.body);

    // Update profile
    const user = await authService.updateProfile(userId, validatedData);

    const response: ApiResponse = {
      success: true,
      data: { user },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'UPDATE_PROFILE_FAILED',
        message: error.message || 'Ошибка при обновлении профиля',
      },
    };

    res.status(400).json(response);
  }
}

/**
 * Change password
 * POST /api/auth/change-password
 */
export async function changePassword(req: Request, res: Response) {
  try {
    // User ID is set by auth middleware
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new Error('Пользователь не авторизован');
    }

    // Validate request body
    const validatedData = changePasswordSchema.parse(req.body);

    // Change password
    await authService.changePassword(
      userId,
      validatedData.currentPassword,
      validatedData.newPassword
    );

    const response: ApiResponse = {
      success: true,
      data: { message: 'Пароль успешно изменен' },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'CHANGE_PASSWORD_FAILED',
        message: error.message || 'Ошибка при изменении пароля',
      },
    };

    res.status(400).json(response);
  }
}

/**
 * Login with Telegram
 * POST /api/auth/telegram
 */
export async function loginWithTelegram(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = telegramAuthSchema.parse(req.body);

    // Validate Telegram auth data
    const { validateTelegramAuth, extractTelegramUserData } = await import(
      '../utils/telegram.utils'
    );

    const isValid = validateTelegramAuth(validatedData);

    if (!isValid) {
      throw new Error('Неверные данные аутентификации Telegram');
    }

    // Extract user data
    const userData = extractTelegramUserData(validatedData);

    // Login or register user
    const result = await authService.loginWithTelegram(
      userData.telegramId,
      userData.firstName || undefined,
      userData.lastName || undefined
    );

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'TELEGRAM_LOGIN_FAILED',
        message: error.message || 'Ошибка при входе через Telegram',
      },
    };

    res.status(401).json(response);
  }
}
