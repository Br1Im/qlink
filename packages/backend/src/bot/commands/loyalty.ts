import { Context } from 'telegraf';
import { loyaltyService } from '../../services/loyalty.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handleLoyaltyCommand(ctx: Context) {
  try {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) return;

    // Находим пользователя
    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      await ctx.reply(
        '❌ Вы не зарегистрированы в системе.\n' +
        'Пожалуйста, зарегистрируйтесь через веб-приложение.'
      );
      return;
    }

    // Получаем баланс и историю
    const balance = await loyaltyService.getBalance(user.id);
    const history = await loyaltyService.getHistory(user.id, 5);

    let message = `💎 *Программа лояльности*\n\n`;
    message += `💰 Ваш баланс: *${balance?.bonusPoints || 0} бонусов*\n`;
    message += `📊 Всего потрачено: ${balance?.totalSpent || 0} ₽\n\n`;
    message += `_1 бонус = 1 рубль при оплате_\n\n`;

    if (history.length > 0) {
      message += `📜 *Последние операции:*\n\n`;
      history.forEach((item, index) => {
        const sign = item.points > 0 ? '+' : '';
        const emoji = item.points > 0 ? '✅' : '❌';
        message += `${emoji} ${sign}${item.points} - ${item.description || 'Операция'}\n`;
        message += `   _${new Date(item.createdAt).toLocaleDateString('ru-RU')}_\n\n`;
      });
    }

    message += `\n💡 *Как получить бонусы:*\n`;
    message += `• 5% кэшбэк с каждой записи\n`;
    message += `• Бонусы за отзывы\n`;
    message += `• Специальные акции\n`;

    await ctx.replyWithMarkdown(message);
  } catch (error) {
    console.error('Loyalty command error:', error);
    await ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
}

export async function handleBonusesCommand(ctx: Context) {
  await handleLoyaltyCommand(ctx);
}
