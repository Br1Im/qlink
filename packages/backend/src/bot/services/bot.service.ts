import prisma from '../../lib/prisma';
import { BusinessCategory, BookingStatus } from '@prisma/client';

export class BotService {
  // Получить или создать пользователя по Telegram ID
  async getOrCreateUser(telegramId: string, userData: {
    firstName: string;
    lastName?: string;
    phone?: string;
  }) {
    let user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user && userData.phone) {
      user = await prisma.user.create({
        data: {
          telegramId,
          phone: userData.phone,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      });
    }

    return user;
  }

  // Получить список бизнесов по категории
  async getBusinessesByCategory(category: BusinessCategory, city?: string) {
    return await prisma.business.findMany({
      where: {
        category,
        isActive: true,
        ...(city && { city }),
      },
      include: {
        services: {
          where: { isActive: true },
          take: 5,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });
  }

  // Получить бизнес по ID
  async getBusinessById(businessId: string) {
    return await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        services: {
          where: { isActive: true },
        },
        staff: {
          where: { isActive: true },
        },
      },
    });
  }

  // Получить услуги бизнеса
  async getBusinessServices(businessId: string) {
    return await prisma.service.findMany({
      where: {
        businessId,
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
  }

  // Получить записи пользователя
  async getUserBookings(userId: string) {
    return await prisma.booking.findMany({
      where: {
        userId,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
      },
      include: {
        business: true,
        service: true,
        staff: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  // Создать запись
  async createBooking(data: {
    userId: string;
    businessId: string;
    serviceId: string;
    staffId?: string;
    date: Date;
    startTime: string;
    endTime: string;
    price: number;
    comment?: string;
  }) {
    return await prisma.booking.create({
      data: {
        ...data,
        status: BookingStatus.PENDING,
      },
      include: {
        business: true,
        service: true,
        staff: true,
      },
    });
  }

  // Отменить запись
  async cancelBooking(bookingId: string) {
    return await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }

  // Получить доступные слоты для записи
  async getAvailableSlots(businessId: string, serviceId: string, date: Date) {
    // Получаем все записи на эту дату
    const bookings = await prisma.booking.findMany({
      where: {
        businessId,
        date,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // Получаем информацию о бизнесе и услуге
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!business || !service) {
      return [];
    }

    // Генерируем доступные слоты
    const workingHours = business.workingHours as any;
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const daySchedule = workingHours[dayOfWeek];

    if (!daySchedule) {
      return [];
    }

    const slots: string[] = [];
    const [openHour, openMinute] = daySchedule.open.split(':').map(Number);
    const [closeHour, closeMinute] = daySchedule.close.split(':').map(Number);

    let currentTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    while (currentTime + service.duration <= closeTime) {
      const hour = Math.floor(currentTime / 60);
      const minute = currentTime % 60;
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Проверяем, не занят ли слот
      const isBooked = bookings.some(booking => {
        const [bookingStartHour, bookingStartMinute] = booking.startTime.split(':').map(Number);
        const [bookingEndHour, bookingEndMinute] = booking.endTime.split(':').map(Number);
        
        const bookingStart = bookingStartHour * 60 + bookingStartMinute;
        const bookingEnd = bookingEndHour * 60 + bookingEndMinute;

        return currentTime >= bookingStart && currentTime < bookingEnd;
      });

      if (!isBooked) {
        slots.push(timeSlot);
      }

      currentTime += 30; // Интервал 30 минут
    }

    return slots;
  }

  // Поиск бизнесов по названию
  async searchBusinesses(query: string, category?: BusinessCategory) {
    return await prisma.business.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { address: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        services: {
          where: { isActive: true },
          take: 3,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });
  }

  // Получить отзывы о бизнесе
  async getBusinessReviews(businessId: string, limit: number = 10) {
    return await prisma.review.findMany({
      where: { businessId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  // Добавить бизнес в избранное
  async addToFavorites(userId: string, businessId: string) {
    return await prisma.favorite.create({
      data: {
        userId,
        businessId,
      },
    });
  }

  // Удалить из избранного
  async removeFromFavorites(userId: string, businessId: string) {
    return await prisma.favorite.deleteMany({
      where: {
        userId,
        businessId,
      },
    });
  }

  // Получить избранные бизнесы
  async getFavorites(userId: string) {
    return await prisma.favorite.findMany({
      where: { userId },
      include: {
        business: {
          include: {
            services: {
              where: { isActive: true },
              take: 3,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export const botService = new BotService();
