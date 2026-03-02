import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Получить услуги бизнеса
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ownerId = (req as any).user.id;

    // Получаем бизнес владельца
    const businesses = await prisma.business.findMany({
      where: { ownerId },
    });

    if (businesses.length === 0) {
      return res.json([]);
    }

    const businessId = businesses[0].id;

    const services = await prisma.service.findMany({
      where: { businessId },
      include: {
        staff: {
          include: {
            staff: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });

    res.json(services.map((service: any) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      image: service.image,
      staff: service.staff.map((ss: any) => `${ss.staff.firstName} ${ss.staff.lastName}`),
      bookings: service._count.bookings,
      isActive: service.isActive,
    })));
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Ошибка получения услуг' });
  }
});

// Создать услугу
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      duration,
      image,
      staffIds,
    } = req.body;

    const ownerId = (req as any).user.id;

    // Получаем бизнес владельца
    let business = await prisma.business.findFirst({
      where: { ownerId },
    });

    // Если бизнеса нет, создаем его
    if (!business) {
      const owner = await prisma.businessOwner.findUnique({
        where: { id: ownerId },
      });

      business = await prisma.business.create({
        data: {
          ownerId,
          name: owner?.company || 'Мой бизнес',
          slug: `business-${Date.now()}`,
          description: '',
          category: 'OTHER',
          address: '',
          city: '',
          country: 'RU',
          phone: owner?.phone || '',
          email: owner?.email || '',
          workingHours: {},
        },
      });
    }

    const service = await prisma.service.create({
      data: {
        businessId: business.id,
        name,
        description: description || '',
        category: category || 'Общее',
        price: parseFloat(price),
        duration: parseInt(duration),
        image: image || null,
      },
    });

    // Связать с сотрудниками
    if (staffIds && staffIds.length > 0) {
      await prisma.serviceStaff.createMany({
        data: staffIds.map((staffId: string) => ({
          serviceId: service.id,
          staffId,
        })),
      });
    }

    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Ошибка создания услуги' });
  }
});

// Обновить услугу
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { staffIds, ...data } = req.body;

    const service = await prisma.service.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!service || service.business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const updated = await prisma.service.update({
      where: { id },
      data,
    });

    // Обновить связи с сотрудниками
    if (staffIds) {
      await prisma.serviceStaff.deleteMany({
        where: { serviceId: id },
      });

      if (staffIds.length > 0) {
        await prisma.serviceStaff.createMany({
          data: staffIds.map((staffId: string) => ({
            serviceId: id,
            staffId,
          })),
        });
      }
    }

    res.json(updated);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Ошибка обновления услуги' });
  }
});

// Удалить услугу
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!service || service.business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    await prisma.service.delete({
      where: { id },
    });

    res.json({ message: 'Услуга удалена' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Ошибка удаления услуги' });
  }
});

export default router;
