# Инструкция по запуску обновленного Qlink

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
# Корневая директория
npm install

# Frontend
cd packages/frontend
npm install

# Backend
cd packages/backend
npm install
```

### 2. Настройка окружения

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/qlink"
JWT_SECRET="your-secret-key-here"
API_PORT=4000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Запуск базы данных

```bash
# С помощью Docker
docker-compose up -d postgres

# Или локально установленный PostgreSQL
```

### 4. Миграции базы данных

```bash
cd packages/backend
npx prisma migrate dev
npx prisma db seed
```

### 5. Запуск приложения

#### Режим разработки

```bash
# Терминал 1 - Backend
cd packages/backend
npm run dev

# Терминал 2 - Frontend
cd packages/frontend
npm run dev
```

#### Production режим

```bash
# С помощью Docker
docker-compose -f docker-compose.prod.yml up -d

# Или вручную
cd packages/backend
npm run build
npm start

cd packages/frontend
npm run build
npm start
```

## 📋 Что изменилось

### ✅ Безопасность
- Токены теперь в HTTP-only cookies вместо localStorage
- Middleware для защиты маршрутов
- Автоматическая проверка аутентификации

### ✅ UI/UX
- Плавные переходы между страницами
- Анимации для всех элементов
- Toast уведомления
- Улучшенные кнопки и модальные окна
- Кастомные скроллбары

### ✅ Архитектура
- Централизованное управление состоянием (Zustand)
- Переиспользуемые компоненты (Button, Modal, Toast)
- Хуки для работы с API (useApi, useForm)
- TypeScript типизация

## 🔧 Новые компоненты

### Button
```tsx
import Button from '@/components/Button';

<Button
  variant="primary"
  size="md"
  loading={isLoading}
  onClick={handleClick}
>
  Нажми меня
</Button>
```

### Modal
```tsx
import Modal from '@/components/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Заголовок"
>
  Содержимое
</Modal>
```

### Toast
```tsx
import { useToast } from '@/components/Toast';

const toast = useToast();

toast.success('Успех!');
toast.error('Ошибка!');
toast.warning('Предупреждение!');
toast.info('Информация!');
```

## 🐛 Исправленные проблемы

1. ✅ Удалено использование localStorage для токенов
2. ✅ Все кнопки теперь работают корректно
3. ✅ Добавлены плавные переходы
4. ✅ Улучшена обратная связь для пользователя
5. ✅ Исправлены проблемы с состоянием

## 📚 Документация

- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - Подробное описание улучшений
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура приложения
- [TODO.md](./TODO.md) - Планы на будущее

## 🔒 Безопасность

### Важно!
1. Измените JWT_SECRET в production
2. Используйте HTTPS в production
3. Настройте CORS правильно
4. Включите rate limiting

## 🧪 Тестирование

```bash
# Frontend
cd packages/frontend
npm run test

# Backend
cd packages/backend
npm run test
```

## 📦 Сборка для production

```bash
# Frontend
cd packages/frontend
npm run build

# Backend
cd packages/backend
npm run build
```

## 🐳 Docker

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## 🆘 Помощь

Если возникли проблемы:

1. Проверьте, что все зависимости установлены
2. Убедитесь, что база данных запущена
3. Проверьте .env файлы
4. Посмотрите логи: `docker-compose logs -f`

## 📞 Контакты

Если нужна помощь, создайте issue в репозитории.
