import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Получить статистику dashboard
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const ownerId = (req as any).user.id;

    // Получаем бизнес владельца
    const businesses = await prisma.business.findMany({
      where: { ownerId },
    });

    if (businesses.length === 0) {
      return res.json({
        stats: {
          bookingsToday: 0,
          newClients: 0,
          revenueToday: 0,
          averageCheck: 0,
        },
        recentBookings: [],
        isNewUser: true,
      });
    }

    const businessId = businesses[0].id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Записи сегодня
    const bookingsToday = await prisma.booking.count({
      where: {
        businessId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Новые клиенты за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newClients = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
        bookings: {
          some: {
            businessId,
          },
        },
      },
    });

    // Выручка сегодня
    const todayBookings = await prisma.booking.findMany({
      where: {
        businessId,
        date: {
          gte: today,
          lt: tomorrow,
        },
        status: {
          in: ['CONFIRMED', 'COMPLETED'],
        },
      },
      select: {
        price: true,
      },
    });

    const revenueToday = todayBookings.reduce((sum: number, booking: { price: number }) => sum + booking.price, 0);

    // Средний чек за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentBookings = await prisma.booking.findMany({
      where: {
        businessId,
        date: {
          gte: thirtyDaysAgo,
        },
        status: {
          in: ['CONFIRMED', 'COMPLETED'],
        },
      },
      select: {
        price: true,
      },
    });

    const averageCheck = recentBookings.length > 0
      ? Math.round(recentBookings.reduce((sum: number, b: { price: number }) => sum + b.price, 0) / recentBookings.length)
      : 0;

    // Ближайшие записи
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        businessId,
        date: {
          gte: today,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      take: 5,
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' },
      ],
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json({
      stats: {
        bookingsToday,
        newClients,
        revenueToday,
        averageCheck,
      },
      recentBookings: upcomingBookings.map((booking: any) => ({
        id: booking.id,
        clientName: `${booking.user.firstName} ${booking.user.lastName}`,
        serviceName: booking.service.name,
        price: booking.price,
        date: booking.date.toLocaleDateString('ru-RU'),
        time: `${booking.startTime} - ${booking.endTime}`,
        status: booking.status.toLowerCase(),
      })),
      isNewUser: false,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

export default router;
