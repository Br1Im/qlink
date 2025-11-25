# 🚀 Быстрый старт

## Локальная разработка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных

Создайте файл `packages/backend/.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/qlink"
BOT_TOKEN="your_telegram_bot_token"
JWT_SECRET="your_secret_key"
PORT=3000
API_PORT=4000
```

### 3. Запуск PostgreSQL

```bash
# Через Docker
docker run -d \
  --name qlink-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=qlink \
  -p 5432:5432 \
  postgres:15-alpine
```

### 4. Инициализация базы данных

```bash
# Применить схему и заполнить тестовыми данными
npm run db:setup
```

Или используйте скрипт:

**Windows:**
```cmd
scripts\seed-local.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/seed-local.sh
./scripts/seed-local.sh
```

### 5. Запуск приложения

```bash
npm run dev
```

Откройте:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## 🔑 Тестовые аккаунты

После выполнения `npm run db:setup` или seed скрипта будут созданы:

### 1. Тестовый аккаунт
- **Email:** test@qlink.tech
- **Пароль:** Test123456

### 2. Владелец бизнеса
- **Email:** owner@example.com
- **Пароль:** Owner123456
- **Бизнес:** Салон "Красота" (уже создан с услугами и сотрудниками)

## 📝 Вход в систему

1. Откройте http://localhost:3000/login
2. Введите email и пароль тестового аккаунта
3. Нажмите "Войти"

## 🛠️ Полезные команды

```bash
# Заполнить базу данных тестовыми данными
npm run seed

# Открыть Prisma Studio (GUI для базы данных)
npm run prisma:studio --workspace=@qlink/backend

# Создать миграцию
npm run prisma:migrate --workspace=@qlink/backend

# Запустить только backend
npm run dev:backend

# Запустить только frontend
npm run dev:frontend

# Создать тестовый аккаунт через API
npm run test:account
```

## 🐳 Docker разработка

```bash
# Запустить все сервисы
npm run docker:dev

# Посмотреть логи
npm run docker:dev:logs

# Остановить
npm run docker:dev:down
```

## 🌐 Production деплой

См. [PRODUCTION_DEPLOY.md](./PRODUCTION_DEPLOY.md)

## 📚 Дополнительная документация

- [Архитектура](./ARCHITECTURE.md)
- [Функции](./FEATURES.md)
- [Docker Guide](./DOCKER_GUIDE.md)
- [Настройка базы данных](./DATABASE_SETUP_GUIDE.md)
- [Демо аккаунты](./DEMO_ACCOUNTS_GUIDE.md)

## ❓ Проблемы

### База данных не подключается

Убедитесь что PostgreSQL запущен:
```bash
docker ps | grep postgres
```

### Ошибка "Table does not exist"

Примените схему:
```bash
cd packages/backend
npx prisma db push
```

### Нет тестовых данных

Запустите seed:
```bash
npm run seed
```
