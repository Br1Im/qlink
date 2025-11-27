# Что делать СЕЙЧАС на сервере

## Проблема
Backend возвращает 502 Bad Gateway при попытке логина.

## Решение (выполнить на сервере)

```bash
# 1. Перейти в директорию проекта
cd ~/qlink

# 2. Получить обновления
git pull origin main

# 3. Запустить скрипт диагностики
chmod +x scripts/fix-backend.sh
./scripts/fix-backend.sh

# 4. Если скрипт предложит перезапуск - согласитесь (нажмите y)
```

## Если скрипт не помог

### Вариант А: Простой перезапуск
```bash
docker-compose restart backend
sleep 20
docker logs qlink-backend --tail 30
```

### Вариант Б: Полная пересборка
```bash
docker-compose stop backend
docker rm qlink-backend
docker-compose build backend --no-cache
docker-compose up -d backend
sleep 30
docker logs qlink-backend --tail 50
```

### Вариант В: Проверить что backend вообще запущен
```bash
docker ps -a | grep backend
```

Если статус `Exited` - смотрите логи:
```bash
docker logs qlink-backend
```

## После исправления

1. Создайте тестового пользователя:
```bash
chmod +x scripts/create-test-user.sh
./scripts/create-test-user.sh
```

2. Проверьте вход на сайте:
   - Откройте: https://q-link.tech/login
   - Email: `test@qlink.tech`
   - Password: `Test123456`

## Проверка здоровья системы

```bash
# Все контейнеры должны быть Up
docker ps

# Backend должен отвечать
docker exec qlink-nginx wget -O- http://backend:3000/api/health

# База данных должна быть доступна
docker exec qlink-postgres psql -U qlink_user -d qlink_db -c "SELECT 1;"
```

## Если ничего не помогает

Напишите мне вывод этих команд:
```bash
docker ps -a
docker logs qlink-backend --tail 100
docker logs qlink-nginx --tail 50
```
