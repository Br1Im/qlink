import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Создать запись
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      businessId,
      serviceId,
      staffId,
      date,
      startTime,
      endTime,
      price,
      comment,
    } = req.body;

    // Проверка доступности слота
    const existingBooking = await prisma.booking.findFirst({
      where: {
        businessId,
        staffId,
        date: new Date(date),
        startTime,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Этот слот уже занят' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        businessId,
        serviceId,
        staffId,
        date: new Date(date),
        startTime,
        endTime,
        price,
        comment,
        status: 'PENDING',
      },
      include: {
        business: true,
        service: true,
        staff: true,
        user: true,
      },
    });

    // TODO: Отправить уведомление владельцу бизнеса
    // TODO: Отправить подтверждение клиенту

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Ошибка создания записи' });
  }
});

// Получить записи пользователя
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, upcoming } = req.query;

    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    if (upcoming === 'true') {
      where.date = {
        gte: new Date(),
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        business: {
          select: {
            name: true,
            address: true,
            phone: true,
            logo: true,
          },
        },
        service: {
          select: {
            name: true,
            duration: true,
          },
        },
        staff: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Ошибка получения записей' });
  }
});

// Получить записи бизнеса
router.get('/business/:businessId', authMiddleware, async (req, res) => {
  try {
    const { businessId } = req.params;
    const { date, status } = req.query;

    const where: any = { businessId };

    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (status) {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
          },
        },
        service: true,
        staff: true,
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get business bookings error:', error);
    res.status(500).json({ error: 'Ошибка получения записей' });
  }
});

// Получить запись по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        business: true,
        service: true,
        staff: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Ошибка получения записи' });
  }
});

// Обновить статус записи
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        business: true,
        service: true,
      },
    });

    // TODO: Отправить уведомление клиенту об изменении статуса

    res.json(booking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Ошибка обновления статуса' });
  }
});

// Отменить запись
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    // TODO: Отправить уведомление о отмене

    res.json({ message: 'Запись отменена', booking });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Ошибка отмены записи' });
  }
});

// Перенести запись
router.patch('/:id/reschedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Запись не найдена' });
    }

    // Проверка доступности нового слота
    const conflict = await prisma.booking.findFirst({
      where: {
        businessId: booking.businessId,
        staffId: booking.staffId,
        date: new Date(date),
        startTime,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        id: {
          not: id,
        },
      },
    });

    if (conflict) {
      return res.status(400).json({ error: 'Новый слот уже занят' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        date: new Date(date),
        startTime,
        endTime,
      },
      include: {
        business: true,
        service: true,
        staff: true,
      },
    });

    // TODO: Отправить уведомление о переносе

    res.json(updated);
  } catch (error) {
    console.error('Reschedule booking error:', error);
    res.status(500).json({ error: 'Ошибка переноса записи' });
  }
});

export default router;
