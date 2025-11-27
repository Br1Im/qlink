#!/bin/bash

echo "🚨 ВОССТАНОВЛЕНИЕ BACKEND"
echo "========================="
echo ""

# Удалить все старые контейнеры backend
echo "🗑️  Удаление старых контейнеров backend..."
docker rm -f $(docker ps -aq --filter name=backend) 2>/dev/null || echo "Нет контейнеров для удаления"

# Получить последние изменения
echo ""
echo "📥 Получение обновлений..."
git pull origin main

# Пересобрать backend
echo ""
echo "🔨 Пересборка backend..."
docker-compose build backend --no-cache

# Запустить backend
echo ""
echo "🚀 Запуск backend..."
docker-compose up -d backend

# Ожидание запуска
echo ""
echo "⏳ Ожидание запуска (30 секунд)..."
sleep 30

# Проверка статуса
echo ""
echo "📊 Статус контейнеров:"
docker ps | grep -E "CONTAINER|backend"

# Проверка логов
echo ""
echo "📋 Последние логи backend:"
docker logs qlink-backend --tail 30

# Проверка API
echo ""
echo "🔍 Проверка API:"
if docker exec qlink-nginx wget -q -O- http://backend:3000/api/health 2>&1 | grep -q "ok"; then
    echo "✅ Backend работает!"
else
    echo "❌ Backend не отвечает. Смотрите логи выше."
    exit 1
fi

# Создание тестового пользователя
echo ""
read -p "Создать тестового пользователя? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "👤 Создание тестового пользователя..."
    docker exec qlink-backend node /app/packages/backend/scripts/create-test-user.js
fi

echo ""
echo "✅ ГОТОВО!"
echo ""
echo "Проверьте сайт: https://q-link.tech/login"
echo "Email: test@qlink.tech"
echo "Password: Test123456"
