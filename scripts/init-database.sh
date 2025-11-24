#!/bin/bash

# Скрипт для инициализации базы данных

echo "🔧 Инициализация базы данных..."

# Остановить backend
echo "Остановка backend..."
docker-compose -f docker-compose.prod.yml stop backend

# Применить схему Prisma к базе данных
echo "Применение схемы Prisma..."
docker-compose -f docker-compose.prod.yml run --rm backend sh -c "npx prisma db push --accept-data-loss"

if [ $? -eq 0 ]; then
    echo "✅ База данных успешно инициализирована!"
    
    # Запустить backend
    echo "Запуск backend..."
    docker-compose -f docker-compose.prod.yml up -d backend
    
    echo ""
    echo "⏳ Ожидание запуска backend (10 секунд)..."
    sleep 10
    
    echo ""
    echo "📋 Проверка логов backend:"
    docker-compose -f docker-compose.prod.yml logs --tail=20 backend
    
    echo ""
    echo "✅ Готово! Теперь можно создать тестовый аккаунт:"
    echo "   ./scripts/create-test-account.sh"
else
    echo "❌ Ошибка инициализации базы данных"
    exit 1
fi
