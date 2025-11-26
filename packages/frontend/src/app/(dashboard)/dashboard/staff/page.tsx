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
import { loadDemoData } from '@/lib/demo-data';
import { api } from '@/lib/api';

export default function StaffPage() {
  // Загружаем данные (демо или из localStorage)
  const [staff, setStaff] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    phone: '',
    email: '',
    workingHours: '',
  });

  // Загрузка данных из API
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data = await api.getStaff();
        setStaff(data);
      } catch (error) {
        console.error('Ошибка загрузки сотрудников:', error);
        // Показываем пустой список если API недоступен
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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
        >
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
                <button 
                  onClick={() => {
                    setEditingStaff(member);
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Редактировать</span>
                </button>
                <button 
                  onClick={() => {
                    if (confirm(`Удалить сотрудника ${member.name}?`)) {
                      setStaff(staff.filter(s => s.id !== member.id));
                    }
                  }}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Staff Card */}
        <div 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 hover:border-blue-500 transition cursor-pointer flex items-center justify-center"
        >
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

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Добавить сотрудника</h2>
              <p className="text-gray-600 mt-1">Заполните информацию о новом сотруднике</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Должность *
                </label>
                <input
                  type="text"
                  value={newStaff.position}
                  onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Мастер"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  График работы
                </label>
                <input
                  type="text"
                  value={newStaff.workingHours}
                  onChange={(e) => setNewStaff({ ...newStaff, workingHours: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Пн-Пт: 10:00-19:00"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewStaff({
                    name: '',
                    position: '',
                    phone: '',
                    email: '',
                    workingHours: '',
                  });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Отмена
              </button>
              <button
                onClick={async () => {
                  if (newStaff.name && newStaff.position && newStaff.phone && newStaff.email) {
                    setIsLoading(true);
                    try {
                      const { api } = await import('@/lib/api');
                      const result = await api.createStaff({
                        name: newStaff.name,
                        position: newStaff.position,
                        phone: newStaff.phone,
                        email: newStaff.email,
                        workingHours: newStaff.workingHours || 'Не указан',
                      });
                      
                      if (result.success) {
                        const newMember = {
                          id: result.staff.id,
                          name: newStaff.name,
                          position: newStaff.position,
                          phone: newStaff.phone,
                          email: newStaff.email,
                          avatar: null,
                          rating: 0,
                          bookings: 0,
                          revenue: 0,
                          isActive: true,
                          services: [],
                          workingHours: newStaff.workingHours || 'Не указан',
                        };
                        setStaff([...staff, newMember]);
                        setIsAddModalOpen(false);
                        setNewStaff({
                          name: '',
                          position: '',
                          phone: '',
                          email: '',
                          workingHours: '',
                        });
                      }
                    } catch (error: any) {
                      alert(error.message || 'Ошибка создания сотрудника');
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
                {isLoading ? 'Добавление...' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {isEditModalOpen && editingStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Редактировать сотрудника</h2>
              <p className="text-gray-600 mt-1">Измените информацию о сотруднике</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <input
                  type="text"
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Должность *
                </label>
                <input
                  type="text"
                  value={editingStaff.position}
                  onChange={(e) => setEditingStaff({ ...editingStaff, position: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={editingStaff.phone}
                  onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingStaff.email}
                  onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  График работы
                </label>
                <input
                  type="text"
                  value={editingStaff.workingHours}
                  onChange={(e) => setEditingStaff({ ...editingStaff, workingHours: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingStaff(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  const updatedStaff = staff.map(s => 
                    s.id === editingStaff.id ? editingStaff : s
                  );
                  setStaff(updatedStaff);
                  setIsEditModalOpen(false);
                  setEditingStaff(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition"
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
