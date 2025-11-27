# Исправление ошибки 502 Bad Gateway

## Симптомы
- При попытке логина появляется ошибка 502
- В консоли браузера: `POST https://q-link.tech/api/auth/login 502 (Bad Gateway)`
- Ошибка: `SyntaxError: Unexpected token '<', "<html><h"... is not valid JSON`

## Причина
Backend контейнер не отвечает или не запущен. Nginx не может проксировать запросы к backend.

## Быстрое решение

### Вариант 1: Автоматический скрипт (рекомендуется)

**Windows:**
```cmd
scripts\fix-backend.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/fix-backend.sh
./scripts/fix-backend.sh
```

### Вариант 2: Ручная диагностика

#### Шаг 1: Проверить статус контейнеров
```bash
docker ps -a | grep qlink
```

Убедитесь что `qlink-backend` в статусе `Up`. Если `Exited` - контейнер упал.

#### Шаг 2: Посмотреть логи backend
```bash
docker logs qlink-backend --tail 50
```

Ищите ошибки:
- `Error: connect ECONNREFUSED` - не может подключиться к БД
- `SyntaxError` - ошибка в коде
- `EADDRINUSE` - порт занят

#### Шаг 3: Проверить доступность из nginx
```bash
docker exec qlink-nginx wget -O- http://backend:3000/api/health
```

Должен вернуть JSON с информацией о здоровье API.

#### Шаг 4: Перезапустить backend
```bash
docker-compose restart backend
sleep 20
docker logs qlink-backend --tail 20
```

#### Шаг 5: Если не помогло - пересобрать
```bash
cd ~/qlink
git pull origin main
docker-compose stop backend
docker rm qlink-backend
docker-compose build backend --no-cache
docker-compose up -d backend
```

## Проверка после исправления

1. Откройте https://q-link.tech/login
2. Попробуйте войти с тестовыми данными:
   - Email: `test@qlink.tech`
   - Password: `Test123456`

## Если проблема сохраняется

### Проверить базу данных
```bash
docker exec qlink-postgres psql -U qlink_user -d qlink_db -c "SELECT COUNT(*) FROM \"User\";"
```

### Проверить переменные окружения
```bash
docker exec qlink-backend env | grep DATABASE_URL
```

### Полный перезапуск всех сервисов
```bash
docker-compose down
docker-compose up -d
sleep 30
docker-compose logs --tail 50
```

## Профилактика

Чтобы избежать проблем в будущем:

1. **Всегда проверяйте логи после обновления:**
   ```bash
   docker logs qlink-backend -f
   ```

2. **Делайте бэкап перед обновлениями:**
   ```bash
   docker exec qlink-postgres pg_dump -U qlink_user qlink_db > backup.sql
   ```

3. **Тестируйте локально перед деплоем:**
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```
