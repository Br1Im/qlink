# Authentication Service - Документация

## Обзор

Authentication Service обеспечивает полную систему аутентификации и авторизации для платформы Qlink, включая регистрацию, вход по телефону/email, аутентификацию через Telegram и управление JWT токенами.

## ✅ Реализованные функции

### 1. Регистрация пользователей
- Регистрация по телефону или email
- Валидация данных с помощью Zod
- Хеширование паролей (bcrypt, cost factor 12)
- Автоматическая генерация JWT токенов
- Нормализация телефонных номеров

### 2. Вход пользователей
- Вход по телефону и паролю
- Проверка учетных данных
- Генерация access и refresh токенов
- Обработка ошибок аутентификации

### 3. Аутентификация через Telegram
- Валидация Telegram auth data
- Автоматическое создание пользователя
- Обновление данных существующего пользователя
- Проверка подлинности данных (hash verification)

### 4. Управление токенами
- Access token (срок действия: 15 минут)
- Refresh token (срок действия: 7 дней)
- Обновление access token через refresh token
- JWT payload с userId и role

### 5. Защита endpoints
- Middleware requireAuth для проверки аутентификации
- Middleware requireRole для проверки прав доступа
- Middleware optionalAuth для опциональной аутентификации
- Обработка ошибок авторизации

## API Endpoints

### Публичные endpoints

#### POST /api/auth/register
Регистрация нового пользователя

**Request Body:**
```json
{
  "phone": "+79991234567",
  "password": "Password123",
  "firstName": "Иван",
  "lastName": "Петров"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "phone": "+79991234567",
      "firstName": "Иван",
      "lastName": "Петров",
      "role": "client",
      "createdAt": "2024-11-13T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

#### POST /api/auth/login
Вход пользователя

**Request Body:**
```json
{
  "phone": "+79991234567",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... }
  }
}
```

#### POST /api/auth/telegram
Аутентификация через Telegram

**Request Body:**
```json
{
  "id": "123456789",
  "first_name": "Иван",
  "last_name": "Петров",
  "auth_date": 1699833600,
  "hash": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... }
  }
}
```

#### POST /api/auth/refresh
Обновление access token

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

### Защищенные endpoints

Требуют заголовок: `Authorization: Bearer <access_token>`

#### GET /api/auth/me
Получение профиля текущего пользователя

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "phone": "+79991234567",
      "firstName": "Иван",
      "lastName": "Петров",
      "role": "client",
      "createdAt": "2024-11-13T00:00:00.000Z"
    }
  }
}
```

#### PATCH /api/auth/profile
Обновление профиля пользователя

**Request Body:**
```json
{
  "firstName": "Иван",
  "lastName": "Петров",
  "email": "ivan@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

#### POST /api/auth/change-password
Изменение пароля

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Пароль успешно изменен"
  }
}
```

## Структура файлов

```
src/
├── types/
│   ├── user.types.ts          # Типы пользователей и токенов
│   ├── api.types.ts           # Типы API ответов
│   └── index.ts
├── schemas/
│   ├── auth.schemas.ts        # Zod схемы валидации
│   └── index.ts
├── utils/
│   ├── phone.utils.ts         # Утилиты для телефонов
│   ├── jwt.utils.ts           # Утилиты для JWT
│   ├── password.utils.ts      # Утилиты для паролей
│   ├── telegram.utils.ts      # Утилиты для Telegram
│   └── index.ts
├── services/
│   ├── auth.service.ts        # Бизнес-логика аутентификации
│   └── index.ts
├── controllers/
│   ├── auth.controller.ts     # HTTP контроллеры
│   └── index.ts
├── middleware/
│   ├── auth.middleware.ts     # Middleware аутентификации
│   ├── error.middleware.ts    # Обработка ошибок
│   ├── validation.middleware.ts # Валидация запросов
│   └── index.ts
├── routes/
│   ├── auth.routes.ts         # Маршруты аутентификации
│   └── index.ts
└── index.ts                   # Главный файл приложения
```

## Использование middleware

### requireAuth
Требует аутентификации пользователя

```typescript
import { requireAuth } from './middleware';

router.get('/protected', requireAuth, (req, res) => {
  const userId = req.user.userId;
  // ...
});
```

### requireRole
Требует определенную роль пользователя

```typescript
import { requireAuth, requireRole } from './middleware';
import { UserRole } from '@prisma/client';

router.post(
  '/admin-only',
  requireAuth,
  requireRole(UserRole.admin),
  (req, res) => {
    // Только для администраторов
  }
);
```

