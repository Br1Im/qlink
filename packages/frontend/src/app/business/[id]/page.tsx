'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Globe,
  Share2,
  Heart,
  Calendar,
  User,
} from 'lucide-react';

export default function BusinessPage({ params }: { params: { id: string } }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const business = {
    id: params.id,
    name: 'Салон "Красота"',
    category: 'Красота',
    rating: 4.9,
    reviews: 120,
    address: 'Москва, ул. Тверская, 10',
    phone: '+7 (495) 123-45-67',
    website: 'salon-krasota.ru',
    hours: 'Пн-Вс: 9:00 - 21:00',
    description:
      'Современный салон красоты в центре Москвы. Профессиональные мастера с опытом работы более 10 лет. Используем только качественные материалы и современное оборудование.',
    images: [],
  };

  const services = [
    {
      id: 1,
      name: 'Стрижка женская',
      price: 1500,
      duration: 90,
      staff: 'Мария Петрова',
    },
    {
      id: 2,
      name: 'Стрижка мужская',
      price: 800,
      duration: 45,
      staff: 'Иван Иванов',
    },
    {
      id: 3,
      name: 'Окрашивание',
      price: 3000,
      duration: 120,
      staff: 'Мария Петрова',
    },
    {
      id: 4,
      name: 'Маникюр',
      price: 1200,
      duration: 60,
      staff: 'Елена Козлова',
    },
  ];

  const staff = [
    {
      id: 1,
      name: 'Мария Петрова',
      position: 'Старший мастер',
      rating: 4.9,
      reviews: 85,
    },
    {
      id: 2,
      name: 'Иван Иванов',
      position: 'Барбер',
      rating: 4.8,
      reviews: 67,
    },
    {
      id: 3,
      name: 'Елена Козлова',
      position: 'Мастер маникюра',
      rating: 5.0,
      reviews: 92,
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Анна Иванова',
      rating: 5,
      date: '2024-11-20',
      comment:
        'Отличный салон! Мария - профессионал своего дела. Очень довольна результатом!',
      avatar: null,
    },
    {
      id: 2,
      author: 'Дмитрий Смирнов',
      rating: 5,
      date: '2024-11-18',
      comment: 'Хожу сюда уже год. Всегда качественно и быстро. Рекомендую!',
      avatar: null,
    },
    {
      id: 3,
      author: 'Елена Козлова',
      rating: 4,
      date: '2024-11-15',
      comment: 'Хороший салон, приятная атмосфера. Единственный минус - долго ждала.',
      avatar: null,
    },
  ];

  const availableSlots = [
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/map" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">К списку</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Info */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Cover Image */}
              <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <span className="text-6xl">💇</span>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {business.rating}
                        </span>
                        <span className="text-gray-600">
                          ({business.reviews} отзывов)
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {business.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{business.description}</p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Адрес</p>
                      <p className="font-medium text-gray-900">
                        {business.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Телефон</p>
                      <p className="font-medium text-gray-900">
                        {business.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Режим работы</p>
                      <p className="font-medium text-gray-900">
                        {business.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Сайт</p>
                      <a
                        href={`https://${business.website}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Услуги</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id.toString())}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition ${
                      selectedService === service.id.toString()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration} мин</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{service.staff}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {service.price}₽
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Наши мастера
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-2">
                      {member.position}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {member.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({member.reviews})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Отзывы</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Написать отзыв
                </button>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.author}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {new Date(review.date).toLocaleDateString(
                                  'ru-RU'
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Онлайн-запись
              </h3>

              {/* Step 1: Service */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  1. Выберите услугу
                </label>
                <select
                  value={selectedService || ''}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите услугу</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}₽
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Date */}
              {selectedService && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    2. Выберите дату
                  </label>
                  <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Step 3: Time */}
              {selectedService && selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    3. Выберите время
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 rounded-lg font-medium transition ${
                          selectedTime === slot
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {selectedService && selectedDate && selectedTime && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Итого:</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-900">
                      <span className="font-medium">Услуга:</span>{' '}
                      {
                        services.find((s) => s.id.toString() === selectedService)
                          ?.name
                      }
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Дата:</span>{' '}
                      {new Date(selectedDate).toLocaleDateString('ru-RU')}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Время:</span> {selectedTime}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Цена:</span>{' '}
                      {
                        services.find((s) => s.id.toString() === selectedService)
                          ?.price
                      }
                      ₽
                    </p>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                disabled={!selectedService || !selectedDate || !selectedTime}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Записаться
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями использования
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
