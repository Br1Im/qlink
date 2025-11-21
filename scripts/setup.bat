@echo off
REM Qlink Project Setup Script for Windows

echo Setting up Qlink Booking System...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 20+ LTS
    exit /b 1
)

echo Node.js is installed
node --version

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. You'll need Docker to run PostgreSQL and Redis
    echo You can install it from: https://www.docker.com/get-started
) else (
    echo Docker is installed
)

echo.
echo Installing dependencies...
call npm install

REM Copy environment files if they don't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

if not exist packages\backend\.env (
    echo Creating backend .env file...
    copy packages\backend\.env.example packages\backend\.env
)

if not exist packages\frontend\.env.local (
    echo Creating frontend .env.local file...
    copy packages\frontend\.env.example packages\frontend\.env.local
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Update .env files with your configuration
echo 2. Start Docker containers: npm run docker:up
echo 3. Start development server: npm run dev
echo.
echo See README.md for more information
