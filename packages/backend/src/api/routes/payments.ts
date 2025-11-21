import { Router } from 'express';
import { paymentService } from '../../services/payment.service';
import { PaymentMethod } from '@prisma/client';

const router = Router();

// Создать платеж
router.post('/create', async (req, res) => {
  try {
    const { bookingId, amount, method, userId, businessId } = req.body;

    let result;
    switch (method) {
      case PaymentMethod.YOOKASSA:
        result = await paymentService.createYooKassaPayment({
          bookingId,
          amount,
          method,
          userId,
          businessId,
        });
        break;
      case PaymentMethod.STRIPE:
        result = await paymentService.createStripePayment({
          bookingId,
          amount,
          method,
          userId,
          businessId,
        });
        break;
      case PaymentMethod.CASH:
        result = await paymentService.createCashPayment({
          bookingId,
          amount,
          method,
          userId,
          businessId,
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid payment method' });
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Подтвердить платеж
router.post('/confirm/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await paymentService.confirmPayment(transactionId);
    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Возврат средств
router.post('/refund/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { amount } = req.body;
    const refund = await paymentService.refundPayment(transactionId, amount);
    res.json(refund);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook от YooKassa
router.post('/webhook/yookassa', async (req, res) => {
  try {
    await paymentService.handleYooKassaWebhook(req.body);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Статистика по платежам
router.get('/stats/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { startDate, endDate } = req.query;

    const stats = await paymentService.getPaymentStats(
      businessId,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
