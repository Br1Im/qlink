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
    echo "✅ Схема базы данных применена!"
    
    # Заполнить базу данных тестовыми данными
    echo ""
    echo "🌱 Заполнение базы данных тестовыми данными..."
    docker-compose -f docker-compose.prod.yml run --rm backend sh -c "npm run prisma:seed"
    
    if [ $? -eq 0 ]; then
        echo "✅ База данных заполнена тестовыми данными!"
    else
        echo "⚠️  Ошибка заполнения базы данных (возможно, данные уже существуют)"
    fi
    
    # Запустить backend
    echo ""
    echo "Запуск backend..."
    docker-compose -f docker-compose.prod.yml up -d backend
    
    echo ""
    echo "⏳ Ожидание запуска backend (10 секунд)..."
    sleep 10
    
    echo ""
    echo "📋 Проверка логов backend:"
    docker-compose -f docker-compose.prod.yml logs --tail=20 backend
    
    echo ""
    echo "✅ Готово! Тестовый аккаунт создан:"
    echo "   Email: test@qlink.tech"
    echo "   Пароль: Test123456"
    echo ""
    echo "🌐 Войдите на сайт:"
    echo "   https://q-link.tech/login"
else
    echo "❌ Ошибка инициализации базы данных"
    exit 1
fi
