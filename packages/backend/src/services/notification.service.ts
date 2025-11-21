import { PrismaClient, NotificationType, NotificationChannel } from '@prisma/client';
import { emailService } from './email.service';
import { smsService } from './sms.service';
import { telegramService } from './telegram.service';

const prisma = new PrismaClient();

interface SendNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  channels?: NotificationChannel[];
}

class NotificationService {
  async send(params: SendNotificationParams) {
    const { userId, type, title, message, data, channels } = params;

    // Получаем настройки пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        phone: true,
        telegramId: true,
        notifyEmail: true,
        notifySms: true,
        notifyTelegram: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Определяем каналы доставки
    const deliveryChannels: NotificationChannel[] = channels || [];
    
    if (!channels) {
      if (user.notifyTelegram && user.telegramId) {
        deliveryChannels.push(NotificationChannel.TELEGRAM);
      }
      if (user.notifyEmail && user.email) {
        deliveryChannels.push(NotificationChannel.EMAIL);
      }
      if (user.notifySms && user.phone) {
        deliveryChannels.push(NotificationChannel.SMS);
      }
    }

    // Создаем уведомление в БД
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data,
        channels: deliveryChannels,
      },
    });

    // Отправляем по каналам
    const sendPromises = [];

    if (deliveryChannels.includes(NotificationChannel.TELEGRAM) && user.telegramId) {
      sendPromises.push(
        telegramService.sendMessage(user.telegramId, `*${title}*\n\n${message}`)
      );
    }

    if (deliveryChannels.includes(NotificationChannel.EMAIL) && user.email) {
      sendPromises.push(
        emailService.send({
          to: user.email,
          subject: title,
          text: message,
          html: this.formatEmailHtml(title, message),
        })
      );
    }

    if (deliveryChannels.includes(NotificationChannel.SMS) && user.phone) {
      sendPromises.push(
        smsService.send(user.phone, message)
      );
    }

    try {
      await Promise.all(sendPromises);
      
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          isSent: true,
          sentAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }

    return notification;
  }

  async sendBookingConfirmation(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        business: true,
        service: true,
        staff: true,
      },
    });

    if (!booking) return;

    const date = new Date(booking.date).toLocaleDateString('ru-RU');
    const message = `Ваша запись подтверждена!\n\n` +
      `📍 ${booking.business.name}\n` +
      `📅 ${date} в ${booking.startTime}\n` +
      `💼 ${booking.service.name}\n` +
      `👤 ${booking.staff?.firstName} ${booking.staff?.lastName || ''}\n` +
      `💰 ${booking.price} ₽`;

    await this.send({
      userId: booking.userId,
      type: NotificationType.BOOKING_CONFIRMED,
      title: 'Запись подтверждена',
      message,
      data: { bookingId },
    });
  }

  async sendBookingReminder(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        business: true,
        service: true,
      },
    });

    if (!booking) return;

    const date = new Date(booking.date).toLocaleDateString('ru-RU');
    const message = `Напоминание о записи завтра!\n\n` +
      `📍 ${booking.business.name}\n` +
      `📅 ${date} в ${booking.startTime}\n` +
      `💼 ${booking.service.name}`;

    await this.send({
      userId: booking.userId,
      type: NotificationType.BOOKING_REMINDER,
      title: 'Напоминание о записи',
      message,
      data: { bookingId },
    });
  }

  private formatEmailHtml(title: string, message: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${title}</h1>
            </div>
            <div class="content">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>Qlink - Ваш помощник в онлайн-записи</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export const notificationService = new NotificationService();
