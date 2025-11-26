#!/bin/bash

echo "🔧 Исправление API URL..."

cd ~/qlink
git pull origin main

echo "🛑 Остановка frontend..."
docker-compose stop frontend

echo "🗑️ Удаление старого образа..."
docker rmi qlink_frontend 2>/dev/null || true

echo "🔨 Пересборка frontend с новым API URL..."
docker-compose up -d --build frontend

echo "⏳ Ожидание запуска (20 сек)..."
sleep 20

echo "📋 Логи frontend:"
docker-compose logs --tail=30 frontend

echo ""
echo "✅ Готово!"
echo "Проверьте сайт: http://217.114.7.3:3001"
echo "Backend должен быть доступен через: http://217.114.7.3:4000"
