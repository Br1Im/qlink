import axios from 'axios';

class TelegramService {
  private botToken: string;
  private apiUrl: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendMessage(chatId: string, text: string, options?: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        ...options,
      });

      return response.data;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      throw error;
    }
  }

  async sendPhoto(chatId: string, photo: string, caption?: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/sendPhoto`, {
        chat_id: chatId,
        photo,
        caption,
        parse_mode: 'Markdown',
      });

      return response.data;
    } catch (error) {
      console.error('Failed to send Telegram photo:', error);
      throw error;
    }
  }
}

export const telegramService = new TelegramService();
