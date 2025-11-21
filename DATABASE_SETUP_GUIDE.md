# 🗄️ Руководство по настройке базы данных

## Текущий статус

❌ PostgreSQL не установлен  
✅ Prisma схема готова  
✅ Сервисы для работы с БД созданы  
⚠️ Требуется установка и настройка PostgreSQL  

## Установка PostgreSQL на Windows

### Способ 1: Официальный установщик (Рекомендуется)

1. **Скачайте PostgreSQL:**
   - Перейдите на https://www.postgresql.org/download/windows/
   - Скачайте последнюю версию (рекомендуется 15.x или 16.x)

2. **Установите PostgreSQL:**
   - Запустите установщик
   - Выберите компоненты:
     - ✅ PostgreSQL Server
     - ✅ pgAdmin 4
     - ✅ Command Line Tools
   - Установите пароль для пользователя `postgres` (запомните его!)
   - Порт: `5432` (по умолчанию)
   - Locale: `Russian, Russia` или `English, United States`

3. **Проверьте установку:**
   ```bash
   # Откройте новый терминал
   psql --version
   ```

### Способ 2: Через Docker (Альтернатива)

Если у вас установлен Docker:

```bash
# Запустите PostgreSQL в контейнере
docker run --name qlink-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=qlink \
  -p 5432:5432 \
  -d postgres:15

# Проверьте, что контейнер запущен
docker ps
```

## Создание базы данных

### Через psql (Command Line)

```bash
# Подключитесь к PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE qlink;

# Создайте пользователя (опционально)
CREATE USER qlink_user WITH PASSWORD 'your_password';

# Дайте права пользователю
GRANT ALL PRIVILEGES ON DATABASE qlink TO qlink_user;

# Выйдите
\q
```

### Через pgAdmin 4 (GUI)

1. Откройте pgAdmin 4
2. Подключитесь к серверу (localhost)
3. Правый клик на "Databases" → "Create" → "Database"
4. Имя: `qlink`
5. Owner: `postgres`
6. Нажмите "Save"

## Настройка подключения

### 1. Обновите .env файл

Откройте `packages/backend/.env` и обновите `DATABASE_URL`:

```env
# Если используете пользователя postgres
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/qlink"

# Если создали отдельного пользователя
DATABASE_URL="postgresql://qlink_user:your_password@localhost:5432/qlink"

# Для Docker
DATABASE_URL="postgresql://postgres:password@localhost:5432/qlink"
```

**Формат:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

### 2. Проверьте подключение

```bash
cd packages/backend

# Проверьте подключение через Prisma
npx prisma db pull
```

Если подключение успешно, вы увидите сообщение о синхронизации схемы.

## Настройка Prisma

### 1. Установите Prisma CLI

```bash
cd packages/backend
npm install -D prisma
```

### 2. Сгенерируйте Prisma Client

```bash
npx prisma generate
```

Эта команда создаст типизированный клиент для работы с БД.

### 3. Синхронизируйте схему с БД

**Для разработки (быстрый способ):**
```bash
npx prisma db push
```

**Для production (с миграциями):**
```bash
npx prisma migrate dev --name init
```

### 4. Заполните БД тестовыми данными

```bash
npx prisma db seed
```

## Проверка работы

### 1. Откройте Prisma Studio

```bash
npx prisma studio
```

Откроется веб-интерфейс на http://localhost:5555

### 2. Проверьте таблицы

В Prisma Studio вы должны увидеть все таблицы:
- User
- Business
- Service
- Staff
- Booking
- Review
- и другие...

### 3. Тестовый запрос

Создайте файл `test-db.ts`:

```typescript
import prisma from './src/lib/prisma';

async function testDatabase() {
  try {
    console.log('🔄 Подключение к БД...');
    await prisma.$connect();
    console.log('✅ Подключение успешно!');
    
    // Проверяем количество записей
    const businessCount = await prisma.business.count();
    const userCount = await prisma.user.count();
    const bookingCount = await prisma.booking.count();
    
    console.log('\n📊 Статистика БД:');
    console.log(`   Бизнесов: ${businessCount}`);
    console.log(`   Пользователей: ${userCount}`);
    console.log(`   Записей: ${bookingCount}`);
    
    // Получаем первый бизнес
    const firstBusiness = await prisma.business.findFirst({
      include: {
        services: true,
        staff: true,
      },
    });
    
    if (firstBusiness) {
      console.log('\n🏢 Первый бизнес:');
      console.log(`   Название: ${firstBusiness.name}`);
      console.log(`   Услуг: ${firstBusiness.services.length}`);
      console.log(`   Сотрудников: ${firstBusiness.staff.length}`);
    }
    
    await prisma.$disconnect();
    console.log('\n✅ Тест завершен успешно!');
  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testDatabase();
```

Запустите:
```bash
npx tsx test-db.ts
```

## Интеграция бота с БД

### 1. Обновите бота

Откройте `packages/backend/src/bot/index.ts` и добавьте импорт:

```typescript
import { botService } from './services/bot.service';
import { BusinessCategory } from '@prisma/client';
```

### 2. Замените захардкоженные данные

**Пример для категории "Красота":**

