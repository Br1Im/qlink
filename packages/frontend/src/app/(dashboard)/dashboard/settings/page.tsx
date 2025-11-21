'use client';

import { useState } from 'react';
import {
  Building,
  User,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Clock,
  MapPin,
  Phone,
  Mail,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', name: 'Бизнес', icon: Building },
    { id: 'profile', name: 'Профиль', icon: User },
    { id: 'notifications', name: 'Уведомления', icon: Bell },
    { id: 'billing', name: 'Оплата', icon: CreditCard },
    { id: 'security', name: 'Безопасность', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-2">Управление настройками бизнеса</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'business' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Информация о бизнесе
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название заведения
                  </label>
                  <input
                    type="text"
                    defaultValue="Салон Красота"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Красота</option>
                    <option>Медицина</option>
                    <option>Спорт</option>
                    <option>Авто</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  rows={4}
                  defaultValue="Современный салон красоты в центре города"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Телефон</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue="+7 (495) 123-45-67"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    defaultValue="info@salon.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Адрес</span>
                </label>
                <input
                  type="text"
                  defaultValue="Москва, ул. Тверская, 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Рабочее время</span>
                </label>
                <div className="space-y-3">
                  {[
                    'Понедельник',
                    'Вторник',
                    'Среда',
                    'Четверг',
                    'Пятница',
                    'Суббота',
                    'Воскресенье',
                  ].map((day) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-32">
                        <span className="text-sm text-gray-700">{day}</span>
                      </div>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-600">—</span>
                      <input
                        type="time"
                        defaultValue="21:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Выходной</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Сохранить изменения</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Личная информация
                </h2>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                  ИИ
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                    Изменить фото
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    JPG, PNG. Максимум 5MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    defaultValue="Иван"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    defaultValue="Иванов"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="ivan@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    defaultValue="+7 (999) 123-45-67"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Сохранить изменения</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Настройки уведомлений
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Новые записи',
                    description: 'Уведомления о новых записях клиентов',
                  },
                  {
                    title: 'Отмены записей',
                    description: 'Уведомления об отмене записей',
                  },
                  {
                    title: 'Новые отзывы',
                    description: 'Уведомления о новых отзывах',
                  },
                  {
                    title: 'Напоминания',
                    description: 'Напоминания о предстоящих записях',
                  },
                  {
                    title: 'Маркетинг',
                    description: 'Новости и специальные предложения',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Подписка и оплата
                </h2>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90">Текущий тариф</p>
                    <p className="text-2xl font-bold mt-1">Professional</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">2,990₽</p>
                    <p className="text-sm opacity-90">в месяц</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Следующее списание: 25 декабря 2024
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Free', price: 0, features: ['До 50 записей', 'Базовая поддержка'] },
                  { name: 'Basic', price: 1490, features: ['До 200 записей', 'Email поддержка'] },
                  { name: 'Professional', price: 2990, features: ['Безлимит записей', 'Приоритетная поддержка'] },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mb-4">
                      {plan.price}₽
                      <span className="text-sm text-gray-600 font-normal">
                        /мес
                      </span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <span className="mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Выбрать
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Безопасность
                </h2>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Изменить пароль
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Текущий пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Новый пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Подтвердите пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Обновить пароль
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Двухфакторная аутентификация
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Добавьте дополнительный уровень безопасности к вашему аккаунту
                </p>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Включить 2FA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
