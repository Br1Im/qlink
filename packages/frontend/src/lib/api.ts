// API клиент с fallback на mock данные

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Проверка доступности API
async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 секунды таймаут
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Mock данные для разработки
const mockApi = {
  async register(data: any) {
    console.log('🔧 Mock API: Регистрация', data);
    
    // Симуляция задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Симуляция успешной регистрации
    return {
      success: true,
      message: 'Регистрация успешна (Mock)',
      user: {
        id: 'mock-user-id',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    };
  },

  async login(data: any) {
    console.log('🔧 Mock API: Вход', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 'mock-user-id',
        email: data.email,
        firstName: 'Тестовый',
        lastName: 'Пользователь',
      },
    };
  },
};

// API клиент
export const api = {
  async register(data: any) {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ Backend API недоступен, используется Mock API');
      return mockApi.register(data);
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка регистрации');
    }

    return response.json();
  },

  async login(data: any) {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ Backend API недоступен, используется Mock API');
      return mockApi.login(data);
    }

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка входа');
    }

    return response.json();
  },
};
