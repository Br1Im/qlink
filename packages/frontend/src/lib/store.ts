// Глобальное состояние приложения с использованием React Context
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

interface Business {
  id: string;
  name: string;
  category: string;
  logo?: string;
}

interface AppState {
  // Пользователь
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Бизнес
  currentBusiness: Business | null;
  setCurrentBusiness: (business: Business | null) => void;
  
  // UI состояние
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Загрузка
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Очистка состояния
  clearState: () => void;
}

// Создаем store без persist для чувствительных данных
export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  currentBusiness: null,
  setCurrentBusiness: (business) => set({ currentBusiness: business }),
  
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  clearState: () => set({
    user: null,
    currentBusiness: null,
    sidebarOpen: false,
    isLoading: false,
  }),
}));

// Store для UI настроек (можно сохранять локально)
interface UIState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  language: 'ru' | 'en';
  setLanguage: (language: 'ru' | 'en') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      language: 'ru',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'qlink-ui-settings',
    }
  )
);
