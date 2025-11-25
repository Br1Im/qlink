import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создаем тестовый аккаунт для входа
  const testPassword = await bcrypt.hash('Test123456', 10);
  const testOwner = await prisma.businessOwner.upsert({
    where: { email: 'test@qlink.tech' },
    update: {},
    create: {
      email: 'test@qlink.tech',
      phone: '+79991234567',
      password: testPassword,
      firstName: 'Тест',
      lastName: 'Тестов',
      company: 'Тестовая Компания',
      isVerified: true,
    },
  });

  console.log('✅ Создан тестовый аккаунт:', testOwner.email);
  console.log('   Email: test@qlink.tech');
  console.log('   Пароль: Test123456');

  // Создаем владельца бизнеса
  const ownerPassword = await bcrypt.hash('Owner123456', 10);
  const owner = await prisma.businessOwner.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      email: 'owner@example.com',
      phone: '+79991234568',
      password: ownerPassword,
      firstName: 'Иван',
      lastName: 'Иванов',
      company: 'ООО "Красота"',
      isVerified: true,
    },
  });

  console.log('✅ Создан владелец:', owner.email);

  // Создаем бизнес
  const business = await prisma.business.create({
    data: {
      ownerId: owner.id,
      name: 'Салон "Красота"',
      slug: 'salon-krasota',
      description: 'Современный салон красоты в центре Москвы',
      category: 'BEAUTY',
      phone: '+74951234567',
      email: 'info@salon-krasota.ru',
      address: 'Москва, ул. Тверская, 10',
      city: 'Москва',
      country: 'Russia',
      latitude: 55.7558,
      longitude: 37.6173,
      workingHours: {
        monday: { open: '09:00', close: '21:00' },
        tuesday: { open: '09:00', close: '21:00' },
        wednesday: { open: '09:00', close: '21:00' },
        thursday: { open: '09:00', close: '21:00' },
        friday: { open: '09:00', close: '21:00' },
        saturday: { open: '10:00', close: '20:00' },
        sunday: { open: '10:00', close: '18:00' },
      },
      rating: 4.9,
      reviewCount: 120,
      isActive: true,
      isVerified: true,
    },
  });

  console.log('✅ Создан бизнес:', business.name);

  // Создаем сотрудников
  const staff1 = await prisma.staff.create({
    data: {
      businessId: business.id,
      firstName: 'Мария',
      lastName: 'Петрова',
      position: 'Старший мастер',
      bio: 'Опыт работы более 10 лет',
      workingHours: {
        monday: { open: '10:00', close: '19:00' },
        tuesday: { open: '10:00', close: '19:00' },
        wednesday: { open: '10:00', close: '19:00' },
        thursday: { open: '10:00', close: '19:00' },
        friday: { open: '10:00', close: '19:00' },
        saturday: { open: '11:00', close: '18:00' },
        sunday: { open: '', close: '' },
      },
      rating: 4.9,
      reviewCount: 85,
      isActive: true,
    },
  });

  const staff2 = await prisma.staff.create({
    data: {
      businessId: business.id,
      firstName: 'Анна',
      lastName: 'Сидорова',
      position: 'Мастер',
      bio: 'Специалист по окрашиванию',
      workingHours: {
        monday: { open: '11:00', close: '20:00' },
        tuesday: { open: '11:00', close: '20:00' },
        wednesday: { open: '11:00', close: '20:00' },
        thursday: { open: '11:00', close: '20:00' },
        friday: { open: '11:00', close: '20:00' },
        saturday: { open: '10:00', close: '19:00' },
        sunday: { open: '', close: '' },
      },
      rating: 4.8,
      reviewCount: 67,
      isActive: true,
    },
  });

  console.log('✅ Созданы сотрудники:', staff1.firstName, staff2.firstName);

  // Создаем услуги
  const service1 = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Стрижка женская',
      description: 'Модельная стрижка с укладкой',
      category: 'Стрижки',
      price: 1500,
      duration: 90,
      isActive: true,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Окрашивание',
      description: 'Окрашивание волос профессиональными красками',
      category: 'Окрашивание',
      price: 3000,
      duration: 120,
      isActive: true,
    },
  });

  const service3 = await prisma.service.create({
    data: {
      businessId: business.id,
      name: 'Маникюр',
      description: 'Классический маникюр с покрытием',
      category: 'Ногтевой сервис',
      price: 1200,
      duration: 60,
      isActive: true,
    },
  });

  console.log('✅ Созданы услуги:', service1.name, service2.name, service3.name);

  // Связываем услуги с сотрудниками
  await prisma.serviceStaff.createMany({
    data: [
      { serviceId: service1.id, staffId: staff1.id },
      { serviceId: service1.id, staffId: staff2.id },
      { serviceId: service2.id, staffId: staff1.id },
      { serviceId: service3.id, staffId: staff2.id },
    ],
  });

  console.log('✅ Услуги связаны с сотрудниками');

  // Создаем тестового пользователя
  const user = await prisma.user.create({
    data: {
      phone: '+79991111111',
      firstName: 'Анна',
      lastName: 'Иванова',
      email: 'anna@example.com',
    },
  });

  console.log('✅ Создан пользователь:', user.firstName);

  // Создаем тестовую запись
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      businessId: business.id,
      serviceId: service1.id,
      staffId: staff1.id,
      date: new Date('2024-11-25'),
      startTime: '14:00',
      endTime: '15:30',
      price: 1500,
      status: 'CONFIRMED',
    },
  });

  console.log('✅ Создана запись на', booking.date);

  // Создаем отзыв
  const review = await prisma.review.create({
    data: {
      userId: user.id,
      businessId: business.id,
      rating: 5,
      comment: 'Отличный салон! Мария - профессионал своего дела!',
    },
  });

  console.log('✅ Создан отзыв с рейтингом', review.rating);

  console.log('🎉 База данных успешно заполнена!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
