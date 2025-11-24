#!/usr/bin/env node

/**
 * Скрипт для создания тестового аккаунта
 * Использование: node scripts/create-test-account.js [API_URL]
 */

const https = require('https');
const http = require('http');

// Конфигурация
const API_URL = process.argv[2] || 'https://q-link.tech/api';
const TEST_ACCOUNT = {
  email: 'test@qlink.tech',
  phone: '+79991234567',
  password: 'Test123456',
  firstName: 'Тест',
  lastName: 'Тестов',
  company: 'Тестовая Компания'
};

console.log('\n🔧 Создание тестового аккаунта...');
console.log(`API URL: ${API_URL}\n`);

// Функция для HTTP запроса
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const lib = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = lib.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Основная функция
async function createTestAccount() {
  try {
    console.log('📝 Регистрация пользователя...');
    
    const data = JSON.stringify(TEST_ACCOUNT);
    const result = await makeRequest(`${API_URL}/auth/register`, data);
    
    if (result.status === 200 && result.data.token) {
      console.log('✅ Аккаунт успешно создан!\n');
      console.log('📋 Данные для входа:');
      console.log(`   Email: ${TEST_ACCOUNT.email}`);
      console.log(`   Пароль: ${TEST_ACCOUNT.password}\n`);
      console.log('🔑 Токен авторизации:');
      console.log(`   ${result.data.token}\n`);
      console.log('🌐 Войдите на сайт:');
      console.log('   URL: https://q-link.tech/login');
      console.log(`   Email: ${TEST_ACCOUNT.email}`);
      console.log(`   Пароль: ${TEST_ACCOUNT.password}\n`);
      
      // Сохранение токена
      const fs = require('fs');
      fs.writeFileSync('.test-token', result.data.token);
      console.log('💾 Токен сохранен в файл .test-token\n');
      
    } else if (result.status === 400 && result.data.error?.includes('существует')) {
      console.log('⚠️  Аккаунт уже существует\n');
      console.log('📋 Данные для входа:');
      console.log(`   Email: ${TEST_ACCOUNT.email}`);
      console.log(`   Пароль: ${TEST_ACCOUNT.password}\n`);
      console.log('🌐 Войдите на сайт:');
      console.log('   URL: https://q-link.tech/login\n');
      
    } else {
      console.log('❌ Ошибка создания аккаунта\n');
      console.log('Ответ сервера:');
      console.log(JSON.stringify(result.data, null, 2));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск
createTestAccount();
