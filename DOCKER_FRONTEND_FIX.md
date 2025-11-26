# Исправление ошибок Docker Frontend

## Проблемы
1. ❌ Tailwind CSS не парсится: `Module parse failed: Unexpected character '@'`
2. ❌ Middleware ошибка: `ENOENT: no such file or directory, open '.next/prerender-manifest.js'`

## Решение

### На сервере выполните:

```bash
cd ~/qlink

# 1. Получить последние изменения
git pull origin main

# 2. Остановить и удалить контейнеры
docker-compose down

# 3. Удалить старый образ frontend
docker rmi qlink_frontend

# 4. Пересобрать всё заново
docker-compose up -d --build

# 5. Проверить логи
docker-compose logs -f frontend
```

## Что было исправлено

### 1. Dockerfile.frontend
- Изменен порядок копирования файлов
- Сначала копируются package.json, затем устанавливаются зависимости
- Потом копируются все файлы включая postcss.config.js и tailwind.config.ts

### 2. middleware.ts
- Временно отключена логика проверки авторизации
- Middleware теперь просто пропускает все запросы
- Это исправляет ошибку с prerender-manifest.js

## Проверка

После запуска контейнеров проверьте:

```bash
# Проверить что контейнер запущен
docker ps | grep frontend

# Проверить что файлы на месте
docker exec -it qlink-frontend ls -la
docker exec -it qlink-frontend cat postcss.config.js
docker exec -it qlink-frontend cat tailwind.config.ts

# Проверить логи
docker-compose logs frontend | grep -i error
```

## Если всё работает

Сайт должен быть доступен на http://217.114.7.3:3000

## Включение middleware обратно

Когда проблема с Next.js будет решена, восстановите middleware:

```bash
# В файле packages/frontend/src/middleware.ts
# Раскомментируйте оригинальный код из middleware.ts.disabled
```

## Альтернативное решение

Если проблема сохраняется, можно использовать production build вместо dev mode:

1. Измените Dockerfile.frontend:
   - Замените `CMD ["npm", "run", "dev"]` на `CMD ["npm", "run", "build", "&&", "npm", "start"]`
   
2. Или используйте Dockerfile.frontend.prod для production деплоя
