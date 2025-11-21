import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Получить все бизнесы (с фильтрами)
router.get('/', async (req, res) => {
  try {
    const { category, city, search, page = 1, limit = 20 } = req.query;

    const where: any = { isActive: true };

    if (category) where.category = category;
    if (city) where.city = city;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        include: {
          owner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              bookings: true,
            },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { rating: 'desc' },
      }),
      prisma.business.count({ where }),
    ]);

    res.json({
      businesses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({ error: 'Ошибка получения бизнесов' });
  }
});

// Получить бизнес по ID или slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const business = await prisma.business.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            company: true,
          },
        },
        staff: {
          where: { isActive: true },
          include: {
            services: {
              include: {
                service: true,
              },
            },
          },
        },
        services: {
          where: { isActive: true },
        },
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!business) {
      return res.status(404).json({ error: 'Бизнес не найден' });
    }

    res.json(business);
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ error: 'Ошибка получения бизнеса' });
  }
});

// Создать бизнес (требует авторизации)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const ownerId = (req as any).user.id;
    const {
      name,
      slug,
      description,
      category,
      phone,
      email,
      website,
      address,
      city,
      country,
      latitude,
      longitude,
      workingHours,
      logo,
      coverImage,
    } = req.body;

    // Проверка уникальности slug
    const existing = await prisma.business.findUnique({
      where: { slug },
    });

    if (existing) {
      return res.status(400).json({ error: 'Такой slug уже существует' });
    }

    const business = await prisma.business.create({
      data: {
        ownerId,
        name,
        slug,
        description,
        category,
        phone,
        email,
        website,
        address,
        city,
        country: country || 'Russia',
        latitude,
        longitude,
        workingHours,
        logo,
        coverImage,
      },
    });

    res.status(201).json(business);
  } catch (error) {
    console.error('Create business error:', error);
    res.status(500).json({ error: 'Ошибка создания бизнеса' });
  }
});

// Обновить бизнес
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = (req as any).user.id;

    // Проверка владельца
    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business || business.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const updated = await prisma.business.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.error('Update business error:', error);
    res.status(500).json({ error: 'Ошибка обновления бизнеса' });
  }
});

// Удалить бизнес
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = (req as any).user.id;

    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business || business.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    await prisma.business.delete({
      where: { id },
    });

    res.json({ message: 'Бизнес удален' });
  } catch (error) {
    console.error('Delete business error:', error);
    res.status(500).json({ error: 'Ошибка удаления бизнеса' });
  }
});

// Получить услуги бизнеса
router.get('/:id/services', async (req, res) => {
  try {
    const { id } = req.params;

    const services = await prisma.service.findMany({
      where: {
        businessId: id,
        isActive: true,
      },
      include: {
        staff: {
          include: {
            staff: true,
          },
        },
      },
    });

    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Ошибка получения услуг' });
  }
});

// Получить доступные слоты для записи
router.get('/:id/available-slots', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, serviceId, staffId } = req.query;

    // TODO: Реализовать логику получения доступных слотов
    // Учитывать рабочее время, существующие записи, перерывы

    const slots = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    res.json({ slots });
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({ error: 'Ошибка получения слотов' });
  }
});

export default router;
