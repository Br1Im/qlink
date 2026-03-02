import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Получить все записи (для владельца бизнеса)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user;
    
    // Найти бизнесы пользователя
    const businesses = await prisma.business.findMany({
      where: { ownerId: user.id },
      select: { id: true },
    });
    
    const businessIds = businesses.map(b => b.id);
    
    // Получить записи для всех бизнесов пользователя
    const bookings = await prisma.booking.findMany({
      where: {
        businessId: { in: businessIds },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        business: {
          select: {
            id: true,
            name: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true,
            duration: true,
          },
        },
        staff: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    
    // Преобразуем данные в нужный формат для фронтенда
    const formattedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      client: `${booking.user.firstName} ${booking.user.lastName}`.trim(),
      phone: booking.user.phone,
      service: booking.service?.name || 'Услуга',
      staff: booking.staff ? `${booking.staff.firstName} ${booking.staff.lastName}` : 'Не назначен',
      date: booking.date.toISOString().split('T')[0],
      time: booking.startTime,
      duration: booking.service?.duration || 60,
      price: booking.price,
      status: booking.status.toLowerCase(),
      avatar: null,
    }));
    
    res.json(formattedBookings);
  } catch (error) {
    console.error('Ошибка получения записей:', error);
    res.status(500).json({ error: 'Ошибка получения записей' });
  }
});

// Создать запись (упрощенная версия без связей)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      client,
      phone,
      service,
      staff,
      date,
      time,
      duration,
      price,
      comment,
    } = req.body;

    // Вычисляем startTime и endTime
    const startTime = time;
    const [hours, minutes] = time.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes + (parseInt(duration) || 60), 0, 0);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    // Получаем бизнес владельца
    const ownerId = (req as any).user.id;
    let business = await prisma.business.findFirst({
      where: { ownerId },
    });

    if (!business) {
      return res.status(400).json({ error: 'Сначала создайте бизнес' });
    }

    // Создаем пользователя если не существует
    let user = await prisma.user.findFirst({
      where: { phone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          firstName: client.split(' ')[0] || client,
          lastName: client.split(' ')[1] || '',
        },
      });
    }

    // Получаем первую услугу и сотрудника (для упрощения)
    let firstService = await prisma.service.findFirst({
      where: { businessId: business.id },
    });

    // Если нет услуг, создаем временную
    if (!firstService) {
      firstService = await prisma.service.create({
        data: {
          businessId: business.id,
          name: service || 'Услуга',
          category: 'Общее',
          price: parseFloat(price) || 0,
          duration: parseInt(duration) || 60,
        },
      });
    }

    const firstStaff = await prisma.staff.findFirst({
      where: { businessId: business.id },
    });

    // Создаем запись
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        businessId: business.id,
        serviceId: firstService.id,
        staffId: firstStaff?.id,
        date: new Date(date),
        startTime,
        endTime,
        price: parseFloat(price) || 0,
        comment: comment || '',
        status: 'PENDING',
      },
    });

    res.status(201).json({ 
      success: true, 
      booking: {
        id: booking.id,
        client,
        phone,
        service,
        staff,
        date,
        time: startTime,
        status: 'PENDING',
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Ошибка создания записи' });
  }
});

// Обновить запись
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Ошибка обновления записи' });
  }
});

// Удалить запись
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.booking.delete({
      where: { id },
    });

    res.json({ success: true, message: 'Запись удалена' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: 'Ошибка удаления записи' });
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
