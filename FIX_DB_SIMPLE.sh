#!/bin/bash

echo "🔧 ПРОСТОЕ ИСПРАВЛЕНИЕ БД"
echo "========================="
echo ""

# Используем db push вместо миграций
echo "📤 Применение схемы Prisma к базе данных..."
docker exec qlink-backend npx prisma db push --accept-data-loss --skip-generate

echo ""
echo "─────────────────────────────────────────"
echo ""

# Проверка что таблицы созданы
echo "✅ Проверка таблиц..."
docker exec qlink-backend npx prisma db execute --stdin <<'EOF'
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
EOF

echo ""
echo "─────────────────────────────────────────"
echo ""

# Создание тестового пользователя
echo "👤 Создание тестового пользователя..."
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
