# 🌐 Настройка Nginx с SSL для q-link.tech

## Предварительные требования

1. Домен q-link.tech должен указывать на IP сервера (217.114.7.3)
2. Порты 80 и 443 должны быть открыты
3. Docker и Docker Compose установлены

## 📋 Проверка DNS

Убедитесь, что домен настроен правильно:

```bash
# Проверка A-записи
dig q-link.tech +short
# Должно вернуть: 217.114.7.3

# Проверка www
dig www.q-link.tech +short
# Должно вернуть: 217.114.7.3
```

## 🚀 Быстрая установка

### Шаг 1: Подготовка

```bash
cd ~/qlink

# Убедитесь, что порт 80 свободен
sudo lsof -i :80
# Если что-то использует порт 80, остановите это

# Остановите текущие контейнеры
docker-compose down
```

### Шаг 2: Получение SSL сертификата

```bash
# Сделайте скрипт исполняемым
chmod +x scripts/setup-ssl.sh

# Запустите скрипт для получения SSL
./scripts/setup-ssl.sh
```

Скрипт автоматически:
- Создаст временный Nginx
- Запросит SSL сертификат от Let's Encrypt
- Настроит автоматическое обновление

### Шаг 3: Запуск production окружения

```bash
# Запустите production stack с Nginx
docker-compose -f docker-compose.prod.yml up -d

# Проверьте статус
docker-compose -f docker-compose.prod.yml ps

# Посмотрите логи
docker-compose -f docker-compose.prod.yml logs -f
```

## 🌍 Доступ к приложению

После успешного запуска:

- **Frontend**: https://q-link.tech
- **Backend API**: https://q-link.tech/api
- **Health Check**: https://q-link.tech/health

## 🔧 Ручная настройка (если скрипт не работает)

### 1. Создайте директории

```bash
mkdir -p certbot/conf certbot/www nginx
```

### 2. Временный Nginx для Certbot

```bash
# Создайте временную конфигурацию
cat > nginx/temp.conf << 'EOF'
server {
    listen 80;
    server_name q-link.tech www.q-link.tech;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
EOF

# Запустите временный Nginx
docker run -d --name nginx-temp \
  -p 80:80 \
  -v $(pwd)/nginx/temp.conf:/etc/nginx/conf.d/default.conf:ro \
  -v $(pwd)/certbot/www:/var/www/certbot:ro \
  nginx:alpine
```

### 3. Получите сертификат

```bash
# Замените your-email@example.com на ваш email
docker run --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d q-link.tech \
  -d www.q-link.tech

# Остановите временный Nginx
docker stop nginx-temp
docker rm nginx-temp
```

### 4. Запустите production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 Обновление сертификатов

Сертификаты обновляются автоматически каждые 12 часов через контейнер certbot.

Для ручного обновления:

```bash
docker-compose -f docker-compose.prod.yml exec certbot certbot renew
docker-compose -f docker-compose.prod.yml restart nginx
```

## 🐛 Troubleshooting

### Проблема: Certbot не может получить сертификат

**Решение:**

```bash
# 1. Проверьте DNS
dig q-link.tech +short

# 2. Проверьте доступность порта 80
curl http://q-link.tech/.well-known/acme-challenge/test

# 3. Проверьте логи
docker logs nginx-temp
```

### Проблема: Nginx не запускается

**Решение:**

```bash
# Проверьте конфигурацию
docker run --rm \
  -v $(pwd)/nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:alpine nginx -t

# Проверьте, что сертификаты существуют
ls -la certbot/conf/live/q-link.tech/
```

### Проблема: 502 Bad Gateway

**Решение:**

```bash
# Проверьте, что backend и frontend запущены
docker-compose -f docker-compose.prod.yml ps

# Проверьте логи
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs frontend

# Перезапустите сервисы
docker-compose -f docker-compose.prod.yml restart
```

### Проблема: Порт 80 занят

**Решение:**

```bash
# Найдите процесс
sudo lsof -i :80

# Остановите Apache (если установлен)
sudo systemctl stop apache2

# Или остановите другой веб-сервер
sudo systemctl stop nginx
```

## 🔒 Безопасность

### Рекомендации:

1. **Измените пароль БД** в `.env`:
```env
POSTGRES_PASSWORD=your_strong_password_here
```

2. **Настройте firewall**:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

3. **Регулярные бэкапы БД**:
```bash
# Создайте cron job для бэкапов
crontab -e

# Добавьте строку (бэкап каждый день в 3:00)
0 3 * * * cd ~/qlink && docker-compose -f docker-compose.prod.yml exec -T postgres pg_dump -U postgres qlink > backup-$(date +\%Y\%m\%d).sql
```

4. **Мониторинг логов**:
```bash
# Установите logrotate для логов Docker
sudo nano /etc/logrotate.d/docker-containers
```

## 📊 Мониторинг

### Проверка статуса сервисов

```bash
# Все сервисы
docker-compose -f docker-compose.prod.yml ps

# Использование ресурсов
docker stats

# Логи в реальном времени
docker-compose -f docker-compose.prod.yml logs -f --tail=100
```

### Health checks

```bash
# Frontend
curl https://q-link.tech/

# Backend API
curl https://q-link.tech/api/health

# Nginx health
curl https://q-link.tech/health
```

## 🔄 Обновление приложения

```bash
cd ~/qlink

# Получите последние изменения
git pull origin main

# Пересоберите и перезапустите
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Проверьте статус
docker-compose -f docker-compose.prod.yml ps
```

## 📝 Полезные команды

```bash
# Перезапуск всех сервисов
docker-compose -f docker-compose.prod.yml restart

# Перезапуск конкретного сервиса
docker-compose -f docker-compose.prod.yml restart nginx

# Просмотр логов
docker-compose -f docker-compose.prod.yml logs -f nginx
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Остановка
docker-compose -f docker-compose.prod.yml down

# Полная очистка (ВНИМАНИЕ: удалит БД!)
docker-compose -f docker-compose.prod.yml down -v
```

## 🎯 Проверка работы

После запуска проверьте:

1. ✅ HTTPS работает: https://q-link.tech
2. ✅ Редирект с HTTP на HTTPS работает
3. ✅ API доступен: https://q-link.tech/api
4. ✅ SSL сертификат валиден (зеленый замок в браузере)
5. ✅ Telegram бот отвечает

## 📞 Поддержка

Если возникли проблемы:

1. Проверьте логи: `docker-compose -f docker-compose.prod.yml logs`
2. Проверьте статус: `docker-compose -f docker-compose.prod.yml ps`
3. Проверьте DNS: `dig q-link.tech`
4. Проверьте порты: `sudo netstat -tulpn | grep -E ':(80|443)'`
