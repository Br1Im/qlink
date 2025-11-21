# 🐳 Docker Guide для Qlink

Полное руководство по запуску проекта в Docker.

## 📋 Содержание

- [Быстрый старт](#быстрый-старт)
- [Production режим](#production-режим)
- [Development режим](#development-режим)
- [Полезные команды](#полезные-команды)
- [Troubleshooting](#troubleshooting)

## 🚀 Быстрый старт

### Предварительные требования

- Docker Desktop (Windows/Mac) или Docker Engine (Linux)
- Docker Compose v2.0+

### 1. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Telegram Bot
BOT_TOKEN=your_bot_token_here

# JWT
JWT_SECRET=your_secret_key_here

# Email (опционально)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@qlink.ru

# SMS (опционально)
SMS_API_KEY=your-sms-api-key
SMS_API_URL=https://sms.ru/sms/send

# Платежи (опционально)
YOOKASSA_SHOP_ID=your-shop-id
YOOKASSA_SECRET_KEY=your-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 2. Запуск в Production режиме

```bash
# Собрать и запустить все сервисы
docker-compose up -d

# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

Приложение будет доступно:
- Frontend: http://localhost:3001
- Backend API: http://localhost:4000
- Telegram Bot: работает автоматически
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 3. Остановка

```bash
# Остановить все сервисы
docker-compose down

# Остановить и удалить volumes (БД будет очищена!)
docker-compose down -v
```

## 🏭 Production режим

Production режим использует оптимизированные Docker образы с multi-stage build.

### Особенности:

- ✅ Минимальный размер образов
- ✅ Оптимизированная производительность
- ✅ Автоматические миграции БД при старте
- ✅ Health checks для всех сервисов
- ✅ Автоматический перезапуск при сбоях

### Команды:

```bash
# Запуск
docker-compose up -d

# Пересборка образов
docker-compose build

# Пересборка и запуск
docker-compose up -d --build

# Просмотр логов конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend

# Выполнить команду в контейнере
docker-compose exec backend sh
docker-compose exec postgres psql -U postgres -d qlink
```

## 🔧 Development режим

Development режим с hot reload для удобной разработки.

### Запуск:

```bash
# Запуск dev окружения
docker-compose -f docker-compose.dev.yml up -d

# Просмотр логов
docker-compose -f docker-compose.dev.yml logs -f

# Остановка
docker-compose -f docker-compose.dev.yml down
```

### Особенности:

- ✅ Hot reload для backend и frontend
- ✅ Volumes для синхронизации кода
- ✅ Быстрая разработка без пересборки
- ✅ Отладка в реальном времени

### Работа с БД в dev режиме:

```bash
# Prisma Studio
docker-compose -f docker-compose.dev.yml exec backend npx prisma studio

# Создать миграцию
docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate dev --name migration_name

# Применить seed
docker-compose -f docker-compose.dev.yml exec backend npm run prisma:seed
```

## 📝 Полезные команды

### Управление контейнерами

```bash
# Список запущенных контейнеров
docker-compose ps

# Перезапуск конкретного сервиса
docker-compose restart backend

# Остановка конкретного сервиса
docker-compose stop frontend

# Запуск конкретного сервиса
docker-compose start frontend

# Удалить все остановленные контейнеры
docker-compose rm
```

### Работа с БД

```bash
# Подключиться к PostgreSQL
docker-compose exec postgres psql -U postgres -d qlink

# Создать бэкап БД
docker-compose exec postgres pg_dump -U postgres qlink > backup.sql

# Восстановить из бэкапа
docker-compose exec -T postgres psql -U postgres qlink < backup.sql

# Просмотр логов PostgreSQL
docker-compose logs -f postgres
```

### Очистка

```bash
# Удалить все контейнеры и volumes
docker-compose down -v

# Удалить неиспользуемые образы
docker image prune -a

# Полная очистка Docker
docker system prune -a --volumes
```

### Мониторинг

```bash
# Использование ресурсов
docker stats

# Информация о контейнере
docker-compose exec backend node -v
docker-compose exec backend npm list

# Проверка health status
docker-compose ps
```

## 🐛 Troubleshooting

### Проблема: Контейнер не запускается

```bash
# Проверить логи
docker-compose logs backend

# Проверить статус
docker-compose ps

# Пересобрать образ
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Проблема: БД не подключается

```bash
# Проверить, что PostgreSQL запущен
docker-compose ps postgres

# Проверить логи PostgreSQL
docker-compose logs postgres

# Проверить подключение
docker-compose exec backend sh
# Внутри контейнера:
nc -zv postgres 5432
```

### Проблема: Frontend не видит Backend

Убедитесь, что переменная `NEXT_PUBLIC_API_URL` указывает на правильный адрес:
- В production: `http://localhost:4000`
- В Docker: используйте имя сервиса `http://backend:4000`

### Проблема: Порты заняты

```bash
# Проверить, какой процесс использует порт
# Windows:
netstat -ano | findstr :3000

# Linux/Mac:
lsof -i :3000

# Изменить порты в docker-compose.yml
# Например: "3002:3000" вместо "3001:3000"
```

### Проблема: Нет места на диске

```bash
# Очистить неиспользуемые данные
docker system prune -a --volumes

# Удалить старые образы
docker image prune -a
```

## 🔐 Безопасность

### Production checklist:

- [ ] Изменить пароли БД в docker-compose.yml
- [ ] Использовать secrets для чувствительных данных
- [ ] Настроить firewall для портов
- [ ] Использовать HTTPS (nginx/traefik)
- [ ] Регулярно обновлять образы
- [ ] Настроить backup БД

### Пример использования Docker secrets:

```yaml
services:
  backend:
    secrets:
      - bot_token
      - jwt_secret
    environment:
      BOT_TOKEN_FILE: /run/secrets/bot_token
      JWT_SECRET_FILE: /run/secrets/jwt_secret

secrets:
  bot_token:
    file: ./secrets/bot_token.txt
  jwt_secret:
    file: ./secrets/jwt_secret.txt
```

## 📊 Мониторинг и логи

### Централизованные логи:

```bash
# Все логи
docker-compose logs -f

# Последние 100 строк
docker-compose logs --tail=100

# Логи с временными метками
docker-compose logs -f -t

# Сохранить логи в файл
docker-compose logs > logs.txt
```

### Health checks:

Все сервисы имеют health checks. Проверить статус:

```bash
docker-compose ps
```

Статусы:
- `healthy` - сервис работает нормально
- `unhealthy` - сервис не отвечает
- `starting` - сервис запускается

## 🚀 Деплой на сервер

### 1. Подготовка сервера

```bash
# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установить Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Деплой

```bash
# Клонировать репозиторий
git clone <your-repo>
cd qlink-booking-system

# Настроить .env
nano .env

# Запустить
docker-compose up -d

# Проверить
docker-compose ps
docker-compose logs -f
```

### 3. Настройка автозапуска

Docker Compose автоматически перезапустит контейнеры при перезагрузке сервера благодаря `restart: unless-stopped`.

## 📚 Дополнительные ресурсы

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
