# 🤖 Настройка подключения бота к базе данных

## Текущий статус

✅ Prisma схема создана  
✅ Prisma Client установлен (@prisma/client@5.22.0)  
✅ Сервис для работы с БД создан  
⚠️ Требуется установка Prisma CLI  
⚠️ Требуется генерация Prisma Client  
⚠️ Требуется миграция БД  

## Шаги для настройки

### 1. Установка Prisma CLI

```bash
cd packages/backend
npm install -D prisma
```

### 2. Генерация Prisma Client

```bash
npx prisma generate
```

Эта команда создаст типизированный клиент для работы с БД.

### 3. Проверка подключения к БД

```bash
npx prisma db push
```

Эта команда синхронизирует схему с БД без создания миграций.

### 4. Создание миграций (для production)

```bash
npx prisma migrate dev --name init
```

### 5. Заполнение БД тестовыми данными

```bash
npx prisma db seed
```

## Структура файлов

```
packages/backend/
├── prisma/
│   ├── schema.prisma          ✅ Схема БД
│   └── seed.ts                ✅ Seed данные
├── src/
│   ├── lib/
│   │   └── prisma.ts          ✅ Prisma Client
│   └── bot/
│       ├── index.ts           ✅ Основной файл бота
│       └── services/
│           └── bot.service.ts ✅ Сервис для работы с БД
└── .env                       ✅ Конфигурация
```

## Проверка подключения

### Способ 1: Через Prisma Studio

```bash
npx prisma studio
```

Откроется веб-интерфейс для просмотра данных БД на http://localhost:5555

### Способ 2: Через код

Создайте файл `test-connection.ts`:

```typescript
import prisma from './src/lib/prisma';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Подключение к БД успешно!');
    
    const businessCount = await prisma.business.count();
    console.log(`📊 Бизнесов в БД: ${businessCount}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error);
  }
}

testConnection();
```

Запустите:
```bash
npx tsx test-connection.ts
```

## Интеграция бота с БД

### Текущая реализация

Создан сервис `BotService` с методами:

**Пользователи:**
- `getOrCreateUser()` - Получить или создать пользователя
- `getUserBookings()` - Получить записи пользователя

**Бизнесы:**
- `getBusinessesByCategory()` - Получить бизнесы по категории
- `getBusinessById()` - Получить бизнес по ID
- `searchBusinesses()` - Поиск бизнесов
- `getBusinessReviews()` - Получить отзывы

**Услуги:**
- `getBusinessServices()` - Получить услуги бизнеса
- `getAvailableSlots()` - Получить доступные слоты

**Записи:**
- `createBooking()` - Создать запись
- `cancelBooking()` - Отменить запись

**Избранное:**
- `addToFavorites()` - Добавить в избранное
- `removeFromFavorites()` - Удалить из избранного
- `getFavorites()` - Получить избранное

### Пример использования в боте

```typescript
import { botService } from './services/bot.service';
import { BusinessCategory } from '@prisma/client';

