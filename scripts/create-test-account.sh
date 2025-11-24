#!/bin/bash

# Скрипт для создания тестового аккаунта
# Использование: ./scripts/create-test-account.sh [API_URL]

API_URL="${1:-https://q-link.tech/api}"

echo "🔧 Создание тестового аккаунта..."
echo "API URL: $API_URL"
echo ""

# Данные тестового аккаунта
EMAIL="test@qlink.tech"
PHONE="+79991234567"
PASSWORD="Test123456"
FIRST_NAME="Тест"
LAST_NAME="Тестов"
COMPANY="Тестовая Компания"

# Регистрация
echo "📝 Регистрация пользователя..."
RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"phone\": \"$PHONE\",
    \"password\": \"$PASSWORD\",
    \"firstName\": \"$FIRST_NAME\",
    \"lastName\": \"$LAST_NAME\",
    \"company\": \"$COMPANY\"
  }")

# Проверка результата
if echo "$RESPONSE" | grep -q "token"; then
  echo "✅ Аккаунт успешно создан!"
  echo ""
  echo "📋 Данные для входа:"
  echo "   Email: $EMAIL"
  echo "   Пароль: $PASSWORD"
  echo ""
  
  # Извлечение токена
  TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  
  if [ ! -z "$TOKEN" ]; then
    echo "🔑 Токен авторизации:"
    echo "   $TOKEN"
    echo ""
    
    # Сохранение токена в файл
    echo "$TOKEN" > .test-token
    echo "💾 Токен сохранен в файл .test-token"
  fi
  
  echo ""
  echo "🌐 Войдите на сайт:"
  echo "   URL: https://q-link.tech/login"
  echo "   Email: $EMAIL"
  echo "   Пароль: $PASSWORD"
  
elif echo "$RESPONSE" | grep -q "уже существует"; then
  echo "⚠️  Аккаунт уже существует"
  echo ""
  echo "📋 Данные для входа:"
  echo "   Email: $EMAIL"
  echo "   Пароль: $PASSWORD"
  echo ""
  echo "🌐 Войдите на сайт:"
  echo "   URL: https://q-link.tech/login"
  
else
  echo "❌ Ошибка создания аккаунта"
  echo ""
  echo "Ответ сервера:"
  echo "$RESPONSE"
  exit 1
fi
