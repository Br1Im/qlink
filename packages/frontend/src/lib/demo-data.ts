// Демо-данные для тестирования системы

export const demoServices = [
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
];

export const demoStaff = [
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
];

export const demoClients = [
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
];

export const demoBookings = [
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
];

// ДЕМО-ДАННЫЕ УДАЛЕНЫ - ВСЕ ДАННЫЕ ТОЛЬКО ИЗ БД
// Эти функции оставлены для обратной совместимости, но ничего не делают

export function loadDemoData() {
  console.warn('Demo mode removed - all data from database only');
}

export function clearDemoData() {
  // Очищаем старые демо-данные если они есть
  if (typeof window !== 'undefined') {
    localStorage.removeItem('demo-mode');
    localStorage.removeItem('demo-type');
    localStorage.removeItem('demo-services');
    localStorage.removeItem('demo-staff');
    localStorage.removeItem('demo-clients');
    localStorage.removeItem('demo-bookings');
    localStorage.removeItem('qlink-staff');
    localStorage.removeItem('qlink-business-data');
    localStorage.removeItem('qlink-profile-data');
  }
}

export function isDemoMode(): boolean {
  return false; // Демо-режим отключен
}

export function getDemoData(_type: 'services' | 'staff' | 'clients' | 'bookings') {
  return []; // Всегда возвращаем пустой массив
}
