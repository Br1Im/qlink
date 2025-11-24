# Скрипты для тестирования

## Создание тестового аккаунта

Эти скрипты создают тестовый аккаунт для быстрого доступа к системе.

### Данные тестового аккаунта

- **Email:** test@qlink.tech
- **Пароль:** Test123456
- **Имя:** Тест Тестов
- **Компания:** Тестовая Компания
- **Телефон:** +79991234567

### Использование

#### Linux/Mac (Bash)

```bash
# Сделать скрипт исполняемым
chmod +x scripts/create-test-account.sh

# Запустить с дефолтным URL
./scripts/create-test-account.sh

# Запустить с кастомным URL
./scripts/create-test-account.sh http://localhost:3001/api
```

#### Windows (Batch)

```cmd
REM Запустить с дефолтным URL
scripts\create-test-account.bat

REM Запустить с кастомным URL
scripts\create-test-account.bat http://localhost:3001/api
```

#### Node.js (Кросс-платформенный)

```bash
# Запустить с дефолтным URL
node scripts/create-test-account.js

# Запустить с кастомным URL
node scripts/create-test-account.js http://localhost:3001/api
```

### На сервере

```bash
cd ~/qlink

# Сделать скрипт исполняемым
chmod +x scripts/create-test-account.sh

# Создать тестовый аккаунт
./scripts/create-test-account.sh https://q-link.tech/api
```

### Что делает скрипт

1. Отправляет POST запрос на `/auth/register`
2. Создает аккаунт с тестовыми данными
3. Получает токен авторизации
4. Сохраняет токен в файл `.test-token`
5. Выводит данные для входа

### Если аккаунт уже существует

Скрипт просто покажет данные для входа. Вы можете:

1. Войти с существующими данными
2. Удалить аккаунт из базы данных и создать заново:

```bash
# На сервере
docker-compose -f docker-compose.prod.yml exec postgres psql -U postgres -d qlink -c "DELETE FROM \"BusinessOwner\" WHERE email='test@qlink.tech';"

# Затем запустить скрипт снова
./scripts/create-test-account.sh
```

### Использование токена

После создания аккаунта токен сохраняется в файл `.test-token`. Используйте его для API запросов:

```bash
# Пример запроса с токеном
TOKEN=$(cat .test-token)
curl -H "Authorization: Bearer $TOKEN" https://q-link.tech/api/auth/me
```

### Создание дополнительных тестовых аккаунтов

Отредактируйте скрипт и измените данные:

```javascript
const TEST_ACCOUNT = {
  email: 'test2@qlink.tech',  // Измените email
  phone: '+79991234568',       // Измените телефон
  password: 'Test123456',
  firstName: 'Тест2',
  lastName: 'Тестов2',
  company: 'Тестовая Компания 2'
};
```

## Другие полезные команды

### Проверка работы API

```bash
# Проверить здоровье API
curl https://q-link.tech/api/health

# Получить список бизнесов
curl https://q-link.tech/api/businesses
```

### Вход через API

```bash
curl -X POST https://q-link.tech/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@qlink.tech",
    "password": "Test123456"
  }'
```

### Получение профиля

```bash
TOKEN="ваш_токен_здесь"
curl -H "Authorization: Bearer $TOKEN" \
  https://q-link.tech/api/auth/me
```
