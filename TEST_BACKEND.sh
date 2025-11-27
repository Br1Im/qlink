#!/bin/bash

echo "🧪 ТЕСТИРОВАНИЕ BACKEND"
echo "======================="
echo ""

# Проверка из nginx (правильный порт)
echo "1️⃣  Проверка API через nginx контейнер (backend:4000):"
if docker exec qlink-nginx wget -q -O- http://backend:4000/api/health 2>&1 | grep -q "ok"; then
    echo "✅ Backend API работает!"
    docker exec qlink-nginx wget -q -O- http://backend:4000/api/health
else
    echo "❌ Backend API не отвечает"
    echo "Вывод:"
    docker exec qlink-nginx wget -O- http://backend:4000/api/health 2>&1
fi

echo ""
echo "─────────────────────────────────────────"
echo ""

# Проверка с хоста
echo "2️⃣  Проверка API с хоста (localhost:4000):"
if curl -s http://localhost:4000/api/health | grep -q "ok"; then
    echo "✅ API доступен с хоста!"
    curl -s http://localhost:4000/api/health
else
    echo "❌ API недоступен с хоста"
fi

echo ""
echo "─────────────────────────────────────────"
echo ""

# Проверка через nginx (публичный доступ)
echo "3️⃣  Проверка через nginx (https://q-link.tech/api/health):"
if curl -k -s https://q-link.tech/api/health | grep -q "ok"; then
    echo "✅ API доступен через nginx!"
    curl -k -s https://q-link.tech/api/health
else
    echo "❌ API недоступен через nginx"
    echo "Вывод:"
    curl -k -s https://q-link.tech/api/health
fi

echo ""
echo "─────────────────────────────────────────"
echo ""

# Тест логина
echo "4️⃣  Тест endpoint логина:"
curl -k -s -X POST https://q-link.tech/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@qlink.tech","password":"Test123456"}' | head -c 200

echo ""
echo ""
echo "─────────────────────────────────────────"
echo ""

# Статус контейнеров
echo "5️⃣  Статус всех контейнеров:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "─────────────────────────────────────────"
echo ""

# Последние логи
echo "6️⃣  Последние 20 строк логов backend:"
docker logs qlink-backend --tail 20
