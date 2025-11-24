#!/bin/bash

# Скрипт для добавления поля password в таблицу BusinessOwner

echo "🔧 Применение миграции: добавление поля password..."

# Применить миграцию через Docker
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres -d qlink <<EOF
-- Add password field to BusinessOwner table
ALTER TABLE "BusinessOwner" ADD COLUMN IF NOT EXISTS "password" TEXT NOT NULL DEFAULT '';

-- Update existing records with a default hashed password (Test123456)
-- This is bcrypt hash for "Test123456"
UPDATE "BusinessOwner" 
SET "password" = '\$2a\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' 
WHERE "password" = '';
EOF

if [ $? -eq 0 ]; then
    echo "✅ Миграция успешно применена!"
    echo ""
    echo "📋 Все существующие аккаунты теперь имеют пароль: Test123456"
else
    echo "❌ Ошибка применения миграции"
    exit 1
fi
