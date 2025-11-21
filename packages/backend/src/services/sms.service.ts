import axios from 'axios';

class SmsService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    // Используем SMS.ru или другой провайдер
    this.apiKey = process.env.SMS_API_KEY || '';
    this.apiUrl = process.env.SMS_API_URL || 'https://sms.ru/sms/send';
  }

  async send(phone: string, message: string) {
    if (!this.apiKey) {
      console.warn('SMS API key not configured, skipping SMS');
      return;
    }

    try {
      const response = await axios.post(this.apiUrl, {
        api_id: this.apiKey,
        to: phone,
        msg: message,
        json: 1,
      });

      console.log('SMS sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw error;
    }
  }

  async sendTemplate(phone: string, templateName: string, variables: Record<string, any>) {
    const templates: Record<string, string> = {
      booking_confirmation: 'Запись подтверждена на {{date}} в {{time}}. {{business}}',
      booking_reminder: 'Напоминание: завтра в {{time}} у вас запись в {{business}}',
    };

    let message = templates[templateName];
    if (!message) {
      throw new Error(`Template ${templateName} not found`);
    }

    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(`{{${key}}}`, value);
    });

    return this.send(phone, message);
  }
}

export const smsService = new SmsService();
