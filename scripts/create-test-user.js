const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log('🔧 Создание тестового владельца бизнеса...');
    
    // Проверяем существует ли владелец
    const existingOwner = await prisma.businessOwner.findUnique({
      where: { email: 'test@qlink.tech' }
    });
    
    if (existingOwner) {
      console.log('✅ Тестовый владелец уже существует');
      console.log('📧 Email: test@qlink.tech');
      console.log('🔑 Password: Test123456');
      return;
    }
    
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash('Test123456', 10);
    
    // Создаем владельца бизнеса
    const owner = await prisma.businessOwner.create({
      data: {
        email: 'test@qlink.tech',
        password: hashedPassword,
        firstName: 'Тест',
        lastName: 'Пользователь',
        phone: '+79991234567',
        isVerified: true
      }
    });
    
    // Создаем бизнес для владельца
    const business = await prisma.business.create({
      data: {
        name: 'Тестовый Салон',
        slug: 'testovyy-salon',
        description: 'Тестовый салон красоты для демонстрации',
        category: 'BEAUTY',
        address: 'ул. Тестовая, 1',
        city: 'Москва',
        phone: '+74951234567',
        email: 'salon@qlink.tech',
        website: 'https://q-link.tech',
        ownerId: owner.id,
        isActive: true,
        isVerified: true,
        rating: 4.8,
        reviewCount: 25,
        workingHours: {
          monday: { open: '09:00', close: '21:00', isOpen: true },
          tuesday: { open: '09:00', close: '21:00', isOpen: true },
          wednesday: { open: '09:00', close: '21:00', isOpen: true },
          thursday: { open: '09:00', close: '21:00', isOpen: true },
          friday: { open: '09:00', close: '21:00', isOpen: true },
          saturday: { open: '10:00', close: '20:00', isOpen: true },
          sunday: { open: '10:00', close: '18:00', isOpen: true }
        }
      }
    });
    
    // Создаем несколько услуг
    await prisma.service.createMany({
      data: [
        {
          name: 'Стрижка женская',
          description: 'Профессиональная женская стрижка',
          price: 2500,
          duration: 60,
          businessId: business.id,
          isActive: true
        },
        {
          name: 'Окрашивание волос',
          description: 'Окрашивание волос профессиональными красками',
          price: 4500,
          duration: 120,
          businessId: business.id,
          isActive: true
        },
        {
          name: 'Маникюр',
          description: 'Классический маникюр с покрытием',
          price: 1800,
          duration: 90,
          businessId: business.id,
          isActive: true
        }
      ]
    });
    
    console.log('✅ Тестовый владелец бизнеса создан успешно!');
    console.log('');
    console.log('📧 Email: test@qlink.tech');
    console.log('🔑 Password: Test123456');
    console.log('🏢 Бизнес: Тестовый Салон');
    console.log('');
    console.log('Теперь вы можете войти в систему с этими данными!');
    
  } catch (error) {
    console.error('❌ Ошибка при создании тестового владельца:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
