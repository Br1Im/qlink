import { PrismaClient, LoyaltyType } from '@prisma/client';

const prisma = new PrismaClient();

class LoyaltyService {
  // Начисление бонусов за запись
  async earnPoints(userId: string, amount: number, description: string) {
    const points = Math.floor(amount * 0.05); // 5% кэшбэк

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          bonusPoints: { increment: points },
          totalSpent: { increment: amount },
        },
      }),
      prisma.loyaltyHistory.create({
        data: {
          userId,
          type: LoyaltyType.EARNED,
          points,
          description,
        },
      }),
    ]);

    return points;
  }

  // Списание бонусов
  async spendPoints(userId: string, points: number, description: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { bonusPoints: true },
    });

    if (!user || user.bonusPoints < points) {
      throw new Error('Insufficient bonus points');
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          bonusPoints: { decrement: points },
        },
      }),
      prisma.loyaltyHistory.create({
        data: {
          userId,
          type: LoyaltyType.SPENT,
          points: -points,
          description,
        },
      }),
    ]);

    return points;
  }

  // Бонусные баллы за действия
  async giveBonus(userId: string, points: number, description: string) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          bonusPoints: { increment: points },
        },
      }),
      prisma.loyaltyHistory.create({
        data: {
          userId,
          type: LoyaltyType.BONUS,
          points,
          description,
        },
      }),
    ]);

    return points;
  }

  // Получить историю
  async getHistory(userId: string, limit = 50) {
    return prisma.loyaltyHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // Получить баланс
  async getBalance(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        bonusPoints: true,
        totalSpent: true,
      },
    });

    return user;
  }

  // Конвертация баллов в рубли (1 балл = 1 рубль)
  pointsToRubles(points: number): number {
    return points;
  }

  // Конвертация рублей в баллы
  rublesToPoints(rubles: number): number {
    return Math.floor(rubles);
  }
}

export const loyaltyService = new LoyaltyService();
