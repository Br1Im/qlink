@echo off
REM Скрипт для заполнения локальной базы данных

echo.
echo 🌱 Заполнение локальной базы данных...
echo.

cd packages\backend

REM Запустить seed скрипт
call npm run prisma:seed

if %errorlevel%==0 (
    echo.
    echo ✅ База данных успешно заполнена!
    echo.
    echo 📋 Тестовые аккаунты:
    echo.
    echo 1. Тестовый аккаунт:
    echo    Email: test@qlink.tech
    echo    Пароль: Test123456
    echo.
    echo 2. Владелец бизнеса:
    echo    Email: owner@example.com
    echo    Пароль: Owner123456
    echo.
    echo 🌐 Запустите приложение:
    echo    npm run dev
    echo.
    echo Затем откройте:
    echo    http://localhost:3000/login
) else (
    echo ❌ Ошибка заполнения базы данных
    exit /b 1
)

echo.
pause
