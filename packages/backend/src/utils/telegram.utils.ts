import crypto from 'crypto';
import { TelegramAuthData } from '../types';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

/**
 * Validate Telegram authentication data
 * Based on: https://core.telegram.org/widgets/login#checking-authorization
 */
export function validateTelegramAuth(data: TelegramAuthData): boolean {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN не настроен');
  }

  const { hash, ...authData } = data;

  // Create data check string
  const dataCheckArr = Object.keys(authData)
    .filter((key) => authData[key as keyof typeof authData] !== undefined)
    .sort()
    .map((key) => `${key}=${authData[key as keyof typeof authData]}`);

  const dataCheckString = dataCheckArr.join('\n');

  // Create secret key
  const secretKey = crypto
    .createHash('sha256')
    .update(TELEGRAM_BOT_TOKEN)
    .digest();

  // Calculate hash
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  // Compare hashes
  if (calculatedHash !== hash) {
    return false;
  }

  // Check auth date (should be within 24 hours)
  const authDate = data.auth_date;
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = currentTime - authDate;

  // 24 hours = 86400 seconds
  if (timeDiff > 86400) {
    return false;
  }

  return true;
}

/**
 * Extract user data from Telegram auth data
 */
export function extractTelegramUserData(data: TelegramAuthData) {
  return {
    telegramId: data.id,
    firstName: data.first_name || null,
    lastName: data.last_name || null,
    username: data.username || null,
    photoUrl: data.photo_url || null,
  };
}
