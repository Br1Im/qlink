'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Star,
  Filter,
  ArrowLeft,
  Phone,
  Clock,
  DollarSign,
} from 'lucide-react';

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const businesses = [
    {
      id: 1,
      name: 'Салон "Красота"',
      category: 'Красота',
      address: 'Москва, ул. Тверская, 10',
      rating: 4.9,
      reviews: 120,
      price: 'от 1000₽',
      distance: '0.5 км',
      image: null,
      phone: '+7 (495) 123-45-67',
      hours: 'Пн-Вс: 9:00 - 21:00',
    },
    {
      id: 2,
      name: 'Барбершоп "Стиль"',
      category: 'Красота',
      address: 'Москва, ул. Арбат, 25',
      rating: 4.8,
      reviews: 95,
      price: 'от 800₽',
      distance: '1.2 км',
      image: null,
      phone: '+7 (495) 234-56-78',
      hours: 'Пн-Вс: 10:00 - 22:00',
    },
    {
      id: 3,
      name: 'Медицинский центр "Здоровье"',
      category: 'Медицина',
      address: 'Москва, пр-т Мира, 45',
      rating: 4.7,
      reviews: 203,
      price: 'от 1500₽',
      distance: '2.1 км',
      image: null,
      phone: '+7 (495) 345-67-89',
      hours: 'Пн-Пт: 8:00 - 20:00',
    },
  ];

  const categories = [
    { id: 'all', name: 'Все', icon: '🔍' },
    { id: 'beauty', name: 'Красота', icon: '💇' },
    { id: 'medical', name: 'Медицина', icon: '💊' },
    { id: 'sport', name: 'Спорт', icon: '💪' },
    { id: 'auto', name: 'Авто', icon: '🚗' },
    { id: 'home', name: 'Бытовые', icon: '🛠️' },
    { id: 'entertainment', name: 'Досуг', icon: '🎉' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Назад</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Qlink
              </span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск заведений..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Категории</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-lg text-left transition ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Фильтры</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Сбросить
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Рейтинг
                  </label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-2 flex items-center">
                          {[...Array(rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">
                            и выше
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена
                  </label>
                  <div className="space-y-2">
                    {['до 1000₽', '1000-2000₽', '2000-5000₽', 'от 5000₽'].map(
                      (price) => (
                        <label key={price} className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {price}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Расстояние
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue="5"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>0 км</span>
                    <span>10 км</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Карта заведений</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Интеграция с картами в разработке
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Найдено {businesses.length} заведений
                </h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>По рейтингу</option>
                  <option>По расстоянию</option>
                  <option>По цене</option>
                </select>
              </div>

              <div className="space-y-4">
                {businesses.map((business) => (
                  <Link
                    key={business.id}
                    href={`/business/${business.id}`}
                    className="block p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                        <span className="text-3xl">
                          {business.category === 'Красота' ? '💇' : '💊'}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {business.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{business.distance}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span>
                                  {business.rating} ({business.reviews})
                                </span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {business.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {business.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{business.hours}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{business.phone}</span>
                          </span>
                        </div>

                        <div className="mt-4">
                          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                            Записаться
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
