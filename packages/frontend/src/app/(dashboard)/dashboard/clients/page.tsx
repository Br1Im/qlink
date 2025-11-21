'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Star,
  MoreVertical,
} from 'lucide-react';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Загружаем данные (демо или пустые)
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const loadDemoData = async () => {
      if (typeof window !== 'undefined') {
        const isDemoMode = localStorage.getItem('demo-mode') === 'true';
        const demoType = localStorage.getItem('demo-type') || 'beauty';
        
        if (isDemoMode) {
          try {
            const { getDemoAccount } = await import('@/lib/demo-accounts');
            const account = getDemoAccount(demoType as any);
            setClients(account.clients);
          } catch (error) {
            setClients([
          {
            id: 1,
            name: 'Анна Иванова',
            phone: '+7 (999) 123-45-67',
            email: 'anna@example.com',
            avatar: null,
            totalBookings: 12,
            totalSpent: 18000,
            lastVisit: '2024-11-20',
            rating: 5,
            tags: ['VIP', 'Постоянный'],
          },
          {
            id: 2,
            name: 'Дмитрий Смирнов',
            phone: '+7 (999) 234-56-78',
            email: 'dmitry@example.com',
            avatar: null,
            totalBookings: 5,
            totalSpent: 10000,
            lastVisit: '2024-11-18',
            rating: 4,
            tags: ['Постоянный'],
          },
          {
            id: 3,
            name: 'Елена Козлова',
            phone: '+7 (999) 345-67-89',
            email: 'elena@example.com',
            avatar: null,
            totalBookings: 1,
            totalSpent: 3000,
            lastVisit: '2024-11-15',
            rating: 5,
            tags: ['Новый'],
          },
          {
            id: 4,
            name: 'Сергей Петров',
            phone: '+7 (999) 456-78-90',
            email: 'sergey@example.com',
            avatar: null,
            totalBookings: 8,
            totalSpent: 12000,
            lastVisit: '2024-11-19',
            rating: 5,
            tags: ['VIP'],
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
          <h1 className="text-3xl font-bold text-gray-900">Клиенты</h1>
          <p className="text-gray-600 mt-2">База клиентов и CRM</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Добавить клиента</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего клиентов</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{clients.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Новых за месяц</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний чек</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">0₽</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний рейтинг</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, телефону или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Все теги</option>
            <option value="vip">VIP</option>
            <option value="regular">Постоянный</option>
            <option value="new">Новый</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Сортировка</option>
            <option value="name">По имени</option>
            <option value="visits">По визитам</option>
            <option value="spent">По сумме</option>
            <option value="date">По дате</option>
          </select>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="divide-y divide-gray-200">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-6 hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {client.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </div>

                  {/* Client Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {client.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {client.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{client.email}</span>
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {client.totalBookings}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Визитов</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {client.totalSpent.toLocaleString()}₽
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Потрачено</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <p className="text-2xl font-bold text-gray-900">
                          {client.rating}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Рейтинг</p>
                    </div>
                  </div>

                  {/* Last Visit */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Последний визит</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(client.lastVisit).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition ml-4">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Показано 1-10 из 1,234 клиентов</p>
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
    </div>
  );
}
