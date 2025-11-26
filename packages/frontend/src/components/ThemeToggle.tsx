'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/lib/store';

export default function ThemeToggle() {
  const { theme, setTheme } = useUIStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Применяем тему при загрузке
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
      aria-label="Переключить тему"
      type="button"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500 transition-transform duration-200" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700 transition-transform duration-200" />
      )}
    </button>
  );
}
