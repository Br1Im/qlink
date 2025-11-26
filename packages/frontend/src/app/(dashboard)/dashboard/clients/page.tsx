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
import { api } from '@/lib/api';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
    tags: [] as string[],
  });

  // Загружаем данные (демо или из localStorage)
  const [clients, setClients] = useState<any[]>([]);

  // Сохранение в localStorage при изменении
  // Загрузка клиентов из API
  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await api.getClients();
        setClients(data);
      } catch (error) {
        console.error('Ошибка загрузки клиентов:', error);
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    const loadDemoData = async () => {
      if (typeof window !== 'undefined') {
        // Сначала пытаемся загрузить из localStorage
        const savedClients = localStorage.getItem('qlink-clients');
        if (savedClients) {
          try {
            setClients(JSON.parse(savedClients));
            return;
          } catch (error) {
            console.error('Ошибка загрузки сохраненных клиентов:', error);
          }
        }
        
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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center space-x-2"
        >
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
                <button 
                  onClick={() => {
                    setEditingClient(client);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition ml-4"
                  title="Редактировать"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Показано 1-{clients.length} из {clients.length} клиентов</p>
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

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Добавить клиента</h2>
              <p className="text-gray-600 mt-1">Заполните информацию о новом клиенте</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
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
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
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
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Теги
                </label>
                <div className="flex flex-wrap gap-2">
                  {['VIP', 'Постоянный', 'Новый'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (newClient.tags.includes(tag)) {
                          setNewClient({
                            ...newClient,
                            tags: newClient.tags.filter((t) => t !== tag),
                          });
                        } else {
                          setNewClient({
                            ...newClient,
                            tags: [...newClient.tags, tag],
                          });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg border transition ${
                        newClient.tags.includes(tag)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewClient({
                    name: '',
                    phone: '',
                    email: '',
                    tags: [],
                  });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Отмена
              </button>
              <button
                onClick={async () => {
                  if (newClient.name && newClient.phone && newClient.email) {
                    setIsLoading(true);
                    try {
                      const { api } = await import('@/lib/api');
                      const result = await api.createClient({
                        name: newClient.name,
                        phone: newClient.phone,
                        email: newClient.email,
                        tags: newClient.tags.length > 0 ? newClient.tags : ['Новый'],
                      });
                      
                      if (result.success) {
                        const newClientData = {
                          id: result.client.id,
                          name: newClient.name,
                          phone: newClient.phone,
                          email: newClient.email,
                          avatar: null,
                          totalBookings: 0,
                          totalSpent: 0,
                          lastVisit: new Date().toISOString().split('T')[0],
                          rating: 0,
                          tags: newClient.tags.length > 0 ? newClient.tags : ['Новый'],
                        };
                        setClients([...clients, newClientData]);
                        setIsAddModalOpen(false);
                        setNewClient({
                          name: '',
                          phone: '',
                          email: '',
                          tags: [],
                        });
                      }
                    } catch (error: any) {
                      alert(error.message || 'Ошибка создания клиента');
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

      {/* Edit Client Modal */}
      {isEditModalOpen && editingClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Редактировать клиента</h2>
              <p className="text-gray-600 mt-1">Измените информацию о клиенте</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Теги
                </label>
                <div className="flex flex-wrap gap-2">
                  {['VIP', 'Постоянный', 'Новый'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (editingClient.tags.includes(tag)) {
                          setEditingClient({
                            ...editingClient,
                            tags: editingClient.tags.filter((t: string) => t !== tag),
                          });
                        } else {
                          setEditingClient({
                            ...editingClient,
                            tags: [...editingClient.tags, tag],
                          });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg border transition ${
                        editingClient.tags.includes(tag)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingClient(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  const updatedClients = clients.map(c => 
                    c.id === editingClient.id ? editingClient : c
                  );
                  setClients(updatedClients);
                  setIsEditModalOpen(false);
                  setEditingClient(null);
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
