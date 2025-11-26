# 🚀 Быстрый старт на хостинге

## Команды для копирования

### 1. Клонировать репозиторий

```bash
cd /var/www
git clone https://github.com/Br1Im/qlink.git
cd qlink
```

### 2. Создать .env файл

```bash
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:StrongPassword123!@postgres:5432/qlink"
JWT_SECRET="qlink_super_secret_key_change_this_in_production_2024"
API_PORT=4000
PORT=3000
FRONTEND_URL=http://your-domain.com
NEXT_PUBLIC_API_URL=http://your-domain.com:4000
NODE_ENV=production
EOF
```

### 3. Запустить через Docker

```bash
docker-compose down -v
docker-compose up -d
```

### 4. Дождаться запуска (30-60 секунд)

```bash
# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

### 5. Запустить миграции БД

```bash
docker exec -it qlink-backend sh -c "cd packages/backend && npx prisma migrate deploy && npx prisma db seed"
```

### 6. Проверить работу

```bash
# Health check
curl http://localhost:4000/health

# Должен вернуть: {"status":"ok","timestamp":"..."}
```

## 🌐 Доступ к приложению

- **Frontend:** http://your-server-ip:3001
- **Backend API:** http://your-server-ip:4000
- **Health check:** http://your-server-ip:4000/health

## 🔧 Настройка Nginx (для домена)

```bash
# Установить Nginx
sudo apt update
sudo apt install nginx

# Создать конфигурацию
sudo nano /etc/nginx/sites-available/qlink
```

Вставить:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Активировать:

```bash
sudo ln -s /etc/nginx/sites-available/qlink /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Настроить SSL

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔄 Обновление приложения

```bash
cd /var/www/qlink
git pull origin main
docker-compose down
docker-compose up -d --build
docker exec -it qlink-backend sh -c "cd packages/backend && npx prisma migrate deploy"
```

## 📊 Мониторинг

```bash
# Статус контейнеров
docker-compose ps

# Логи всех сервисов
docker-compose logs -f

# Логи только backend
docker-compose logs -f backend

# Использование ресурсов
docker stats
```

## 🐛 Решение проблем

### Контейнеры не запускаются

```bash
docker-compose logs
docker-compose down -v
docker-compose up -d --force-recreate
```

### Порты заняты

```bash
# Проверить порты
netstat -tulpn | grep -E ':(3001|4000|5432)'

# Остановить процессы
sudo lsof -ti:3001 | xargs kill -9
sudo lsof -ti:4000 | xargs kill -9
```

### База данных не подключается

```bash
docker-compose logs postgres
docker-compose restart postgres
```

## ✅ Чеклист

- [ ] Клонирован репозиторий
- [ ] Создан .env файл
- [ ] Запущены контейнеры
- [ ] Выполнены миграции
- [ ] Проверен health check
- [ ] Настроен Nginx (опционально)
- [ ] Настроен SSL (опционально)
- [ ] Приложение доступно

## 🎉 Готово!

Приложение должно работать!

**Тестовый аккаунт (если запустили seed):**
- Email: demo@qlink.ru
- Password: password123

**Или создайте новый аккаунт:**
http://your-domain.com/register
