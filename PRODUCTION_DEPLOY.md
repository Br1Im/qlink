# Production Deployment Guide

## Новый подход - Production Build

Вместо запуска Next.js в dev режиме, теперь используется правильный production build:
- ✅ Собирается статический build (`npm run build`)
- ✅ Запускается production сервер (`npm start`)
- ✅ Tailwind CSS компилируется один раз при сборке
- ✅ Нет volumes - все включено в образ
- ✅ Быстрее и стабильнее

## Команды для деплоя

```bash
cd ~/qlink

# Получить последние изменения
git pull origin main

# Остановить все контейнеры
docker-compose -f docker-compose.prod.yml down

# Удалить старые volumes (больше не нужны)
docker volume rm qlink_frontend_node_modules qlink_frontend_next 2>/dev/null || true

# Удалить старый образ frontend
docker rmi qlink_frontend qlink-frontend 2>/dev/null || true

# Собрать новый образ с нуля
docker-compose -f docker-compose.prod.yml build --no-cache frontend

# Запустить все сервисы
docker-compose -f docker-compose.prod.yml up -d

# Проверить логи
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## Ожидаемый результат

При сборке вы увидите:
```
Step X: RUN npm run build
> @qlink/frontend@1.0.0 build
> next build

✓ Creating an optimized production build
✓ Compiled successfully
```

При запуске:
```
> @qlink/frontend@1.0.0 start
> next start

▲ Next.js 14.1.0
- Local:        http://localhost:3000
✓ Ready in XXXms
```

## Преимущества

1. **Стабильность**: Production build не перезапускается при ошибках
2. **Производительность**: Оптимизированный код, минификация
3. **Tailwind CSS**: Компилируется один раз, все стили работают
4. **Размер**: Меньший размер образа (удаляются dev зависимости)

## Если нужно обновить код

```bash
cd ~/qlink
git pull origin main
docker-compose -f docker-compose.prod.yml build frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

## Проверка работы

```bash
# Проверить статус контейнеров
docker-compose -f docker-compose.prod.yml ps

# Проверить сайт
curl -I https://q-link.tech

# Посмотреть логи
docker-compose -f docker-compose.prod.yml logs frontend
```
