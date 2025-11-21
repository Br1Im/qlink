import { Router } from 'express';
import { notificationService } from '../../services/notification.service';
import { PrismaClient, NotificationType } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Получить уведомления пользователя
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, unreadOnly } = req.query;

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        ...(unreadOnly === 'true' ? { isRead: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
    });

    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Отправить уведомление
router.post('/send', async (req, res) => {
  try {
    const { userId, type, title, message, data, channels } = req.body;

    const notification = await notificationService.send({
      userId,
      type: type as NotificationType,
      title,
      message,
      data,
      channels,
    });

    res.json(notification);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Отметить как прочитанное
router.patch('/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    res.json(notification);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Отметить все как прочитанные
router.patch('/user/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить уведомление
router.delete('/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
