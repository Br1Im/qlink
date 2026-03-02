import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Получить клиентов
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ownerId = (req as any).user.id;

    // Получаем бизнес владельца
    const business = await prisma.business.findFirst({
      where: { ownerId },
    });

    if (!business) {
      return res.json([]);
    }

    // Получаем уникальных клиентов из записей
    const bookings = await prisma.booking.findMany({
      where: { businessId: business.id },
      include: {
        user: true,
      },
      distinct: ['userId'],
    });

    const clients = bookings.map((booking: any) => ({
      id: booking.user.id,
      name: `${booking.user.firstName} ${booking.user.lastName}`.trim(),
      phone: booking.user.phone,
      email: booking.user.email,
      totalBookings: 0, // TODO: подсчитать
      totalSpent: 0, // TODO: подсчитать
      lastVisit: booking.date,
    }));

    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Ошибка получения клиентов' });
  }
});

// Создать клиента
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    const client = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
      },
    });

    res.status(201).json({ success: true, client });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ error: 'Ошибка создания клиента' });
  }
});

export default router;
