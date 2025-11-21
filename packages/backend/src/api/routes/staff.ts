import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Создать сотрудника
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      businessId,
      firstName,
      lastName,
      position,
      avatar,
      bio,
      workingHours,
    } = req.body;

    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business || business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const staff = await prisma.staff.create({
      data: {
        businessId,
        firstName,
        lastName,
        position,
        avatar,
        bio,
        workingHours,
      },
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error('Create staff error:', error);
    res.status(500).json({ error: 'Ошибка создания сотрудника' });
  }
});

// Получить сотрудников бизнеса
router.get('/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    const staff = await prisma.staff.findMany({
      where: {
        businessId,
        isActive: true,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });

    res.json(staff);
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ error: 'Ошибка получения сотрудников' });
  }
});

// Обновить сотрудника
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!staff || staff.business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const updated = await prisma.staff.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.error('Update staff error:', error);
    res.status(500).json({ error: 'Ошибка обновления сотрудника' });
  }
});

// Удалить сотрудника
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!staff || staff.business.ownerId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    await prisma.staff.delete({
      where: { id },
    });

    res.json({ message: 'Сотрудник удален' });
  } catch (error) {
    console.error('Delete staff error:', error);
    res.status(500).json({ error: 'Ошибка удаления сотрудника' });
  }
});

export default router;