// Получить салоны красоты
bot.hears('💇 Красота', async (ctx) => {
  try {
    const businesses = await botService.getBusinessesByCategory(
      BusinessCategory.BEAUTY,
      'Москва'
    );
    
    if (businesses.length === 0) {
      await ctx.reply('Салоны не найдены');
      return;
    }
    
    let message = '💇 Салоны красоты рядом с вами:\n\n';
    
    businesses.forEach((business, index) => {
      message += `${index + 1}. ${business.name}\n`;
      message += `   ⭐ ${business.rating} (${business.reviewCount} отзывов)\n`;
      message += `   📍 ${business.address}\n`;
      message += `   💰 от ${Math.min(...business.services.map(s => s.price))} ₽\n\n`;
    });
    
    await ctx.reply(message);
  } catch (error) {
    console.error('Error:', error);
    await ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
});

// Создать запись
bot.on(message('contact'), async (ctx) => {
  try {
    const phone = ctx.message.contact.phone_number;
    const telegramId = ctx.from.id.toString();
    
    // Создаем или получаем пользователя
    const user = await botService.getOrCreateUser(telegramId, {
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
      phone,
    });
    
    if (!user) {
      await ctx.reply('Ошибка создания пользователя');
      return;
    }
    
    // Создаем запись
    const booking = await botService.createBooking({
      userId: user.id,
      businessId: 'business-id',
      serviceId: 'service-id',
      date: new Date('2024-11-25'),
      startTime: '14:00',
      endTime: '15:30',
      price: 1500,
    });
    
    await ctx.reply(
      `✅ Запись успешно создана!\n\n` +
      `💇 ${booking.business.name}\n` +
      `📍 ${booking.business.address}\n` +
      `✂️ ${booking.service.name}\n` +
      `📅 ${booking.date.toLocaleDateString()}, ${booking.startTime}\n` +
      `💰 ${booking.price} ₽\n` +
      `📱 ${phone}`
    );
  } catch (error) {
    console.error('Error:', error);
    await ctx.reply('Произошла ошибка при создании записи');
  }
});
```

## Обновление бота

### Файл: `packages/backend/src/bot/index.ts`

Замените захардкоженные данные на вызовы `botService`:

**Было:**
```typescript
bot.hears('💇 Красота', async (ctx) => {
  await ctx.reply(
    '💇 Салоны красоты рядом с вами:\n\n' +
    '1. Салон "Красота"\n' +
    '   ⭐ 4.9 (120 отзывов)\n' +
    // ...
  );
});
```

**Стало:**
```typescript
import { botService } from './services/bot.service';
import { BusinessCategory } from '@prisma/client';

bot.hears('💇 Красота', async (ctx) => {
  const businesses = await botService.getBusinessesByCategory(
    BusinessCategory.BEAUTY
  );
  
  // Формируем сообщение из реальных данных
  let message = '💇 Салоны красоты рядом с вами:\n\n';
  businesses.forEach((b, i) => {
    message += `${i + 1}. ${b.name}\n`;
    message += `   ⭐ ${b.rating} (${b.reviewCount} отзывов)\n`;
    message += `   📍 ${b.address}\n\n`;
  });
  
  await ctx.reply(message);
});
```

## Проблемы и решения

### Проблема 1: Prisma Client не генерируется

**Решение:**
```bash
# Удалите node_modules и установите заново
rm -rf node_modules
npm install
npx prisma generate
```

### Проблема 2: БД не подключается

**Проверьте:**
1. PostgreSQL запущен
2. DATABASE_URL в .env правильный
3. База данных создана

```bash
# Создать БД
createdb qlink

# Или через psql
psql -U postgres
CREATE DATABASE qlink;
```

### Проблема 3: Ошибка "Table does not exist"

**Решение:**
```bash
# Синхронизируйте схему с БД
npx prisma db push

# Или создайте миграцию
npx prisma migrate dev
```

## Тестирование

### 1. Проверка подключения

```bash
npx prisma db pull
```

Должно показать текущую схему БД.

### 2. Просмотр данных

```bash
npx prisma studio
```

Откроется веб-интерфейс для просмотра данных.

### 3. Тестовый запрос

```typescript
import prisma from './src/lib/prisma';

async function test() {
  const businesses = await prisma.business.findMany({
    take: 5,
  });
  console.log('Businesses:', businesses);
}

test();
```

## Следующие шаги

1. ✅ Установить Prisma CLI
2. ✅ Сгенерировать Prisma Client
3. ✅ Создать миграции
4. ✅ Заполнить БД тестовыми данными
5. ✅ Обновить бота для использования БД
6. ✅ Протестировать все функции
7. ✅ Добавить обработку ошибок
8. ✅ Добавить логирование

## Полезные команды

```bash
# Генерация Prisma Client
npx prisma generate

# Синхронизация схемы с БД (dev)
npx prisma db push

# Создание миграции
npx prisma migrate dev --name migration_name

# Применение миграций (production)
npx prisma migrate deploy

# Просмотр данных
npx prisma studio

# Сброс БД
npx prisma migrate reset

# Заполнение данными
npx prisma db seed

# Форматирование схемы
npx prisma format

# Валидация схемы
npx prisma validate
```

## Документация

- [Prisma Docs](https://www.prisma.io/docs)
- [Telegraf Docs](https://telegraf.js.org)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Статус:** ⚠️ Требуется настройка  
**Дата:** 21 ноября 2024  
**Версия:** 1.0
