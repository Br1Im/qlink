import { PrismaClient, UserRole } from '@prisma/client';
import {
  RegisterData,
  LoginData,
  AuthResponse,
  UserPublic,
  AuthTokens,
} from '../types';
import {
  hashPassword,
  comparePassword,
  generateTokens,
  normalizePhone,
} from '../utils';

const prisma = new PrismaClient();

/**
 * Convert User to UserPublic (remove sensitive data)
 */
function toUserPublic(user: any): UserPublic {
  const { passwordHash, ...publicData } = user;
  return publicData;
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  // Normalize phone if provided
  const phone = data.phone ? normalizePhone(data.phone) : null;

  // Check if user already exists
  if (phone) {
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      throw new Error('Пользователь с таким номером телефона уже существует');
    }
  }

  if (data.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }
  }

  // Hash password
  const passwordHash = data.password
    ? await hashPassword(data.password)
    : null;

  // Create user
  const user = await prisma.user.create({
    data: {
      phone,
      email: data.email || null,
      passwordHash,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      role: UserRole.client,
    },
  });

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    role: user.role,
  });

  return {
    user: toUserPublic(user),
    tokens,
  };
}

/**
 * Login user with phone and password
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  // Normalize phone
  const phone = normalizePhone(data.phone);

  // Find user
  const user = await prisma.user.findUnique({
    where: { phone },
  });

  if (!user) {
    throw new Error('Неверный номер телефона или пароль');
  }

  // Check password
  if (!user.passwordHash) {
    throw new Error('Пользователь не имеет пароля. Используйте другой метод входа');
  }

  const isPasswordValid = await comparePassword(data.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Неверный номер телефона или пароль');
  }

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    role: user.role,
  });

  return {
    user: toUserPublic(user),
    tokens,
  };
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<AuthTokens> {
  const { verifyRefreshToken } = await import('../utils/jwt.utils');

  // Verify refresh token
  const payload = verifyRefreshToken(refreshToken);

  // Get user to ensure they still exist
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  // Generate new tokens
  return generateTokens({
    userId: user.id,
    role: user.role,
  });
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<UserPublic | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  return toUserPublic(user);
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  data: Partial<RegisterData>
): Promise<UserPublic> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  });

  return toUserPublic(user);
}

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.passwordHash) {
    throw new Error('Пользователь не найден или не имеет пароля');
  }

  // Verify current password
  const isPasswordValid = await comparePassword(
    currentPassword,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error('Неверный текущий пароль');
  }

  // Hash new password
  const newPasswordHash = await hashPassword(newPassword);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash },
  });
}

/**
 * Login or register user via Telegram
 */
export async function loginWithTelegram(
  telegramId: string,
  firstName?: string,
  lastName?: string
): Promise<AuthResponse> {
  // Try to find existing user
  let user = await prisma.user.findUnique({
    where: { telegramId },
  });

  // If user doesn't exist, create new one
  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId,
        firstName: firstName || null,
        lastName: lastName || null,
        role: UserRole.client,
      },
    });
  } else {
    // Update user info if changed
    if (firstName || lastName) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
        },
      });
    }
  }

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    role: user.role,
  });

  return {
    user: toUserPublic(user),
    tokens,
  };
}
