import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Создать услугу
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      businessId,
      name,
      description,
      category,
      price,
      duration,
      image,
      staffIds,
    } = req.body;

    // Проверка владельца бизнеса
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business || business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const service = await prisma.service.create({
      data: {
        businessId,
        name,
        description,
        category,
        price,
        duration,
        image,
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

    res.status(201).json(service);
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
