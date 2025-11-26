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
import { api } from '@/lib/api';

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [newBooking, setNewBooking] = useState({
    clientName: '',
    clientPhone: '',
    service: '',
    staff: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    duration: 60,
    price: 0,
  });

  // Загружаем данные (демо или из localStorage)
  const [bookings, setBookings] = useState<any[]>([]);

  // Сохранение в localStorage при изменении
  // Загрузка записей из API
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await api.getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Ошибка загрузки записей:', error);
      }
    };
    loadBookings();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Пытаемся загрузить из API
        const { api } = await import('@/lib/api');
        const result = await api.getBookings();
        setBookings(result.bookings || result);
      } catch (error: any) {
        console.error('Ошибка загрузки из API:', error);
        
        // Если API недоступен, показываем ошибку и используем localStorage как fallback
        const savedBookings = localStorage.getItem('qlink-bookings');
        if (savedBookings) {
          try {
            setBookings(JSON.parse(savedBookings));
            console.warn('⚠️ Используются локально сохраненные данные');
          } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
          }
        }
        
        // Показываем уведомление об ошибке
        if (typeof window !== 'undefined') {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          errorDiv.innerHTML = `
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${error.message || 'Ошибка подключения к серверу'}</span>
            </div>
          `;
          document.body.appendChild(errorDiv);
          setTimeout(() => errorDiv.remove(), 5000);
        }
      }
    };
    
    loadData();
  }, []);

  // Старый код для демо-режима (оставляем как fallback)
  useEffect(() => {
    const loadDemoData = async () => {
      if (bookings.length > 0) return; // Если данные уже загружены, не загружаем демо
      
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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
        >
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
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
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
                      <button 
                        onClick={() => {
                          const updatedBookings = bookings.map(b => 
                            b.id === booking.id ? { ...b, status: 'confirmed' } : b
                          );
                          setBookings(updatedBookings);
                        }}
                        className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                        title="Подтвердить"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          const updatedBookings = bookings.map(b => 
                            b.id === booking.id ? { ...b, status: 'cancelled' } : b
                          );
                          setBookings(updatedBookings);
                        }}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                        title="Отменить"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      setEditingBooking(booking);
                      setIsEditModalOpen(true);
                    }}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    title="Редактировать"
                  >
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

      {/* Add Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Новая запись</h2>
              <p className="text-gray-600 mt-1">Создайте запись для клиента</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя клиента *
                  </label>
                  <input
                    type="text"
                    value={newBooking.clientName}
                    onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={newBooking.clientPhone}
                    onChange={(e) => setNewBooking({ ...newBooking, clientPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Услуга *
                </label>
                <select
                  value={newBooking.service}
                  onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите услугу</option>
                  <option value="Стрижка женская">Стрижка женская</option>
                  <option value="Стрижка мужская">Стрижка мужская</option>
                  <option value="Окрашивание">Окрашивание</option>
                  <option value="Маникюр">Маникюр</option>
                  <option value="Педикюр">Педикюр</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Мастер *
                </label>
                <select
                  value={newBooking.staff}
                  onChange={(e) => setNewBooking({ ...newBooking, staff: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите мастера</option>
                  <option value="Мария Петрова">Мария Петрова</option>
                  <option value="Иван Иванов">Иван Иванов</option>
                  <option value="Елена Козлова">Елена Козлова</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата *
                  </label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время *
                  </label>
                  <input
                    type="time"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность (мин)
                  </label>
                  <input
                    type="number"
                    value={newBooking.duration}
                    onChange={(e) => setNewBooking({ ...newBooking, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="15"
                    step="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽)
                  </label>
                  <input
                    type="number"
                    value={newBooking.price}
                    onChange={(e) => setNewBooking({ ...newBooking, price: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewBooking({
                    clientName: '',
                    clientPhone: '',
                    service: '',
                    staff: '',
                    date: new Date().toISOString().split('T')[0],
                    time: '',
                    duration: 60,
                    price: 0,
                  });
                }}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={async () => {
                  if (newBooking.clientName && newBooking.clientPhone && newBooking.service && 
                      newBooking.staff && newBooking.date && newBooking.time) {
                    setIsLoading(true);
                    try {
                      const { api } = await import('@/lib/api');
                      const result = await api.createBooking({
                        client: newBooking.clientName,
                        phone: newBooking.clientPhone,
                        service: newBooking.service,
                        staff: newBooking.staff,
                        date: newBooking.date,
                        time: newBooking.time,
                        duration: newBooking.duration,
                        price: newBooking.price,
                      });
                      
                      if (result.success) {
                        const newBookingData = {
                          id: result.booking.id,
                          client: newBooking.clientName,
                          phone: newBooking.clientPhone,
                          service: newBooking.service,
                          staff: newBooking.staff,
                          date: newBooking.date,
                          time: newBooking.time,
                          duration: newBooking.duration,
                          price: newBooking.price,
                          status: 'pending',
                          avatar: null,
                        };
                        setBookings([...bookings, newBookingData]);
                        setIsAddModalOpen(false);
                        setNewBooking({
                          clientName: '',
                          clientPhone: '',
                          service: '',
                          staff: '',
                          date: new Date().toISOString().split('T')[0],
                          time: '',
                          duration: 60,
                          price: 0,
                        });
                      }
                    } catch (error: any) {
                      alert(error.message || 'Ошибка создания записи');
                    } finally {
                      setIsLoading(false);
                    }
                  } else {
                    alert('Пожалуйста, заполните все обязательные поля');
                  }
                }}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Создание...' : 'Создать запись'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {isEditModalOpen && editingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Редактировать запись</h2>
              <p className="text-gray-600 mt-1">Измените данные записи</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя клиента *
                  </label>
                  <input
                    type="text"
                    value={editingBooking.client}
                    onChange={(e) => setEditingBooking({ ...editingBooking, client: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={editingBooking.phone}
                    onChange={(e) => setEditingBooking({ ...editingBooking, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Услуга *
                </label>
                <select
                  value={editingBooking.service}
                  onChange={(e) => setEditingBooking({ ...editingBooking, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Стрижка женская">Стрижка женская</option>
                  <option value="Стрижка мужская">Стрижка мужская</option>
                  <option value="Окрашивание">Окрашивание</option>
                  <option value="Маникюр">Маникюр</option>
                  <option value="Педикюр">Педикюр</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Мастер *
                </label>
                <select
                  value={editingBooking.staff}
                  onChange={(e) => setEditingBooking({ ...editingBooking, staff: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Мария Петрова">Мария Петрова</option>
                  <option value="Иван Иванов">Иван Иванов</option>
                  <option value="Елена Козлова">Елена Козлова</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата *
                  </label>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время *
                  </label>
                  <input
                    type="time"
                    value={editingBooking.time}
                    onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность (мин)
                  </label>
                  <input
                    type="number"
                    value={editingBooking.duration}
                    onChange={(e) => setEditingBooking({ ...editingBooking, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="15"
                    step="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽)
                  </label>
                  <input
                    type="number"
                    value={editingBooking.price}
                    onChange={(e) => setEditingBooking({ ...editingBooking, price: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Статус
                </label>
                <select
                  value={editingBooking.status}
                  onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Ожидает</option>
                  <option value="confirmed">Подтверждена</option>
                  <option value="completed">Завершена</option>
                  <option value="cancelled">Отменена</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingBooking(null);
                }}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  const updatedBookings = bookings.map(b => 
                    b.id === editingBooking.id ? editingBooking : b
                  );
                  setBookings(updatedBookings);
                  setIsEditModalOpen(false);
                  setEditingBooking(null);
                }}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
