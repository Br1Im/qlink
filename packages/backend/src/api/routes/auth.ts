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
        password: hashedPassword,
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

    // Проверка пароля
    const isValid = await bcrypt.compare(password, owner.password);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

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

// Сброс пароля (временная реализация)
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email и новый пароль обязательны' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
    }

    // Ищем пользователя по email в таблице User (клиенты)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Обновляем пароль для клиента (в таблице User пароля нет, создаем BusinessOwner)
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Создаем или обновляем BusinessOwner для этого пользователя
      const owner = await prisma.businessOwner.upsert({
        where: { email },
        update: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        create: {
          email,
          password: hashedPassword,
          firstName: user.firstName || 'Пользователь',
          lastName: user.lastName || 'Q-Link',
          phone: user.phone || '',
          company: 'Q-Link Business',
        },
      });

      return res.json({ 
        success: true, 
        message: 'Пароль успешно обновлен',
        userId: owner.id 
      });
    }

    // Ищем в BusinessOwner
    const owner = await prisma.businessOwner.findUnique({
      where: { email },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Пользователь с таким email не найден' });
    }

    // Хеширование нового пароля
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновление пароля
    await prisma.businessOwner.update({
      where: { email },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    res.json({ 
      success: true, 
      message: 'Пароль успешно обновлен' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Ошибка при сбросе пароля' });
  }
});

export default router;
