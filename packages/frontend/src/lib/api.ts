// API клиент с fallback на mock данные

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Получить токен из cookies
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('qlink_auth_token='));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}

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

  async createBooking(data: any) {
    console.log('🔧 Mock API: Создание записи', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      booking: {
        id: Date.now(),
        ...data,
        status: 'pending',
      },
    };
  },

  async createClient(data: any) {
    console.log('🔧 Mock API: Создание клиента', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      client: {
        id: Date.now(),
        ...data,
        totalBookings: 0,
        totalSpent: 0,
        rating: 0,
      },
    };
  },

  async createStaff(data: any) {
    console.log('🔧 Mock API: Создание сотрудника', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      staff: {
        id: Date.now(),
        ...data,
        rating: 0,
        bookings: 0,
        revenue: 0,
        isActive: true,
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

  async createBooking(data: any) {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ Backend API недоступен, используется Mock API');
      return mockApi.createBooking(data);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка создания записи');
    }

    return response.json();
  },

  async createClient(data: any) {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ Backend API недоступен, используется Mock API');
      return mockApi.createClient(data);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка создания клиента');
    }

    return response.json();
  },

  async createStaff(data: any) {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ Backend API недоступен, используется Mock API');
      return mockApi.createStaff(data);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка создания сотрудника');
    }

    return response.json();
  },

  // Получение данных
  async getBookings() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен. Пожалуйста, запустите сервер.');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки записей');
    }

    return response.json();
  },

  async getClients() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен. Пожалуйста, запустите сервер.');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/clients`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки клиентов');
    }

    return response.json();
  },

  async getStaff() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен. Пожалуйста, запустите сервер.');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/staff`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки сотрудников');
    }

    return response.json();
  },

  async getSettings() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен. Пожалуйста, запустите сервер.');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/settings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки настроек');
    }

    return response.json();
  },

  async updateSettings(data: any) {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен. Пожалуйста, запустите сервер.');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка сохранения настроек');
    }

    return response.json();
  },

  async getProfile() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки профиля');
    }

    return response.json();
  },

  async getDashboardStats() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки статистики');
    }

    return response.json();
  },

  async getServices() {
    const apiAvailable = await isApiAvailable();
    if (!apiAvailable) {
      throw new Error('Backend API недоступен');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/services`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки услуг');
    }

    return response.json();
  },
};
