import { Router } from 'express';
import { loyaltyService } from '../../services/loyalty.service';

const router = Router();

// Получить баланс
router.get('/balance/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const balance = await loyaltyService.getBalance(userId);
    res.json(balance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить историю
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    const history = await loyaltyService.getHistory(
      userId,
      limit ? parseInt(limit as string) : undefined
    );
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Начислить баллы
router.post('/earn', async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const points = await loyaltyService.earnPoints(userId, amount, description);
    res.json({ points });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Списать баллы
router.post('/spend', async (req, res) => {
  try {
    const { userId, points, description } = req.body;
    const spent = await loyaltyService.spendPoints(userId, points, description);
    res.json({ spent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Дать бонус
router.post('/bonus', async (req, res) => {
  try {
    const { userId, points, description } = req.body;
    const bonus = await loyaltyService.giveBonus(userId, points, description);
    res.json({ bonus });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
