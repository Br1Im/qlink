'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
      const isDemoMode = typeof window !== 'undefined' && localStorage.getItem('demo-mode') === 'true';
      const demoType = typeof window !== 'undefined' ? localStorage.getItem('demo-type') || 'beauty' : 'beauty';
      
      if (isDemoMode) {
        // Загружаем демо-данные из модуля
        const { getDemoAccount } = await import('@/lib/demo-accounts');
        const account = getDemoAccount(demoType as any);
        
        setStats(account.stats);
        setBookings(account.bookings.slice(0, 3).map(b => ({
          id: b.id.toString(),
          clientName: b.client,
          serviceName: b.service,
          price: b.price,
          date: 'Сегодня',
          time: `${b.time} - ${b.time}`,
          status: b.status,
        })));
        setIsNewUser(false);
      } else {
        // Пустые данные для новых пользователей
        setStats({
          bookingsToday: 0,
          newClients: 0,
          revenueToday: 0,
          averageCheck: 0,
        });
        setBookings([]);
        setIsNewUser(true);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback данные
      setStats({
        bookingsToday: 8,
        newClients: 3,
        revenueToday: 12500,
        averageCheck: 1562,
      });
      setBookings([
        {
          id: '1',
          clientName: 'Анна Иванова',
          serviceName: 'Стрижка женская',
          price: 1500,
          date: 'Сегодня',
          time: '14:00 - 15:30',
          status: 'confirmed',
        },
        {
          id: '2',
          clientName: 'Дмитрий Смирнов',
          serviceName: 'Стрижка мужская',
          price: 800,
          date: 'Сегодня',
          time: '15:30 - 16:15',
          status: 'confirmed',
        },
        {
          id: '3',
          clientName: 'Елена Козлова',
          serviceName: 'Окрашивание',
          price: 3000,
          date: 'Сегодня',
          time: '17:00 - 19:00',
          status: 'pending',
        },
      ]);
      setIsNewUser(false);
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
                Начните настройку вашего бизнеса или попробуйте демо-режим с готовыми данными.
              </p>
              
              {/* Выбор типа демо-аккаунта */}
              <div className="mb-4">
                <p className="text-sm text-blue-100 mb-2">Выберите тип бизнеса для демо:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('demo-mode', 'true');
                        localStorage.setItem('demo-type', 'beauty');
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    💇 Салон красоты
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('demo-mode', 'true');
                        localStorage.setItem('demo-type', 'fitness');
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    💪 Фитнес-центр
                  </button>
                </div>
              </div>

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