```typescript
bot.hears('💇 Красота', async (ctx) => {
  try {
    const businesses = await botService.getBusinessesByCategory(
      BusinessCategory.BEAUTY,
      'Москва'
    );
    
    if (businesses.length === 0) {
      await ctx.reply('Салоны не найдены в вашем городе');
      return;
    }
    
    let message = '💇 Салоны красоты рядом с вами:\n\n';
    
    businesses.forEach((business, index) => {
      message += `${index + 1}. ${business.name}\n`;
      message += `   ⭐ ${business.rating.toFixed(1)} (${business.reviewCount} отзывов)\n`;
      message += `   📍 ${business.address}\n`;
      
      if (business.services.length > 0) {
        const minPrice = Math.min(...business.services.map(s => s.price));
        message += `   💰 от ${minPrice} ₽\n`;
      }
      
      message += '\n';
    });
    
    // Создаем кнопки для каждого бизнеса
    const buttons = businesses.map((business, index) => 
      Markup.button.callback(business.name, `salon_${business.id}`)
    );
    
    await ctx.reply(
      message,
      Markup.inlineKeyboard([
        ...buttons.map(btn => [btn]),
        [Markup.button.callback('Показать на карте', 'show_map')]
      ])
    );
  } catch (error) {
    console.error('Error fetching businesses:', error);
    await ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
});
```

### 3. Обновите обработчик записей

```typescript
bot.hears('📋 Мои записи', async (ctx) => {
  try {
    const telegramId = ctx.from.id.toString();
    
    // Получаем пользователя
    const user = await prisma.user.findUnique({
      where: { telegramId },
    });
    
    if (!user) {
      await ctx.reply('У вас пока нет записей');
      return;
    }
    
    // Получаем записи
    const bookings = await botService.getUserBookings(user.id);
    
    if (bookings.length === 0) {
      await ctx.reply('У вас пока нет записей');
      return;
    }
    
    let message = '📋 Ваши записи:\n\n';
    
    bookings.forEach((booking, index) => {
      message += `${index + 1}. ${booking.business.name}\n`;
      message += `   📅 ${booking.date.toLocaleDateString()}, ${booking.startTime}\n`;
      message += `   ✂️ ${booking.service.name}\n`;
      message += `   💰 ${booking.price} ₽\n`;
      message += `   📊 Статус: ${getStatusText(booking.status)}\n\n`;
    });
    
    await ctx.reply(
      message,
      Markup.inlineKeyboard([
        [Markup.button.callback('Отменить запись', 'cancel_booking')],
        [Markup.button.callback('Перенести запись', 'reschedule_booking')]
      ])
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    await ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
});

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: '⏳ Ожидает подтверждения',
    CONFIRMED: '✅ Подтверждена',
    COMPLETED: '✔️ Завершена',
    CANCELLED: '❌ Отменена',
    NO_SHOW: '⚠️ Не явился',
  };
  return statusMap[status] || status;
}
```

## Проблемы и решения

### Проблема 1: "Connection refused"

**Причина:** PostgreSQL не запущен

**Решение:**
```bash
# Windows (через Services)
1. Win + R → services.msc
2. Найдите "postgresql-x64-15"
3. Правый клик → Start

# Или через командную строку (от администратора)
net start postgresql-x64-15
```

### Проблема 2: "Password authentication failed"

**Причина:** Неправильный пароль в DATABASE_URL

**Решение:**
1. Проверьте пароль в .env
2. Если забыли пароль, сбросьте его:
   ```bash
   psql -U postgres
   ALTER USER postgres PASSWORD 'new_password';
   ```

### Проблема 3: "Database does not exist"

**Причина:** База данных не создана

**Решение:**
```bash
psql -U postgres
CREATE DATABASE qlink;
\q
```

### Проблема 4: "Port 5432 already in use"

**Причина:** Порт занят другим процессом

**Решение:**
1. Измените порт в PostgreSQL
2. Или остановите другой процесс:
   ```bash
   # Найдите процесс
   netstat -ano | findstr :5432
   
   # Остановите процесс (замените PID)
   taskkill /PID <PID> /F
   ```

## Полезные команды PostgreSQL

```bash
# Подключение к БД
psql -U postgres -d qlink

# Список баз данных
\l

# Список таблиц
\dt

# Описание таблицы
\d table_name

# Выполнить SQL запрос
SELECT * FROM "Business" LIMIT 5;

# Выход
\q
```

## Мониторинг БД

### 1. Размер БД

```sql
SELECT pg_size_pretty(pg_database_size('qlink'));
```

### 2. Количество подключений

```sql
SELECT count(*) FROM pg_stat_activity WHERE datname = 'qlink';
```

### 3. Активные запросы

```sql
SELECT pid, query, state 
FROM pg_stat_activity 
WHERE datname = 'qlink' AND state = 'active';
```

## Бэкап и восстановление

### Создание бэкапа

```bash
# Полный бэкап
pg_dump -U postgres qlink > backup.sql

# Только данные
pg_dump -U postgres --data-only qlink > data_backup.sql

# Только схема
pg_dump -U postgres --schema-only qlink > schema_backup.sql
```

### Восстановление

```bash
# Восстановить из бэкапа
psql -U postgres qlink < backup.sql
```

## Следующие шаги

1. ✅ Установить PostgreSQL
2. ✅ Создать базу данных `qlink`
3. ✅ Настроить DATABASE_URL в .env
4. ✅ Установить Prisma CLI
5. ✅ Сгенерировать Prisma Client
6. ✅ Синхронизировать схему (db push)
7. ✅ Заполнить тестовыми данными (seed)
8. ✅ Обновить бота для работы с БД
9. ✅ Протестировать все функции

## Документация

- [PostgreSQL Windows](https://www.postgresql.org/download/windows/)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

---

**Статус:** ⚠️ Требуется установка PostgreSQL  
**Дата:** 21 ноября 2024  
**Версия:** 1.0
