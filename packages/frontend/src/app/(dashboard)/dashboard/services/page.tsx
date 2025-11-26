'use client';

import { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Users,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { loadDemoData } from '@/lib/demo-data';
import { api } from '@/lib/api';

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  staff: string[];
  bookings: number;
  isActive: boolean;
  image: string | null;
  description?: string;
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
  });

  // Загружаем данные из API
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
            // Fallback данные
            setServices([
          {
            id: 1,
            name: 'Стрижка женская',
            category: 'Стрижки',
            price: 1500,
            duration: 90,
            staff: ['Мария Петрова', 'Анна Сидорова'],
            bookings: 45,
            isActive: true,
            image: null,
            description: 'Модельная стрижка с укладкой',
          },
          {
            id: 2,
            name: 'Стрижка мужская',
            category: 'Стрижки',
            price: 800,
            duration: 45,
            staff: ['Иван Иванов'],
            bookings: 67,
            isActive: true,
            image: null,
            description: 'Классическая мужская стрижка',
          },
          {
            id: 3,
            name: 'Окрашивание',
            category: 'Окрашивание',
            price: 3000,
            duration: 120,
            staff: ['Мария Петрова'],
            bookings: 23,
            isActive: true,
            image: null,
            description: 'Окрашивание волос премиум красителями',
          },
          {
            id: 4,
            name: 'Маникюр',
            category: 'Ногтевой сервис',
            price: 1200,
            duration: 60,
            staff: ['Елена Козлова'],
            bookings: 89,
            isActive: true,
            image: null,
            description: 'Классический маникюр с покрытием',
          },
          {
            id: 5,
            name: 'Педикюр',
            category: 'Ногтевой сервис',
            price: 1500,
            duration: 75,
            staff: ['Елена Козлова'],
            bookings: 56,
            isActive: true,
            image: null,
            description: 'Аппаратный педикюр',
          },
        ]);
      }
    };
    
    loadDemoData();
  }, []);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price.toString(),
        duration: service.duration.toString(),
        description: service.description || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        duration: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Редактирование существующей услуги
      setServices(services.map(s => 
        s.id === editingService.id 
          ? {
              ...s,
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              duration: parseInt(formData.duration),
              description: formData.description,
            }
          : s
      ));
    } else {
      // Создание новой услуги
      const newService: Service = {
        id: Math.max(...services.map(s => s.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        description: formData.description,
        staff: [],
        bookings: 0,
        isActive: true,
        image: null,
      };
      setServices([...services, newService]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleToggleActive = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const categories = [
    'Все услуги',
    'Стрижки',
    'Окрашивание',
    'Ногтевой сервис',
    'Уход за лицом',
    'Массаж',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Услуги</h1>
          <p className="text-gray-600 mt-2">Управление услугами и ценами</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить услугу</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего услуг</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{services.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Активных</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {services.filter(s => s.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ToggleRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средняя цена</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {services.length > 0 
                  ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString()
                  : 0}₽
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Записей за месяц</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {services.reduce((sum, s) => sum + s.bookings, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Пока нет услуг
            </h3>
            <p className="text-gray-600 mb-6">
              Создайте первую услугу для вашего бизнеса
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              <Plus className="w-5 h-5" />
              Создать услугу
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <Briefcase className="w-16 h-16 text-blue-600" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.category}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleActive(service.id)}
                  className={`p-2 rounded-lg transition ${
                    service.isActive
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {service.isActive ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Цена</p>
                    <p className="font-semibold text-gray-900">
                      {service.price}₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Время</p>
                    <p className="font-semibold text-gray-900">
                      {service.duration} мин
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Сотрудники:</p>
                <div className="flex flex-wrap gap-2">
                  {service.staff.map((staff) => (
                    <span
                      key={staff}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                    >
                      {staff}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bookings */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-sm text-gray-600">Записей за месяц</span>
                <span className="font-semibold text-gray-900">
                  {service.bookings}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleOpenModal(service)}
                  className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Редактировать</span>
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          ))}

          {/* Add Service Card */}
      <div 
        onClick={() => handleOpenModal()}
        className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 hover:border-blue-500 transition cursor-pointer"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Добавить новую услугу
          </h3>
          <p className="text-sm text-gray-600">
            Создайте новую услугу для вашего бизнеса
          </p>
        </div>
      </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingService ? 'Редактировать услугу' : 'Новая услуга'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название услуги *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Например: Стрижка женская"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="Стрижки">Стрижки</option>
                  <option value="Окрашивание">Окрашивание</option>
                  <option value="Ногтевой сервис">Ногтевой сервис</option>
                  <option value="Уход за лицом">Уход за лицом</option>
                  <option value="Массаж">Массаж</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность (мин) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="60"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Краткое описание услуги..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  {editingService ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
