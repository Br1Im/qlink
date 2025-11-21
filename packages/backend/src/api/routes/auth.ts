import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Регистрация владельца бизнеса
router.post('/register', async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName, company } = req.body;

    // Проверка существующего пользователя
    const existing = await prisma.businessOwner.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание владельца
    const owner = await prisma.businessOwner.create({
      data: {
        email,
        phone,
        firstName,
        lastName,
        company,
      },
    });

    // Генерация токена
    const token = jwt.sign({ id: owner.id, email: owner.email }, JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token,
      owner: {
        id: owner.id,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await prisma.businessOwner.findUnique({
      where: { email },
    });

    if (!owner) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    // Проверка пароля (в реальном приложении нужно хранить хеш)
    // const isValid = await bcrypt.compare(password, owner.password);

    const token = jwt.sign({ id: owner.id, email: owner.email }, JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token,
      owner: {
        id: owner.id,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

// Получение профиля
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Не авторизован' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const owner = await prisma.businessOwner.findUnique({
      where: { id: decoded.id },
      include: {
        businesses: true,
      },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(owner);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(401).json({ error: 'Неверный токен' });
  }
});

export default router;
