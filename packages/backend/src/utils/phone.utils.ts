/**
 * Normalize phone number to international format
 * Converts: 89991234567, 79991234567, +79991234567 -> +79991234567
 */
export function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Convert 8 to 7 for Russian numbers
  if (digits.startsWith('8') && digits.length === 11) {
    return `+7${digits.slice(1)}`;
  }

  // Add + if missing
  if (digits.startsWith('7') && digits.length === 11) {
    return `+${digits}`;
  }

  // Already in correct format or invalid
  return phone.startsWith('+') ? phone : `+${digits}`;
}

/**
 * Validate Russian phone number
 */
export function isValidRussianPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return /^\+7[0-9]{10}$/.test(normalized);
}

/**
 * Format phone number for display
 * +79991234567 -> +7 (999) 123-45-67
 */
export function formatPhone(phone: string): string {
  const normalized = normalizePhone(phone);

  if (!isValidRussianPhone(normalized)) {
    return phone;
  }

  const match = normalized.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
  }

  return phone;
}

/**
 * Mask phone number for privacy
 * +79991234567 -> +7 (999) ***-**-67
 */
export function maskPhone(phone: string): string {
  const normalized = normalizePhone(phone);

  if (!isValidRussianPhone(normalized)) {
    return phone;
  }

  const match = normalized.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${match[1]}) ***-**-${match[4]}`;
  }

  return phone;
}
