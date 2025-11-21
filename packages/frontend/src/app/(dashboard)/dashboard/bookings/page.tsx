'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Edit,
  Filter,
  Search,
  Plus,
} from 'lucide-react';

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Загружаем данные (демо или пустые)
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadDemoData = async () => {
      if (typeof window !== 'undefined') {
        const isDemoMode = localStorage.getItem('demo-mode') === 'true';
        const demoType = localStorage.getItem('demo-type') || 'beauty';
        
        if (isDemoMode) {
          try {
            const { getDemoAccount } = await import('@/lib/demo-accounts');
            const account = getDemoAccount(demoType as any);
            setBookings(account.bookings);
          } catch (error) {
            setBookings([
          {
            id: 1,
            client: 'Анна Иванова',
            phone: '+7 (999) 123-45-67',
            service: 'Стрижка женская',
            staff: 'Мария Петрова',
            date: '2024-11-25',
            time: '14:00',
            duration: 90,
            price: 1500,
            status: 'confirmed',
            avatar: null,
          },
          {
            id: 2,
            client: 'Дмитрий Смирнов',
            phone: '+7 (999) 234-56-78',
            service: 'Стрижка мужская',
            staff: 'Иван Иванов',
            date: '2024-11-25',
            time: '15:30',
            duration: 60,
            price: 800,
            status: 'pending',
            avatar: null,
          },
          {
            id: 3,
            client: 'Елена Козлова',
            phone: '+7 (999) 345-67-89',
            service: 'Окрашивание',
            staff: 'Мария Петрова',
            date: '2024-11-25',
            time: '17:00',
            duration: 120,
            price: 3000,
            status: 'confirmed',
            avatar: null,
          },
          {
            id: 4,
            client: 'Сергей Петров',
            phone: '+7 (999) 456-78-90',
            service: 'Маникюр',
            staff: 'Елена Козлова',
            date: '2024-11-26',
            time: '10:00',
            duration: 60,
            price: 1200,
            status: 'confirmed',
            avatar: null,
          },
          {
            id: 5,
            client: 'Анна Иванова',
            phone: '+7 (999) 123-45-67',
            service: 'Педикюр',
            staff: 'Елена Козлова',
            date: '2024-11-26',
            time: '12:00',
            duration: 75,
            price: 1500,
            status: 'pending',
            avatar: null,
          },
        ]);
          }
        }
      }
    };
    
    loadDemoData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Подтверждена';
      case 'pending':
        return 'Ожидает';
      case 'cancelled':
        return 'Отменена';
      case 'completed':
        return 'Завершена';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Записи</h1>
          <p className="text-gray-600 mt-2">Управление записями клиентов</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Новая запись</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени или телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="confirmed">Подтверждена</option>
            <option value="completed">Завершена</option>
            <option value="cancelled">Отменена</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Фильтры</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Сегодня</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Ожидают</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Подтверждены</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Отменены</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {bookings.filter(b => b.status === 'cancelled').length}
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Пока нет записей
            </h3>
            <p className="text-gray-600 mb-6">
              Создайте первую запись для клиента
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
              <Plus className="w-5 h-5" />
              Создать запись
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {booking.client
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </div>

                  {/* Client Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-gray-900">
                        {booking.client}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{booking.staff}</span>
                      </span>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {booking.service}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.duration} мин • {booking.price}₽
                    </p>
                  </div>

                  {/* Time */}
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-900">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{booking.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(booking.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-6">
                  {booking.status === 'pending' && (
                    <>
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {bookings.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Показано 1-{bookings.length} из {bookings.length} записей
          </p>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Назад
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            3
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Вперед
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
