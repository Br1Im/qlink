@echo off
echo.
echo ========================================
echo   Qlink - Остановка проекта
echo ========================================
echo.

docker-compose -f docker-compose.dev.yml down

if %errorlevel% equ 0 (
    echo.
    echo ✅ Проект остановлен
) else (
    echo.
    echo ❌ Ошибка остановки
)

echo.
pause
