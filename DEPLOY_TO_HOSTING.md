# 🚀 Деплой на хостинг

## Быстрый старт

### 1. Клонировать репозиторий на хостинге

```bash
cd /var/www  # или ваша директория
git clone <your-repo-url> qlink
cd qlink
```

### 2. Создать .env файл

```bash
cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:password@postgres:5432/qlink"

# JWT
JWT_SECRET="your-super-secret-key-change-this-in-production"

# Ports
API_PORT=4000
PORT=3000

# URLs
FRONTEND_URL=http://your-domain.com
NEXT_PUBLIC_API_URL=http://your-domain.com:4000

# Optional (можно оставить пустыми)
BOT_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMS_API_KEY=
SMS_API_URL=
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
EOF
```

### 3. Запустить через Docker Compose

```bash
# Остановить старые контейнеры
docker-compose down -v

# Запустить всё
docker-compose up -d

# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

### 4. Запустить миграции БД

```bash
# Войти в контейнер backend
docker exec -it qlink-backend sh

# Запустить миграции
cd packages/backend
npx prisma migrate deploy

# Заполнить тестовыми данными (опционально)
npx prisma db seed

# Выйти
exit
```

### 5. Проверить работу

Откройте в браузере:
- Frontend: http://your-domain.com:3001
- Backend API: http://your-domain.com:4000
- Health check: http://your-domain.com:4000/health

## 🔧 Настройка Nginx (рекомендуется)

### 1. Создать конфигурацию Nginx

```bash
sudo nano /etc/nginx/sites-available/qlink
```

Вставить:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:4000/health;
    }
}
```

### 2. Активировать конфигурацию

```bash
sudo ln -s /etc/nginx/sites-available/qlink /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Настроить SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Мониторинг

### Проверить статус контейнеров

```bash
docker-compose ps
```

### Посмотреть логи

```bash
# Все логи
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend

# Только postgres
docker-compose logs -f postgres
```

### Проверить использование ресурсов

```bash
docker stats
```

## 🔄 Обновление приложения

```bash
# 1. Перейти в директорию
cd /var/www/qlink

# 2. Получить последние изменения
git pull origin main

# 3. Пересобрать и перезапустить
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 4. Запустить миграции (если есть новые)
docker exec -it qlink-backend sh
cd packages/backend
npx prisma migrate deploy
exit
```

## 🐛 Решение проблем

### Контейнеры не запускаются

```bash
# Проверить логи
docker-compose logs

# Пересоздать контейнеры
docker-compose down -v
docker-compose up -d --force-recreate
```

### База данных не подключается

```bash
# Проверить что postgres запущен
docker-compose ps postgres

# Проверить логи postgres
docker-compose logs postgres

# Перезапустить postgres
docker-compose restart postgres
```

### Frontend показывает "Backend API недоступен"

```bash
# Проверить что backend запущен
docker-compose ps backend

# Проверить логи backend
docker-compose logs backend

# Проверить переменные окружения
docker exec qlink-backend env | grep API_URL
```

### Порты заняты

```bash
# Проверить какие порты заняты
netstat -tulpn | grep -E ':(3000|3001|4000|5432|6379)'

# Остановить процессы на портах
sudo lsof -ti:3001 | xargs kill -9
sudo lsof -ti:4000 | xargs kill -9
```

## 🔒 Безопасность

### 1. Изменить пароли БД

В `.env` файле измените:
```
DATABASE_URL="postgresql://postgres:NEW_STRONG_PASSWORD@postgres:5432/qlink"
```

В `docker-compose.yml` измените:
```yaml
postgres:
  environment:
    POSTGRES_PASSWORD: NEW_STRONG_PASSWORD
```

### 2. Изменить JWT_SECRET

```bash
# Сгенерировать случайный ключ
openssl rand -base64 32

# Вставить в .env
JWT_SECRET="generated-key-here"
```

### 3. Настроить firewall

```bash
# Разрешить только необходимые порты
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 4. Регулярные бэкапы БД

```bash
# Создать скрипт бэкапа
cat > /root/backup-qlink.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec qlink-postgres pg_dump -U postgres qlink > /backups/qlink_$DATE.sql
# Удалить бэкапы старше 7 дней
find /backups -name "qlink_*.sql" -mtime +7 -delete
EOF

chmod +x /root/backup-qlink.sh

# Добавить в cron (каждый день в 3:00)
echo "0 3 * * * /root/backup-qlink.sh" | sudo crontab -
```

## 📈 Оптимизация производительности

### 1. Увеличить лимиты для PostgreSQL

В `docker-compose.yml`:
```yaml
postgres:
  command: postgres -c max_connections=200 -c shared_buffers=256MB
```

### 2. Настроить Redis для кэширования

Redis уже включен в docker-compose.yml и готов к использованию.

### 3. Включить gzip в Nginx

В конфигурации Nginx добавить:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## ✅ Чеклист деплоя

- [ ] Клонирован репозиторий
- [ ] Создан .env файл с правильными настройками
- [ ] Изменены пароли БД
- [ ] Изменен JWT_SECRET
- [ ] Запущены контейнеры через docker-compose
- [ ] Выполнены миграции БД
- [ ] Настроен Nginx
- [ ] Настроен SSL сертификат
- [ ] Настроен firewall
- [ ] Настроены бэкапы БД
- [ ] Проверена работа приложения
- [ ] Проверены логи на ошибки

## 🎉 Готово!

Приложение должно быть доступно по адресу: https://your-domain.com
