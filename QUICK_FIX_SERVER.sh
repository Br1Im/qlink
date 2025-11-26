#!/bin/bash

echo "🚀 Быстрое исправление Frontend на сервере"
echo "=========================================="

cd ~/qlink

echo ""
echo "📥 1. Получение изменений..."
git pull origin main

echo ""
echo "🛑 2. Остановка контейнеров..."
docker-compose down

echo ""
echo "🗑️  3. Удаление старых образов..."
docker rmi qlink_frontend 2>/dev/null || echo "Образ уже удален"

echo ""
echo "🧹 4. Очистка Docker кеша..."
docker system prune -f

echo ""
echo "🔨 5. Пересборка и запуск..."
docker-compose up -d --build

echo ""
echo "⏳ 6. Ожидание запуска (30 сек)..."
sleep 30

echo ""
echo "📊 7. Статус контейнеров:"
docker-compose ps

echo ""
echo "📋 8. Логи Frontend (последние 30 строк):"
docker-compose logs --tail=30 frontend

echo ""
echo "=========================================="
echo "✅ Готово!"
echo ""
echo "Проверьте сайт: http://217.114.7.3:3001"
echo ""
echo "Для просмотра логов в реальном времени:"
echo "  docker-compose logs -f frontend"
