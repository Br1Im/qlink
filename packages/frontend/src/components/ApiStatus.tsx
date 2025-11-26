'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

export default function ApiStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('http://localhost:4000/health', {
          method: 'GET',
          signal: AbortSignal.timeout(2000),
        });
        setIsOnline(response.ok);
        setShowWarning(!response.ok);
      } catch {
        setIsOnline(false);
        setShowWarning(true);
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 30000); // Проверяем каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
      <div className="flex items-start space-x-3">
        <WifiOff className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold mb-1">Backend API недоступен</h4>
          <p className="text-sm opacity-90">
            Данные сохраняются локально в браузере. Для полной функциональности запустите backend сервер.
          </p>
          <button
            onClick={() => setShowWarning(false)}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Скрыть
          </button>
        </div>
      </div>
    </div>
  );
}
