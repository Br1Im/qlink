# Команды для исправления на сервере

## Подключитесь к серверу
```bash
ssh root@217.114.7.3
```

## Выполните эти команды по порядку:

```bash
# 1. Перейти в директорию проекта
cd ~/qlink

# 2. Получить последние изменения (когда push пройдет)
git pull origin main

# 3. Остановить все контейнеры
docker-compose down

# 4. Удалить старый образ frontend
docker rmi qlink_frontend

# 5. Очистить Docker кеш (опционально, если проблемы остаются)
docker system prune -f

# 6. Пересобрать и запустить всё заново
docker-compose up -d --build

# 7. Подождать 10 секунд
sleep 10

# 8. Проверить статус контейнеров
docker-compose ps

# 9. Проверить логи frontend
docker-compose logs frontend | tail -50

# 10. Если нужно смотреть логи в реальном времени
docker-compose logs -f frontend
```

## Проверка что всё работает

```bash
# Проверить что контейнеры запущены
docker ps

# Проверить что файлы конфигурации на месте
docker exec -it qlink-frontend ls -la | grep -E "(postcss|tailwind)"

# Проверить содержимое postcss.config.js
docker exec -it qlink-frontend cat postcss.config.js

# Проверить содержимое tailwind.config.ts  
docker exec -it qlink-frontend cat tailwind.config.ts
```

## Ожидаемый результат

В логах frontend должно быть:
```
✓ Ready in 2-3s
✓ Compiled successfully
```

Без ошибок:
- ❌ `Module parse failed: Unexpected character '@'`
- ❌ `ENOENT: no such file or directory, open '.next/prerender-manifest.js'`

## Если всё ещё есть ошибки

### Вариант 1: Полная очистка
```bash
cd ~/qlink
docker-compose down -v
docker system prune -af
docker-compose up -d --build
```

### Вариант 2: Проверить что middleware отключен
```bash
docker exec -it qlink-frontend cat src/middleware.ts | head -5
```

Должно быть:
```
// ВРЕМЕННО ОТКЛЮЧЕНО: Middleware вызывает ошибку в Docker
```

### Вариант 3: Использовать production build
Измените в docker-compose.yml для frontend:
```yaml
command: sh -c "npm run build && npm start"
```

## Доступ к сайту

После успешного запуска:
- Frontend: http://217.114.7.3:3000
- Backend API: http://217.114.7.3:4000
