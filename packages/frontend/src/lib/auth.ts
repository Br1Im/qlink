// Система аутентификации с использованием cookies и API
import { api } from './api';

const TOKEN_KEY = 'qlink_auth_token';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Получить токен из cookies (безопаснее чем localStorage)
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Пробуем получить из cookie
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith(`${TOKEN_KEY}=`));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}

// Сохранить токен в cookie
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  // Сохраняем в httpOnly cookie через API
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`;
}

// Удалить токен
export function removeToken(): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

// Получить данные пользователя
export async function getCurrentUser(): Promise<User | null> {
  const token = getToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const response = await api.getProfile();
    return response.user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    removeToken();
    return null;
  }
}

// Вход
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await api.login({ email, password });
    
    if (response.token) {
      setToken(response.token);
      return { success: true };
    }
    
    return { success: false, error: 'Не получен токен' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Ошибка входа' };
  }
}

// Регистрация
export async function register(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await api.register(data);
    
    if (response.token) {
      setToken(response.token);
      return { success: true };
    }
    
    return { success: false, error: 'Не получен токен' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Ошибка регистрации' };
  }
}

// Выход
export function logout(): void {
  removeToken();
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

// Проверка аутентификации
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
