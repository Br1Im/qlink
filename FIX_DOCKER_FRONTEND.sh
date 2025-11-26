#!/bin/bash

echo "🔧 Исправление Docker Frontend..."

# Остановить контейнеры
echo "⏹️  Остановка контейнеров..."
docker-compose stop frontend

# Удалить контейнер и образ
echo "🗑️  Удаление старых контейнеров и образов..."
docker rm qlink-frontend 2>/dev/null || true
docker rmi qlink_frontend 2>/dev/null || true

# Пересобрать и запустить
echo "🔨 Пересборка frontend..."
docker-compose up -d --build frontend

# Подождать немного
sleep 5

# Показать логи
echo "📋 Логи frontend:"
docker-compose logs --tail=50 frontend

echo ""
echo "✅ Готово! Проверьте логи выше"
echo "Если всё ещё есть ошибки, выполните:"
echo "  docker exec -it qlink-frontend ls -la"
echo "  docker exec -it qlink-frontend cat postcss.config.js"
