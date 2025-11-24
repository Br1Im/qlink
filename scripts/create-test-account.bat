@echo off
REM Скрипт для создания тестового аккаунта
REM Использование: scripts\create-test-account.bat [API_URL]

setlocal enabledelayedexpansion

if "%1"=="" (
    set API_URL=https://q-link.tech/api
) else (
    set API_URL=%1
)

echo.
echo 🔧 Создание тестового аккаунта...
echo API URL: %API_URL%
echo.

REM Данные тестового аккаунта
set EMAIL=test@qlink.tech
set PHONE=+79991234567
set PASSWORD=Test123456
set FIRST_NAME=Тест
set LAST_NAME=Тестов
set COMPANY=Тестовая Компания

echo 📝 Регистрация пользователя...

REM Создание JSON файла
echo { > temp_register.json
echo   "email": "%EMAIL%", >> temp_register.json
echo   "phone": "%PHONE%", >> temp_register.json
echo   "password": "%PASSWORD%", >> temp_register.json
echo   "firstName": "%FIRST_NAME%", >> temp_register.json
echo   "lastName": "%LAST_NAME%", >> temp_register.json
echo   "company": "%COMPANY%" >> temp_register.json
echo } >> temp_register.json

REM Отправка запроса
curl -s -X POST "%API_URL%/auth/register" ^
  -H "Content-Type: application/json" ^
  -d @temp_register.json > temp_response.json

REM Проверка результата
findstr /C:"token" temp_response.json >nul
if %errorlevel%==0 (
    echo ✅ Аккаунт успешно создан!
    echo.
    echo 📋 Данные для входа:
    echo    Email: %EMAIL%
    echo    Пароль: %PASSWORD%
    echo.
    echo 🌐 Войдите на сайт:
    echo    URL: https://q-link.tech/login
    echo    Email: %EMAIL%
    echo    Пароль: %PASSWORD%
) else (
    findstr /C:"уже существует" temp_response.json >nul
    if %errorlevel%==0 (
        echo ⚠️  Аккаунт уже существует
        echo.
        echo 📋 Данные для входа:
        echo    Email: %EMAIL%
        echo    Пароль: %PASSWORD%
        echo.
        echo 🌐 Войдите на сайт:
        echo    URL: https://q-link.tech/login
    ) else (
        echo ❌ Ошибка создания аккаунта
        echo.
        echo Ответ сервера:
        type temp_response.json
    )
)

REM Очистка временных файлов
del temp_register.json
del temp_response.json

echo.
pause
