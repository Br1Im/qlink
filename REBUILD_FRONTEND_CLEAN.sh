#!/bin/bash

echo "🧹 ПОЛНАЯ ОЧИСТКА И ПЕРЕСБОРКА FRONTEND"
echo "========================================"
echo ""

# Остановить frontend
echo "1️⃣  Остановка frontend..."
docker-compose stop frontend

# Удалить все контейнеры frontend
echo "2️⃣  Удаление контейнеров..."
docker ps -a | grep frontend | awk '{print $1}' | xargs -r docker rm -f

# Удалить образ
echo "3️⃣  Удаление образа..."
docker rmi -f qlink_frontend

# Удалить volumes (кэш Next.js)
echo "4️⃣  Очистка volumes..."
docker volume ls | grep frontend | awk '{print $2}' | xargs -r docker volume rm

# Пересобрать с нуля
echo "5️⃣  Пересборка образа (без кэша)..."
docker-compose build --no-cache frontend

# Запустить
echo "6️⃣  Запуск frontend..."
docker-compose up -d frontend

echo ""
echo "⏳ Ожидание запуска (30 секунд)..."
sleep 30

echo ""
echo "─────────────────────────────────────────"
echo ""

# Проверка
echo "7️⃣  Проверка статуса..."
docker ps | grep frontend

echo ""
echo "─────────────────────────────────────────"
echo ""

# Логи
echo "8️⃣  Логи frontend:"
docker logs qlink-frontend --tail 30

echo ""
echo "═════════════════════════════════════════"
echo ""
echo "✅ ГОТОВО!"
echo ""
echo "Откройте сайт и проверьте кнопки:"
echo "🌐 https://q-link.tech"
echo ""
echo "Если кнопки всё ещё не работают:"
echo "1. Очистите кэш браузера (Ctrl+Shift+Delete)"
echo "2. Откройте в режиме инкогнито"
echo "3. Проверьте консоль браузера (F12) на ошибки"
