import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Создать отзыв
router.post('/', async (req, res) => {
  try {
    const { userId, businessId, rating, comment, images } = req.body;

    // Проверка, был ли пользователь в этом бизнесе
    const hasBooking = await prisma.booking.findFirst({
      where: {
        userId,
        businessId,
        status: 'COMPLETED',
      },
    });

    if (!hasBooking) {
      return res
        .status(400)
        .json({ error: 'Вы можете оставить отзыв только после посещения' });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        businessId,
        rating,
        comment,
        images: images || [],
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // Обновить рейтинг бизнеса
    const reviews = await prisma.review.findMany({
      where: { businessId },
    });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.business.update({
      where: { id: businessId },
      data: {
        rating: avgRating,
        reviewCount: reviews.length,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Ошибка создания отзыва' });
  }
});

// Получить отзывы бизнеса
router.get('/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { page = 1, limit = 10, rating } = req.query;

    const where: any = { businessId };
    if (rating) {
      where.rating = Number(rating);
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
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
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.review.count({ where }),
    ]);

    res.json({
      reviews,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Ошибка получения отзывов' });
  }
});

// Ответить на отзыв (владелец)
router.patch('/:id/response', async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        response,
        responseDate: new Date(),
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Respond to review error:', error);
    res.status(500).json({ error: 'Ошибка ответа на отзыв' });
  }
});

export default router;
