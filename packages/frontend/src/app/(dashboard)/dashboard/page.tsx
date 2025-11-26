'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Sparkles,
} from 'lucide-react';

interface DashboardStats {
  bookingsToday: number;
  newClients: number;
  revenueToday: number;
  averageCheck: number;
}

interface Booking {
  id: string;
  clientName: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    bookingsToday: 0,
    newClients: 0,
    revenueToday: 0,
    averageCheck: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Пытаемся загрузить данные из API
      const response = await api.getDashboardStats();
      
      setStats(response.stats);
      setBookings(response.recentBookings || []);
      setIsNewUser(response.isNewUser || false);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      
      // Если API недоступен - показываем пустое состояние
      setStats({
        bookingsToday: 0,
        newClients: 0,
        revenueToday: 0,
        averageCheck: 0,
      });
      setBookings([]);
      setIsNewUser(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Главная</h1>
        <p className="text-gray-600 mt-2">
          Добро пожаловать в панель управления Qlink
        </p>
      </div>

      {/* Welcome message for new users */}
      {isNewUser && (
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-8 text-white">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                Добро пожаловать в Qlink! 🎉
              </h2>
              <p className="text-blue-100 mb-4">
                Начните настройку вашего бизнеса - добавьте услуги и сотрудников.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard/services"
                  className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
                >
                  Добавить услуги
                </Link>
                <Link
                  href="/dashboard/staff"
                  className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
                >
                  Добавить сотрудников
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
                >
                  Настройки бизнеса
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Записей сегодня</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.bookingsToday}</p>
              {stats.bookingsToday === 0 && (
                <p className="text-sm text-gray-400 mt-2">Пока нет записей</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Новых клиентов</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.newClients}</p>
              {stats.newClients === 0 && (
                <p className="text-sm text-gray-400 mt-2">Пока нет клиентов</p>
              )}
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Выручка за день</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.revenueToday.toLocaleString()}₽</p>
              {stats.revenueToday === 0 && (
                <p className="text-sm text-gray-400 mt-2">Пока нет выручки</p>
              )}
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний чек</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageCheck.toLocaleString()}₽</p>
              {stats.averageCheck === 0 && (
                <p className="text-sm text-gray-400 mt-2">Нет данных</p>
              )}
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Ближайшие записи
          </h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            Все записи →
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Пока нет записей
              </h3>
              <p className="text-gray-600 mb-6">
                Создайте первую запись для клиента
              </p>
              <Link
                href="/dashboard/bookings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                Создать запись
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-4 sm:p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {booking.clientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {booking.clientName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {booking.serviceName} • {booking.price.toLocaleString()}₽
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-600">{booking.date}</p>
                      <p className="font-semibold text-gray-900">{booking.time}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/bookings"
          className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-xl p-6 hover:shadow-xl transition block"
        >
          <Calendar className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Новая запись</h3>
          <p className="text-sm text-blue-100">
            Создать запись для клиента
          </p>
        </Link>

        <Link
          href="/dashboard/clients"
          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition block"
        >
          <Users className="w-8 h-8 mb-4 text-gray-700" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Добавить клиента
          </h3>
          <p className="text-sm text-gray-600">
            Добавить нового клиента в базу
          </p>
        </Link>

        <Link
          href="/dashboard/analytics"
          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition block"
        >
          <TrendingUp className="w-8 h-8 mb-4 text-gray-700" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Посмотреть отчет
          </h3>
          <p className="text-sm text-gray-600">
            Статистика и аналитика
          </p>
        </Link>
      </div>
    </div>
  );
}
