@echo off
REM Script to fix frontend Tailwind CSS issues

echo Stopping frontend container...
docker-compose -f docker-compose.prod.yml stop frontend

echo Removing frontend container...
docker-compose -f docker-compose.prod.yml rm -f frontend

echo Rebuilding frontend image...
docker-compose -f docker-compose.prod.yml build --no-cache frontend

echo Starting frontend container...
docker-compose -f docker-compose.prod.yml up -d frontend

echo Waiting for container to start...
timeout /t 5 /nobreak

echo Checking frontend logs...
docker-compose -f docker-compose.prod.yml logs --tail=50 frontend

echo.
echo Frontend container has been rebuilt and restarted.
echo To follow logs, run: docker-compose -f docker-compose.prod.yml logs -f frontend