### optionalAuth
Опциональная аутентификация

```typescript
import { optionalAuth } from './middleware';

router.get('/public', optionalAuth, (req, res) => {
  if (req.user) {
    // Пользователь авторизован
  } else {
    // Пользователь не авторизован
  }
});
```

## Валидация данных

### Телефонные номера
- Поддерживаются форматы: +79991234567, 79991234567, 89991234567
- Автоматическая нормализация к формату +79991234567
- Валидация российских номеров

### Пароли
- Минимум 8 символов
- Минимум одна буква и одна цифра
- Хеширование с bcrypt (cost factor 12)

### Telegram данные
- Проверка подлинности через hash
- Проверка времени аутентификации (не более 24 часов)
- Валидация обязательных полей

## Безопасность

### JWT токены
- Access token: короткий срок действия (15 минут)
- Refresh token: длительный срок действия (7 дней)
- Подпись с использованием секретных ключей
- Payload содержит только userId и role

### Хеширование паролей
- Алгоритм: bcrypt
- Cost factor: 12 (настраивается через BCRYPT_ROUNDS)
- Соль генерируется автоматически

### Rate Limiting
- 100 запросов на IP за 15 минут
- Применяется ко всем /api/* endpoints

### CORS
- Настроен для frontend URL
- Поддержка credentials

### Helmet
- Установка security headers
- Защита от XSS, clickjacking и других атак

## Переменные окружения

```env
# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=12

# Telegram
TELEGRAM_BOT_TOKEN=your-telegram-bot-token

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Обработка ошибок

### Коды ошибок

- `REGISTRATION_FAILED` - Ошибка при регистрации
- `LOGIN_FAILED` - Ошибка при входе
- `REFRESH_FAILED` - Ошибка при обновлении токена
- `UNAUTHORIZED` - Требуется аутентификация
- `FORBIDDEN` - Недостаточно прав доступа
- `VALIDATION_ERROR` - Ошибка валидации данных
- `DATABASE_ERROR` - Ошибка базы данных
- `INVALID_TOKEN` - Неверный или истекший токен

### Формат ошибки

```json
{
  "success": false,
  "error": {
    "code": "LOGIN_FAILED",
    "message": "Неверный номер телефона или пароль",
    "details": { ... }
  }
}
```

## Примеры использования

### Регистрация и вход

```typescript
// Регистрация
const response = await fetch('http://localhost:3001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+79991234567',
    password: 'Password123',
    firstName: 'Иван',
  }),
});

const { data } = await response.json();
const { user, tokens } = data;

// Сохранить токены
localStorage.setItem('accessToken', tokens.accessToken);
localStorage.setItem('refreshToken', tokens.refreshToken);
```

### Использование токена

```typescript
// Запрос с токеном
const response = await fetch('http://localhost:3001/api/auth/me', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const { data } = await response.json();
console.log(data.user);
```

### Обновление токена

```typescript
// Обновить access token
const response = await fetch('http://localhost:3001/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refreshToken: localStorage.getItem('refreshToken'),
  }),
});

const { data } = await response.json();
localStorage.setItem('accessToken', data.tokens.accessToken);
localStorage.setItem('refreshToken', data.tokens.refreshToken);
```

## Соответствие требованиям

- ✅ **Требование 2.1**: Регистрация и вход пользователей
- ✅ **Требование 2.4**: Аутентификация через Telegram
- ✅ **Требование 13.1**: Безопасность (bcrypt, JWT, rate limiting)
- ✅ **Требование 13.3**: Защита endpoints с middleware

## Следующие шаги

После реализации Authentication Service можно приступать к:

1. **Task 4**: Venue Service (управление заведениями)
2. **Task 5**: Booking Service (система записей)
3. **Task 7**: Notification Service (уведомления)

## Тестирование

Для тестирования API можно использовать:

1. **Postman/Insomnia** - импортировать коллекцию endpoints
2. **curl** - примеры команд в документации
3. **REST Client** (VS Code) - создать .http файлы

Пример .http файла:

```http
### Register
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "phone": "+79991234567",
  "password": "Password123",
  "firstName": "Иван"
}

### Login
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "phone": "+79991234567",
  "password": "Password123"
}

### Get Profile
GET http://localhost:3001/api/auth/me
Authorization: Bearer {{accessToken}}
```
