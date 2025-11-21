import { z } from 'zod';

/**
 * Phone number validation (Russian format)
 * Accepts: +79991234567, 79991234567, 89991234567
 */
const phoneRegex = /^(\+7|7|8)?[0-9]{10}$/;

/**
 * Password validation
 * Min 8 characters, at least one letter and one number
 */
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * Registration schema
 */
export const registerSchema = z
  .object({
    phone: z
      .string()
      .regex(phoneRegex, 'Неверный формат номера телефона')
      .optional(),
    email: z.string().email('Неверный формат email').optional(),
    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать минимум одну букву и одну цифру'
      )
      .optional(),
    firstName: z
      .string()
      .min(1, 'Имя не может быть пустым')
      .max(100, 'Имя слишком длинное')
      .optional(),
    lastName: z
      .string()
      .min(1, 'Фамилия не может быть пустой')
      .max(100, 'Фамилия слишком длинная')
      .optional(),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Необходимо указать телефон или email',
  })
  .refine(
    (data) => {
      // If phone or email is provided, password is required
      if (data.phone || data.email) {
        return !!data.password;
      }
      return true;
    },
    {
      message: 'Пароль обязателен при регистрации по телефону или email',
      path: ['password'],
    }
  );

/**
 * Login schema
 */
export const loginSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Неверный формат номера телефона'),
  password: z.string().min(1, 'Пароль не может быть пустым'),
});

/**
 * Telegram authentication schema
 */
export const telegramAuthSchema = z.object({
  id: z.string().min(1, 'Telegram ID обязателен'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  photo_url: z.string().url().optional(),
  auth_date: z.number().int().positive(),
  hash: z.string().min(1, 'Hash обязателен'),
});

/**
 * Refresh token schema
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token обязателен'),
});

/**
 * Update user profile schema
 */
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Имя не может быть пустым')
    .max(100, 'Имя слишком длинное')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Фамилия не может быть пустой')
    .max(100, 'Фамилия слишком длинная')
    .optional(),
  email: z.string().email('Неверный формат email').optional(),
});

/**
 * Change password schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Текущий пароль обязателен'),
  newPassword: z
    .string()
    .min(8, 'Новый пароль должен содержать минимум 8 символов')
    .regex(
      passwordRegex,
      'Новый пароль должен содержать минимум одну букву и одну цифру'
    ),
});

/**
 * Type exports for TypeScript
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TelegramAuthInput = z.infer<typeof telegramAuthSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
