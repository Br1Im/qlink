@echo off
echo.
echo ========================================
echo   Qlink - Запуск проекта
echo ========================================
echo.

REM Проверка Docker Desktop
echo Проверка Docker Desktop...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Docker Desktop не запущен!
    echo.
    echo Пожалуйста:
    echo 1. Запустите Docker Desktop
    echo 2. Дождитесь полного запуска (иконка станет зеленой)
    echo 3. Запустите этот скрипт снова
    echo.
    pause
    exit /b 1
)

echo ✅ Docker Desktop запущен
echo.

REM Остановить старые контейнеры если есть
echo Остановка старых контейнеров...
docker-compose -f docker-compose.dev.yml down >nul 2>&1

REM Запустить сервисы
echo.
echo 🚀 Запуск сервисов...
echo.
docker-compose -f docker-compose.dev.yml up -d

if %errorlevel% neq 0 (
    echo.
    echo ❌ Ошибка запуска сервисов
    pause
    exit /b 1
)

echo.
echo ⏳ Ожидание запуска сервисов (30 секунд)...
timeout /t 30 /nobreak >nul

REM Инициализация базы данных
echo.
echo 🗄️  Инициализация базы данных...
docker-compose -f docker-compose.dev.yml exec -T backend npm run db:setup

if %errorlevel% neq 0 (
    echo.
    echo ⚠️  База данных уже инициализирована или произошла ошибка
)

echo.
echo ========================================
echo   ✅ Проект запущен!
echo ========================================
echo.
echo 🌐 Откройте в браузере:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:4000
echo.
echo 🔑 Тестовый аккаунт:
echo    Email:    test@qlink.tech
echo    Пароль:   Test123456
echo.
echo 📋 Полезные команды:
echo    Логи:     docker-compose -f docker-compose.dev.yml logs -f
echo    Остановить: docker-compose -f docker-compose.dev.yml down
echo.
echo Нажмите любую клавишу для просмотра логов...
pause >nul

REM Показать логи
docker-compose -f docker-compose.dev.yml logs -f
