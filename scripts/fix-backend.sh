#!/bin/bash

echo "🔧 Диагностика и исправление Backend"
echo "====================================="

# Проверка статуса контейнеров
echo ""
echo "📦 Статус контейнеров:"
docker ps -a | grep qlink

# Проверка логов backend
echo ""
echo "📋 Последние логи backend:"
docker logs qlink-backend --tail 30

# Проверка доступности API
echo ""
echo "🔍 Проверка доступности API изнутри nginx:"
docker exec qlink-nginx wget -q -O- http://backend:3000/api/health 2>&1 || echo "❌ Backend недоступен"

# Предложение перезапуска
echo ""
read -p "Перезапустить backend? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🔄 Перезапуск backend..."
    docker-compose restart backend
    
    echo "⏳ Ожидание запуска (20 секунд)..."
    sleep 20
    
    echo "📋 Логи после перезапуска:"
    docker logs qlink-backend --tail 20
    
    echo ""
    echo "✅ Готово! Проверьте сайт: https://q-link.tech"
fi
