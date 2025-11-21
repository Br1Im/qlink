'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Star,
  ArrowUp,
  BarChart3,
} from 'lucide-react';

export default function AnalyticsPage() {
  // Загружаем данные (демо или пустые)
  const [stats, setStats] = useState({
    revenue: 0,
    bookings: 0,
    newClients: 0,
    rating: 0,
    reviewCount: 0,
  });

  const [topServices, setTopServices] = useState<any[]>([]);
  const [topStaff, setTopStaff] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [bookingsData, setBookingsData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const loadDemoData = async () => {
      const isDemoMode = typeof window !== 'undefined' && localStorage.getItem('demo-mode') === 'true';
      const demoType = typeof window !== 'undefined' ? localStorage.getItem('demo-type') || 'beauty' : 'beauty';
      
      if (isDemoMode) {
        try {
          const { getDemoAccount } = await import('@/lib/demo-accounts');
          const account = getDemoAccount(demoType as any);
          const analytics = account.analytics;
          
          setStats({
            revenue: analytics.revenue,
            bookings: analytics.bookings,
            newClients: analytics.newClients,
            rating: analytics.rating,
            reviewCount: analytics.reviewCount,
          });
          setTopServices(analytics.topServices);
          setTopStaff(analytics.topStaff);
          setRevenueData(analytics.revenueData);
          setBookingsData(analytics.bookingsData);
        } catch (error) {
          // Fallback данные
          setStats({
            revenue: 125000,
            bookings: 48,
            newClients: 32,
            rating: 4.8,
            reviewCount: 156,
          });
          setTopServices([
            { name: 'Стрижка женская', bookings: 156, revenue: 234000 },
            { name: 'Маникюр', bookings: 203, revenue: 243600 },
            { name: 'Стрижка мужская', bookings: 189, revenue: 151200 },
          ]);
          setTopStaff([
            { name: 'Елена Козлова', bookings: 203, rating: 5.0 },
            { name: 'Иван Иванов', bookings: 189, rating: 4.8 },
            { name: 'Мария Петрова', bookings: 156, rating: 4.9 },
          ]);
          setRevenueData([15000, 18000, 22000, 19000, 25000, 16000, 10000]);
          setBookingsData([5, 7, 9, 8, 12, 6, 4]);
        }
      }
    };
    
    loadDemoData();
  }, []);

  const isEmpty = stats.revenue === 0 && stats.bookings === 0;

  if (isEmpty) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
            <p className="text-gray-600 mt-2">Статистика и отчеты</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="text-center max-w-md mx-auto">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Пока нет данных для аналитики
            </h3>
            <p className="text-gray-600 mb-6">
              Создайте записи и услуги, чтобы увидеть статистику и графики
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/dashboard/services"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Добавить услуги
              </a>
              <a
                href="/dashboard/bookings"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Создать запись
              </a>
            </div>
          </div>
        </div>

        {/* Empty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Выручка</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0₽</p>
            <p className="text-xs text-gray-500 mt-2">Пока нет данных</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Записей</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            <p className="text-xs text-gray-500 mt-2">Пока нет данных</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Новых клиентов</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            <p className="text-xs text-gray-500 mt-2">Пока нет данных</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Средний рейтинг</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
            <p className="text-xs text-gray-500 mt-2">Нет отзывов</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-600 mt-2">Статистика и отчеты</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Последние 7 дней</option>
            <option>Последние 30 дней</option>
            <option>Последние 3 месяца</option>
            <option>Последний год</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Экспорт
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Выручка</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">234,500₽</p>
          <p className="text-xs text-gray-500 mt-2">За последние 30 дней</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Записей</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">548</p>
          <p className="text-xs text-gray-500 mt-2">За последние 30 дней</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              <span>+15.3%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Новых клиентов</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">87</p>
          <p className="text-xs text-gray-500 mt-2">За последние 30 дней</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              <span>+0.2</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Средний рейтинг</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4.8</p>
          <p className="text-xs text-gray-500 mt-2">Из 156 отзывов</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Выручка по дням
            </h2>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>7 дней</option>
              <option>30 дней</option>
              <option>90 дней</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 45, 78, 52, 89, 67, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg hover:opacity-80 transition cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Записи по дням
            </h2>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>7 дней</option>
              <option>30 дней</option>
              <option>90 дней</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[55, 75, 48, 82, 69, 91, 78].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-green-600 to-emerald-500 rounded-t-lg hover:opacity-80 transition cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Services & Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Популярные услуги
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Стрижка женская', bookings: 156, revenue: 234000 },
              { name: 'Маникюр', bookings: 203, revenue: 243600 },
              { name: 'Стрижка мужская', bookings: 189, revenue: 151200 },
              { name: 'Окрашивание', bookings: 89, revenue: 267000 },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {service.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {service.bookings} записей
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {(service.revenue / 1000).toFixed(0)}K₽
                  </p>
                  <p className="text-sm text-gray-600">выручка</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Staff */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Лучшие сотрудники
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Елена Козлова', bookings: 203, rating: 5.0 },
              { name: 'Иван Иванов', bookings: 189, rating: 4.8 },
              { name: 'Мария Петрова', bookings: 156, rating: 4.9 },
              { name: 'Анна Сидорова', bookings: 134, rating: 4.7 },
            ].map((staff, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {staff.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-600">
                      {staff.bookings} записей
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">
                    {staff.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Конверсия записей
          </h3>
          <div className="flex items-end space-x-2">
            <p className="text-4xl font-bold text-gray-900">87%</p>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>+5%</span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 w-[87%]" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Средний чек
          </h3>
          <div className="flex items-end space-x-2">
            <p className="text-4xl font-bold text-gray-900">1,520₽</p>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>+3%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            По сравнению с прошлым месяцем
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Повторные визиты
          </h3>
          <div className="flex items-end space-x-2">
            <p className="text-4xl font-bold text-gray-900">64%</p>
            <div className="flex items-center space-x-1 text-red-600 text-sm font-medium mb-2">
              <TrendingDown className="w-4 h-4" />
              <span>-2%</span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 w-[64%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
