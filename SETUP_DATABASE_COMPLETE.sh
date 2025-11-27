#!/bin/bash

echo "🗄️  ПОЛНАЯ НАСТРОЙКА БАЗЫ ДАННЫХ"
echo "================================="
echo ""

# Проверка переменных окружения
echo "1️⃣  Проверка переменных окружения..."
docker exec qlink-backend env | grep DATABASE_URL

echo ""
echo "─────────────────────────────────────────"
echo ""

# Генерация Prisma Client
echo "2️⃣  Генерация Prisma Client..."
docker exec qlink-backend npx prisma generate

echo ""
echo "─────────────────────────────────────────"
echo ""

# Создание миграции (если нет)
echo "3️⃣  Создание начальной миграции..."
docker exec qlink-backend npx prisma migrate dev --name init --skip-generate || echo "Миграция уже существует или ошибка"

echo ""
echo "─────────────────────────────────────────"
echo ""

# Применение миграций
echo "4️⃣  Применение миграций..."
docker exec qlink-backend npx prisma migrate deploy

echo ""
echo "─────────────────────────────────────────"
echo ""

# Push схемы напрямую (если миграции не работают)
echo "5️⃣  Push схемы в базу данных..."
docker exec qlink-backend npx prisma db push --accept-data-loss

echo ""
echo "─────────────────────────────────────────"
echo ""

# Проверка таблиц
echo "6️⃣  Проверка созданных таблиц..."
docker exec qlink-backend npx prisma db execute --stdin <<EOF
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
EOF

echo ""
echo "─────────────────────────────────────────"
echo ""

# Создание тестового пользователя
echo "7️⃣  Создание тестового пользователя..."
docker exec qlink-backend node /app/packages/backend/scripts/create-test-user.js

echo ""
echo "═════════════════════════════════════════"
echo ""
echo "✅ ГОТОВО!"
echo ""
echo "Войдите на сайт:"
echo "🌐 https://q-link.tech/login"
echo "📧 Email: test@qlink.tech"
echo "🔑 Password: Test123456"
