# 🚀 Инструкция по развертыванию на сервере

## Быстрая установка на Ubuntu сервере

Выполните эти команды на вашем сервере (217.114.7.3):

### 1. Обновите репозиторий

```bash
cd ~/qlink
git pull origin main
```

### 2. Создайте .env файл

```bash
nano .env
```

Вставьте следующее содержимое (замените значения на свои):

```env
# Telegram Bot Token (ОБЯЗАТЕЛЬНО!)
BOT_TOKEN=7804503108:AAFuzWxxxMsWhm-041Ea5ULTTkiOFeDOAj0

# JWT Secret
JWT_SECRET=qlink_super_secret_key_2024_production

# Email (опционально)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@qlink.ru

# SMS (опционально)
SMS_API_KEY=
SMS_API_URL=

# Платежи (опционально)
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

Сохраните файл: `Ctrl+X`, затем `Y`, затем `Enter`

### 3. Запустите проект

```bash
docker-compose up -d --build
```

### 4. Проверьте статус

```bash
docker-compose ps
```

Все сервисы должны быть в статусе "Up" и "healthy".

### 5. Посмотрите логи

```bash
# Все логи
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend
```

## 🌐 Доступ к приложению

После успешного запуска:

- **Frontend**: http://217.114.7.3:3001
- **Backend API**: http://217.114.7.3:4000
- **Telegram Bot**: работает автоматически

## 🔧 Полезные команды

### Перезапуск сервисов

```bash
docker-compose restart
```

### Остановка

```bash
docker-compose down
```

### Просмотр логов

```bash
docker-compose logs -f backend
```

### Подключение к БД

```bash
docker-compose exec postgres psql -U postgres -d qlink
```

### Выполнить миграции вручную

```bash
docker-compose exec backend npx prisma migrate deploy
```

### Заполнить БД тестовыми данными

```bash
docker-compose exec backend npm run prisma:seed
```

## 🐛 Решение проблем

### Проблема: Контейнеры не запускаются

```bash
# Посмотрите логи
docker-compose logs

# Пересоберите образы
docker-compose down
docker-compose up -d --build
```

### Проблема: Порты заняты

Измените порты в `docker-compose.yml`:

```yaml
ports:
  - "3002:3000"  # вместо 3001:3000
  - "4001:4000"  # вместо 4000:4000
```

### Проблема: БД не подключается

```bash
# Проверьте статус PostgreSQL
docker-compose ps postgres

# Перезапустите БД
docker-compose restart postgres

# Проверьте логи
docker-compose logs postgres
```

### Очистка и переустановка

```bash
# Остановить и удалить все (включая БД!)
docker-compose down -v

# Пересобрать и запустить
docker-compose up -d --build
```

## 🔒 Настройка Firewall (опционально)

Если нужно ограничить доступ:

```bash
# Разрешить только нужные порты
ufw allow 3001/tcp
ufw allow 4000/tcp
ufw enable
```

## 📊 Мониторинг

```bash
# Использование ресурсов
docker stats

# Проверка здоровья сервисов
docker-compose ps
```

## 🔄 Обновление приложения

```bash
cd ~/qlink
git pull origin main
docker-compose down
docker-compose up -d --build
```

## 📝 Примечания

- Все данные БД сохраняются в Docker volumes и не удаляются при перезапуске
- Логи можно найти через `docker-compose logs`
- Для production рекомендуется настроить nginx с SSL сертификатом
- Регулярно делайте бэкапы БД: `docker-compose exec postgres pg_dump -U postgres qlink > backup.sql`
