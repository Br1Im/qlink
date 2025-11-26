@echo off
echo 🚀 Запуск Qlink через Docker...
echo.

REM Остановка и удаление старых контейнеров
echo 🧹 Очистка старых контейнеров...
docker-compose down -v

REM Запуск PostgreSQL
echo 🐘 Запуск PostgreSQL...
docker-compose up -d postgres

REM Ждем пока PostgreSQL запустится
echo ⏳ Ожидание запуска PostgreSQL...
timeout /t 10 /nobreak > nul

REM Запуск Redis
echo 🔴 Запуск Redis...
docker-compose up -d redis

REM Ждем пока Redis запустится
echo ⏳ Ожидание запуска Redis...
timeout /t 5 /nobreak > nul

REM Запуск Backend
echo ⚙️  Запуск Backend...
docker-compose up -d backend

REM Ждем пока Backend запустится
echo ⏳ Ожидание запуска Backend...
timeout /t 15 /nobreak > nul

REM Запуск Frontend
echo 🎨 Запуск Frontend...
docker-compose up -d frontend

echo.
echo ✅ Все сервисы запущены!
echo.
echo 📍 Доступные URL:
echo    Frontend: http://localhost:3001
echo    Backend API: http://localhost:4000
echo    Backend Bot: http://localhost:3000
echo    PostgreSQL: localhost:5432
echo    Redis: localhost:6379
echo.
echo 📊 Проверить статус:
echo    docker-compose ps
echo.
echo 📝 Посмотреть логи:
echo    docker-compose logs -f
echo.
pause
