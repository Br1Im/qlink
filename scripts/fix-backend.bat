@echo off
echo 🔧 Диагностика и исправление Backend
echo =====================================

REM Проверка статуса контейнеров
echo.
echo 📦 Статус контейнеров:
docker ps -a | findstr qlink

REM Проверка логов backend
echo.
echo 📋 Последние логи backend:
docker logs qlink-backend --tail 30

REM Проверка доступности API
echo.
echo 🔍 Проверка доступности API изнутри nginx:
docker exec qlink-nginx wget -q -O- http://backend:3000/api/health 2>nul || echo ❌ Backend недоступен

REM Предложение перезапуска
echo.
set /p restart="Перезапустить backend? (y/n): "
if /i "%restart%"=="y" (
    echo 🔄 Перезапуск backend...
    docker-compose restart backend
    
    echo ⏳ Ожидание запуска (20 секунд)...
    timeout /t 20 /nobreak >nul
    
    echo 📋 Логи после перезапуска:
    docker logs qlink-backend --tail 20
    
    echo.
    echo ✅ Готово! Проверьте сайт: https://q-link.tech
)

pause
