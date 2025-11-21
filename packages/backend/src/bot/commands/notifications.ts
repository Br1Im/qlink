import { Context, Markup } from 'telegraf';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handleNotificationsCommand(ctx: Context) {
  try {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      await ctx.reply('❌ Вы не зарегистрированы в системе.');
      return;
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    if (notifications.length === 0) {
      await ctx.reply('📭 У вас нет уведомлений');
      return;
    }

    let message = `🔔 *Ваши уведомления:*\n\n`;

    notifications.forEach((notif, index) => {
      const emoji = notif.isRead ? '✅' : '🔵';
      message += `${emoji} *${notif.title}*\n`;
      message += `${notif.message}\n`;
      message += `_${new Date(notif.createdAt).toLocaleString('ru-RU')}_\n\n`;
    });

    await ctx.replyWithMarkdown(
      message,
      Markup.inlineKeyboard([
        [Markup.button.callback('Прочитать все', 'mark_all_read')],
        [Markup.button.callback('Настройки уведомлений', 'notif_settings')],
      ])
    );
  } catch (error) {
    console.error('Notifications command error:', error);
    await ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
}

export async function handleNotificationSettings(ctx: Context) {
  try {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) return;

    const message = `⚙️ *Настройки уведомлений*\n\n` +
      `Telegram: ${user.notifyTelegram ? '✅' : '❌'}\n` +
      `Email: ${user.notifyEmail ? '✅' : '❌'}\n` +
      `SMS: ${user.notifySms ? '✅' : '❌'}`;

    await ctx.replyWithMarkdown(
      message,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            `Telegram: ${user.notifyTelegram ? 'Выкл' : 'Вкл'}`,
            'toggle_telegram'
          ),
        ],
        [
          Markup.button.callback(
            `Email: ${user.notifyEmail ? 'Выкл' : 'Вкл'}`,
            'toggle_email'
          ),
        ],
        [
          Markup.button.callback(
            `SMS: ${user.notifySms ? 'Выкл' : 'Вкл'}`,
            'toggle_sms'
          ),
        ],
      ])
    );
  } catch (error) {
    console.error('Notification settings error:', error);
  }
}

export async function toggleNotificationChannel(
  ctx: Context,
  channel: 'telegram' | 'email' | 'sms'
) {
  try {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) return;

    const fieldMap = {
      telegram: 'notifyTelegram',
      email: 'notifyEmail',
      sms: 'notifySms',
    };

    const field = fieldMap[channel];
    const currentValue = user[field as keyof typeof user] as boolean;

    await prisma.user.update({
      where: { id: user.id },
      data: { [field]: !currentValue },
    });

    await ctx.answerCbQuery(`${channel} уведомления ${!currentValue ? 'включены' : 'выключены'}`);
    await handleNotificationSettings(ctx);
  } catch (error) {
    console.error('Toggle notification error:', error);
  }
}
