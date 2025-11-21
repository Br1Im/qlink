'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Star,
  Calendar,
  DollarSign,
  ToggleRight,
  ToggleLeft,
  Phone,
  Mail,
} from 'lucide-react';

export default function StaffPage() {
  // Загружаем данные (демо или пустые)
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    const loadDemoData = async () => {
      if (typeof window !== 'undefined') {
        const isDemoMode = localStorage.getItem('demo-mode') === 'true';
        const demoType = localStorage.getItem('demo-type') || 'beauty';
        
        if (isDemoMode) {
          try {
            const { getDemoAccount } = await import('@/lib/demo-accounts');
            const account = getDemoAccount(demoType as any);
            setStaff(account.staff);
          } catch (error) {
            setStaff([
          {
            id: 1,
            name: 'Мария Петрова',
            position: 'Старший мастер',
            phone: '+7 (999) 111-22-33',
            email: 'maria@example.com',
            avatar: null,
            rating: 4.9,
            bookings: 156,
            revenue: 234000,
            isActive: true,
            services: ['Стрижка женская', 'Окрашивание', 'Укладка'],
            workingHours: 'Пн-Пт: 10:00-19:00',
          },
          {
            id: 2,
            name: 'Иван Иванов',
            position: 'Барбер',
            phone: '+7 (999) 222-33-44',
            email: 'ivan@example.com',
            avatar: null,
            rating: 4.8,
            bookings: 189,
            revenue: 151200,
            isActive: true,
            services: ['Стрижка мужская', 'Бритье', 'Уход за бородой'],
            workingHours: 'Вт-Сб: 11:00-20:00',
          },
          {
            id: 3,
            name: 'Елена Козлова',
            position: 'Мастер маникюра',
            phone: '+7 (999) 333-44-55',
            email: 'elena@example.com',
            avatar: null,
            rating: 5.0,
            bookings: 203,
            revenue: 243600,
            isActive: true,
            services: ['Маникюр', 'Педикюр', 'Наращивание'],
            workingHours: 'Пн-Сб: 9:00-18:00',
          },
        ]);
          }
        }
      }
    };
    
    loadDemoData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Сотрудники</h1>
          <p className="text-gray-600 mt-2">Управление командой</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Добавить сотрудника</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего сотрудников</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{staff.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний рейтинг</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {staff.length > 0 
                  ? (staff.reduce((sum, s) => sum + (s.rating || 0), 0) / staff.length).toFixed(1)
                  : '-'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Записей за месяц</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {staff.reduce((sum, s) => sum + (s.bookings || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Общая выручка</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {staff.length > 0
                  ? `${Math.round(staff.reduce((sum, s) => sum + (s.revenue || 0), 0) / 1000)}K₽`
                  : '0₽'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {member.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </div>
                <button
                  className={`p-2 rounded-lg transition ${
                    member.isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {member.isActive ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-100 text-sm mt-1">{member.position}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Rating */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-sm text-gray-600">Рейтинг</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">
                    {member.rating}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Записей</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {member.bookings}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Выручка</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(member.revenue / 1000).toFixed(0)}K₽
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">График работы:</p>
                <p className="text-sm font-medium text-gray-900">
                  {member.workingHours}
                </p>
              </div>

              {/* Services */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Услуги:</p>
                <div className="flex flex-wrap gap-2">
                  {member.services.map((service: string) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Редактировать</span>
                </button>
                <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Staff Card */}
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 hover:border-blue-500 transition cursor-pointer flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Добавить сотрудника
            </h3>
            <p className="text-sm text-gray-600">
              Пригласите нового члена команды
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
