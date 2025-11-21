import { UserRole } from '@prisma/client';

/**
 * User interface based on Prisma model
 */
export interface User {
  id: string;
  phone: string | null;
  email: string | null;
  telegramId: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User data without sensitive information
 */
export interface UserPublic {
  id: string;
  phone: string | null;
  email: string | null;
  telegramId: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: Date;
}

/**
 * JWT token payload
 */
export interface TokenPayload {
  userId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  user: UserPublic;
  tokens: AuthTokens;
}

/**
 * Registration data
 */
export interface RegisterData {
  phone?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Login data
 */
export interface LoginData {
  phone: string;
  password: string;
}

/**
 * Telegram authentication data
 */
export interface TelegramAuthData {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

/**
 * Refresh token data
 */
export interface RefreshTokenData {
  refreshToken: string;
}
