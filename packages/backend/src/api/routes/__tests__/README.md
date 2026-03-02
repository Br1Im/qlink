# API Tests

## Запуск тестов

Перед запуском тестов убедитесь, что:
1. Backend сервер запущен (`npm run dev:api`)
2. База данных доступна
3. Создан тестовый пользователь (email: test@qlink.com, password: Test123!)

### Команды

```bash
# Установить зависимости
npm install

# Запустить все тесты
npm test

# Запустить тесты в watch режиме
npm run test:watch

# Запустить тесты с покрытием
npm run test:coverage
```

## Структура тестов

- `services.test.ts` - тесты для CRUD операций с услугами
  - Создание услуги
  - Получение списка услуг
  - Обновление услуги
  - Удаление услуги
  - Проверка авторизации

## Добавление новых тестов

Создайте файл `*.test.ts` в директории `__tests__` и следуйте структуре:

```typescript
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Feature Name', () => {
  beforeAll(async () => {
    // Подготовка
  });

  it('должен выполнить действие', async () => {
    // Тест
    expect(result).toBe(expected);
  });
});
```
