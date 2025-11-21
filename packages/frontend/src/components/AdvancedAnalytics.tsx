'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface AnalyticsData {
  revenue: number;
  bookings: number;
  clients: number;
  growth: number;
  revenueByDay: { date: string; amount: number }[];
  bookingsByService: { service: string; count: number }[];
  topClients: { name: string; spent: number }[];
}

export default function AdvancedAnalytics({ businessId }: { businessId: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [businessId, period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Здесь должен быть реальный API запрос
      // Пока используем моковые данные
      setTimeout(() => {
        setData({
          revenue: 125000,
          bookings: 48,
          clients: 32,
          growth: 15.3,
          revenueByDay: [
            { date: '2024-01-15', amount: 15000 },
            { date: '2024-01-16', amount: 18000 },
            { date: '2024-01-17', amount: 22000 },
            { date: '2024-01-18', amount: 19000 },
            { date: '2024-01-19', amount: 25000 },
            { date: '2024-01-20', amount: 16000 },
            { date: '2024-01-21', amount: 10000 },
          ],
          bookingsByService: [
            { service: 'Стрижка', count: 20 },
            { service: 'Окрашивание', count: 15 },
            { service: 'Укладка', count: 8 },
            { service: 'Маникюр', count: 5 },
          ],
          topClients: [
            { name: 'Анна Иванова', spent: 15000 },
            { name: 'Мария Петрова', spent: 12000 },
            { name: 'Елена Сидорова', spent: 10000 },
          ],
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-32" />
          ))}
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.revenueByDay.map((d) => d.amount));

  return (
    <div className="space-y-6">
      {/* Фильтр периода */}
      <div className="flex gap-2">
        {['week', 'month', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              period === p
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {p === 'week' ? 'Неделя' : p === 'month' ? 'Месяц' : 'Год'}
          </button>
        ))}
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
            <div className="flex items-center gap-1 text-sm">
              <ArrowUp className="w-4 h-4" />
              {data.growth}%
            </div>
          </div>
          <p className="text-purple-200 text-sm">Выручка</p>
          <p className="text-3xl font-bold mt-1">
            {data.revenue.toLocaleString()} ₽
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm">Записей</p>
          <p className="text-3xl font-bold mt-1">{data.bookings}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 text-sm">Клиентов</p>
          <p className="text-3xl font-bold mt-1">{data.clients}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-gray-600 text-sm">Средний чек</p>
          <p className="text-3xl font-bold mt-1">
            {Math.round(data.revenue / data.bookings).toLocaleString()} ₽
          </p>
        </div>
      </div>

      {/* График выручки */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-6">Выручка по дням</h3>
        <div className="space-y-3">
          {data.revenueByDay.map((day, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm text-gray-600">
                {new Date(day.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
              <div className="flex-1">
                <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg transition-all duration-500"
                    style={{ width: `${(day.amount / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-24 text-right font-semibold">
                {day.amount.toLocaleString()} ₽
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Популярные услуги */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6">Популярные услуги</h3>
          <div className="space-y-4">
            {data.bookingsByService.map((service, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{service.service}</span>
                  <span className="text-gray-600">{service.count} записей</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(service.count / data.bookings) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Топ клиенты */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6">Топ клиенты</h3>
          <div className="space-y-4">
            {data.topClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                    {index + 1}
                  </div>
                  <span className="font-medium">{client.name}</span>
                </div>
                <span className="font-bold text-purple-600">
                  {client.spent.toLocaleString()} ₽
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
