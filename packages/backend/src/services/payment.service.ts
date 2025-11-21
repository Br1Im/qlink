import { PrismaClient, PaymentMethod, TransactionStatus, TransactionType } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface CreatePaymentParams {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  userId: string;
  businessId: string;
}

interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  error?: string;
}

class PaymentService {
  // YooKassa (Яндекс.Касса)
  async createYooKassaPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    const { bookingId, amount, userId } = params;

    try {
      const response = await axios.post(
        'https://api.yookassa.ru/v3/payments',
        {
          amount: {
            value: amount.toFixed(2),
            currency: 'RUB',
          },
          confirmation: {
            type: 'redirect',
            return_url: `${process.env.FRONTEND_URL}/booking/${bookingId}/success`,
          },
          capture: true,
          description: `Оплата записи #${bookingId}`,
          metadata: {
            bookingId,
            userId,
          },
        },
        {
          auth: {
            username: process.env.YOOKASSA_SHOP_ID || '',
            password: process.env.YOOKASSA_SECRET_KEY || '',
          },
          headers: {
            'Idempotence-Key': `${bookingId}-${Date.now()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const transaction = await prisma.transaction.create({
        data: {
          businessId: params.businessId,
          userId,
          bookingId,
          type: TransactionType.BOOKING_PAYMENT,
          amount,
          paymentMethod: PaymentMethod.YOOKASSA,
          paymentId: response.data.id,
          status: TransactionStatus.PENDING,
        },
      });

      return {
        success: true,
        transactionId: transaction.id,
        paymentUrl: response.data.confirmation.confirmation_url,
      };
    } catch (error: any) {
      console.error('YooKassa payment error:', error);
      return {
        success: false,
        transactionId: '',
        error: error.message,
      };
    }
  }

  // Stripe
  async createStripePayment(params: CreatePaymentParams): Promise<PaymentResult> {
    const { bookingId, amount, userId } = params;

    try {
      // Здесь должна быть интеграция со Stripe
      // Для примера создаем транзакцию
      const transaction = await prisma.transaction.create({
        data: {
          businessId: params.businessId,
          userId,
          bookingId,
          type: TransactionType.BOOKING_PAYMENT,
          amount,
          paymentMethod: PaymentMethod.STRIPE,
          status: TransactionStatus.PENDING,
        },
      });

      return {
        success: true,
        transactionId: transaction.id,
        paymentUrl: `${process.env.FRONTEND_URL}/payment/stripe/${transaction.id}`,
      };
    } catch (error: any) {
      return {
        success: false,
        transactionId: '',
        error: error.message,
      };
    }
  }

  // Наличные
  async createCashPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    const { bookingId, amount, userId } = params;

    const transaction = await prisma.transaction.create({
      data: {
        businessId: params.businessId,
        userId,
        bookingId,
        type: TransactionType.BOOKING_PAYMENT,
        amount,
        paymentMethod: PaymentMethod.CASH,
        status: TransactionStatus.PENDING,
      },
    });

    return {
      success: true,
      transactionId: transaction.id,
    };
  }

  // Подтверждение оплаты
  async confirmPayment(transactionId: string) {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.COMPLETED,
        completedAt: new Date(),
      },
      include: {
        booking: true,
      },
    });

    // Обновляем статус записи
    if (transaction.bookingId) {
      await prisma.booking.update({
        where: { id: transaction.bookingId },
        data: { status: 'CONFIRMED' },
      });
    }

    return transaction;
  }

  // Возврат средств
  async refundPayment(transactionId: string, amount?: number) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const refundAmount = amount || transaction.amount;

    // Создаем транзакцию возврата
    const refund = await prisma.transaction.create({
      data: {
        businessId: transaction.businessId,
        userId: transaction.userId,
        bookingId: transaction.bookingId,
        type: TransactionType.REFUND,
        amount: -refundAmount,
        paymentMethod: transaction.paymentMethod,
        status: TransactionStatus.COMPLETED,
        completedAt: new Date(),
        metadata: {
          originalTransactionId: transactionId,
        },
      },
    });

    // Обновляем оригинальную транзакцию
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: TransactionStatus.REFUNDED },
    });

    return refund;
  }

  // Webhook от YooKassa
  async handleYooKassaWebhook(data: any) {
    const { object } = data;
    const { id, status, metadata } = object;

    const transaction = await prisma.transaction.findFirst({
      where: { paymentId: id },
    });

    if (!transaction) {
      console.error('Transaction not found for payment:', id);
      return;
    }

    if (status === 'succeeded') {
      await this.confirmPayment(transaction.id);
    } else if (status === 'canceled') {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: TransactionStatus.CANCELLED },
      });
    }
  }

  // Получение статистики по платежам
  async getPaymentStats(businessId: string, startDate: Date, endDate: Date) {
    const transactions = await prisma.transaction.findMany({
      where: {
        businessId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: TransactionStatus.COMPLETED,
      },
    });

    const totalRevenue = transactions
      .filter(t => t.type === TransactionType.BOOKING_PAYMENT)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalRefunds = transactions
      .filter(t => t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const byMethod = transactions.reduce((acc, t) => {
      const method = t.paymentMethod || 'UNKNOWN';
      acc[method] = (acc[method] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRevenue,
      totalRefunds,
      netRevenue: totalRevenue - totalRefunds,
      transactionCount: transactions.length,
      byMethod,
    };
  }
}

export const paymentService = new PaymentService();
