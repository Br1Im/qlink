@echo off
echo 🚀 Создание тестового пользователя для Qlink
echo =============================================

REM Проверить что мы в правильной директории
if not exist "docker-compose.yml" (
    echo ❌ Ошибка: Запустите скрипт из корневой директории проекта
    pause
    exit /b 1
)

REM Запустить скрипт внутри backend контейнера
echo 📦 Запуск скрипта в backend контейнере...
docker exec qlink-backend node /app/packages/backend/scripts/create-test-user.js

echo.
echo ✅ Готово!
echo.
echo Теперь вы можете войти в систему:
echo 🌐 Сайт: https://q-link.tech/login
echo 📧 Email: test@qlink.tech
echo 🔑 Password: Test123456
echo.
pause
