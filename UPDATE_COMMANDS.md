# 🔄 Команды для обновления на хостинге

## Вариант 1: Автоматический скрипт (рекомендуется)

```bash
# Сделать скрипт исполняемым
chmod +x UPDATE_ON_HOSTING.sh

# Запустить обновление
./UPDATE_ON_HOSTING.sh
```

Скрипт автоматически:
- ✅ Получит изменения из Git
- ✅ Остановит контейнеры
- ✅ Пересоберет образы
- ✅ Запустит контейнеры
- ✅ Выполнит миграции БД
- ✅ Проверит статус

---

## Вариант 2: Быстрое обновление (без пересборки)

Если изменения только в коде (не в зависимостях):

```bash
chmod +x UPDATE_QUICK.sh
./UPDATE_QUICK.sh
```

Или вручную:

```bash
git pull origin main
docker-compose restart
docker-compose ps
```

---

## Вариант 3: Полное обновление (вручную)

### Шаг 1: Получить изменения

```bash
cd /var/www/qlink  # или ваша директория
git pull origin main
```

### Шаг 2: Остановить контейнеры

```bash
docker-compose down
```

### Шаг 3: Пересобрать образы

```bash
docker-compose build --no-cache
```

### Шаг 4: Запустить контейнеры

```bash
docker-compose up -d
```

### Шаг 5: Подождать запуска (30-60 секунд)

```bash
# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

### Шаг 6: Запустить миграции БД

```bash
docker exec -it qlink-backend sh -c "cd packages/backend && npx prisma migrate deploy"
```

### Шаг 7: Проверить работу

```bash
# Health check
curl http://localhost:4000/health

# Должен вернуть: {"status":"ok","timestamp":"..."}
```

---

## Вариант 4: Обновление без остановки (zero-downtime)

```bash
# 1. Получить изменения
git pull origin main

# 2. Пересобрать образы
docker-compose build

# 3. Перезапустить по одному
docker-compose up -d --no-deps --build backend
sleep 10
docker-compose up -d --no-deps --build frontend

# 4. Миграции
docker exec -it qlink-backend sh -c "cd packages/backend && npx prisma migrate deploy"
```

---

## Проверка после обновления

### 1. Статус контейнеров

```bash
docker-compose ps
```

Все должны быть в статусе "Up":
```
NAME                IMAGE                  STATUS
qlink-backend       qlink-backend          Up
qlink-frontend      qlink-frontend         Up
qlink-postgres      postgres:15-alpine     Up (healthy)
qlink-redis         redis:7-alpine         Up (healthy)
```

### 2. Логи

```bash
# Все логи
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend

# Последние 100 строк
docker-compose logs --tail=100
```

### 3. Health check

```bash
curl http://localhost:4000/health
```

Должен вернуть:
```json
{"status":"ok","timestamp":"2024-..."}
```

### 4. Проверить frontend

```bash
curl -I http://localhost:3001
```

Должен вернуть `200 OK`

---

## Откат изменений (если что-то пошло не так)

### Откатить Git

```bash
# Посмотреть последние коммиты
git log --oneline -5

# Откатить на предыдущий коммит
git reset --hard HEAD~1

# Или на конкретный коммит
git reset --hard <commit-hash>
```

### Перезапустить контейнеры

```bash
docker-compose down
docker-compose up -d --build
```

---

## Решение проблем

### Контейнеры не запускаются

```bash
# Посмотреть логи
docker-compose logs

# Пересоздать контейнеры
docker-compose down -v
docker-compose up -d --force-recreate
```

### Ошибки при сборке

```bash
# Очистить кэш Docker
docker system prune -a

# Пересобрать с нуля
docker-compose build --no-cache
docker-compose up -d
```

### База данных не подключается

```bash
# Проверить postgres
docker-compose logs postgres

# Перезапустить postgres
docker-compose restart postgres

# Проверить подключение
docker exec -it qlink-postgres psql -U postgres -d qlink -c "SELECT 1;"
```

### Frontend показывает ошибки

```bash
# Проверить логи frontend
docker-compose logs frontend

# Перезапустить frontend
docker-compose restart frontend

# Пересобрать frontend
docker-compose up -d --no-deps --build frontend
```

### Backend не отвечает

```bash
# Проверить логи backend
docker-compose logs backend

# Проверить что backend запущен
docker-compose ps backend

# Перезапустить backend
docker-compose restart backend
```

---

## Мониторинг

### Использование ресурсов

```bash
docker stats
```

### Размер образов

```bash
docker images | grep qlink
```

### Размер volumes

```bash
docker system df -v
```

---

## Бэкап перед обновлением (рекомендуется)

```bash
# Создать бэкап БД
docker exec qlink-postgres pg_dump -U postgres qlink > backup_$(date +%Y%m%d_%H%M%S).sql

# Или через docker-compose
docker-compose exec postgres pg_dump -U postgres qlink > backup.sql
```

### Восстановление из бэкапа

```bash
# Восстановить БД
docker exec -i qlink-postgres psql -U postgres qlink < backup.sql
```

---

## Автоматизация обновлений

### Создать cron job для автоматического обновления

```bash
# Редактировать crontab
crontab -e

# Добавить строку (обновление каждый день в 3:00)
0 3 * * * cd /var/www/qlink && git pull origin main && docker-compose restart
```

---

## Полезные алиасы

Добавить в `~/.bashrc`:

```bash
alias qlink-update='cd /var/www/qlink && git pull origin main && docker-compose down && docker-compose up -d --build'
alias qlink-logs='cd /var/www/qlink && docker-compose logs -f'
alias qlink-status='cd /var/www/qlink && docker-compose ps'
alias qlink-restart='cd /var/www/qlink && docker-compose restart'
```

Применить:

```bash
source ~/.bashrc
```

Использовать:

```bash
qlink-update    # Обновить
qlink-logs      # Логи
qlink-status    # Статус
qlink-restart   # Перезапустить
```

---

## ✅ Чеклист обновления

- [ ] Создан бэкап БД
- [ ] Получены изменения из Git
- [ ] Остановлены контейнеры
- [ ] Пересобраны образы
- [ ] Запущены контейнеры
- [ ] Выполнены миграции
- [ ] Проверен health check
- [ ] Проверены логи на ошибки
- [ ] Проверена работа frontend
- [ ] Проверена работа backend API

---

## 🎉 Готово!

После успешного обновления приложение должно работать с новыми изменениями!
