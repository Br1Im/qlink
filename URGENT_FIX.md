# СРОЧНОЕ ИСПРАВЛЕНИЕ - Backend упал

## Проблема
Backend контейнер остановлен: `Exited (137) 5 minutes ago`

## Решение (выполнить на сервере СЕЙЧАС)

```bash
# 1. Удалить старый контейнер
docker rm 455fa10038f5_qlink-backend

# 2. Запустить backend заново
docker-compose up -d backend

# 3. Подождать 20 секунд
sleep 20

# 4. Проверить статус
docker ps | grep backend

# 5. Посмотреть логи
docker logs qlink-backend --tail 50
```

## Если не помогло - полная пересборка

```bash
# Остановить и удалить
docker-compose stop backend
docker rm -f $(docker ps -aq --filter name=backend)

# Пересобрать
docker-compose build backend --no-cache

# Запустить
docker-compose up -d backend

# Подождать
sleep 30

# Проверить
docker logs qlink-backend -f
```

## Проверка после запуска

```bash
# Backend должен быть Up
docker ps | grep backend

# API должен отвечать
curl http://localhost:3000/api/health

# Или изнутри nginx
docker exec qlink-nginx wget -O- http://backend:3000/api/health
```

## Создание тестового пользователя

После того как backend запустится:

```bash
docker exec qlink-backend node /app/packages/backend/scripts/create-test-user.js
```

Или используйте скрипт:
```bash
chmod +x scripts/create-test-user.sh
./scripts/create-test-user.sh
```

## Данные для входа

- Email: `test@qlink.tech`
- Password: `Test123456`
- Сайт: https://q-link.tech/login
