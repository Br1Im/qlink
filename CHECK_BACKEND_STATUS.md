# Проверка статуса Backend

## Проблема
Backend возвращает 502 Bad Gateway при попытке логина.

## Команды для диагностики на сервере

### 1. Проверить статус контейнеров
```bash
docker ps -a
```

### 2. Проверить логи backend
```bash
docker logs qlink-backend --tail 100
```

### 3. Проверить логи nginx
```bash
docker logs qlink-nginx --tail 50
```

### 4. Проверить доступность backend изнутри nginx
```bash
docker exec qlink-nginx wget -O- http://backend:3000/api/health
```

### 5. Перезапустить backend если нужно
```bash
docker-compose restart backend
# Подождать 20 секунд
sleep 20
docker logs qlink-backend --tail 50
```

### 6. Если backend не запускается, пересобрать
```bash
docker-compose stop backend
docker rm qlink-backend
docker-compose build backend --no-cache
docker-compose up -d backend
```

## Возможные причины

1. **Backend не запустился** - проверьте логи
2. **Ошибка в коде** - проверьте последние изменения
3. **База данных недоступна** - проверьте подключение к PostgreSQL
4. **Порт занят** - проверьте что порт 3000 свободен внутри контейнера

## Быстрое решение

Если backend упал после обновления, откатитесь к предыдущей версии:

```bash
cd ~/qlink
git log --oneline -5  # Посмотреть последние коммиты
git checkout <предыдущий-коммит>
docker-compose stop backend
docker-compose build backend
docker-compose up -d backend
```
