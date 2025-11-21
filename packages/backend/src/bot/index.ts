import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';

const BOT_TOKEN = process.env.BOT_TOKEN || '7804503108:AAFuzWxxxMsWhm-041Ea5ULTTkiOFeDOAj0';

const bot = new Telegraf(BOT_TOKEN);

// Middleware для логирования
bot.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`Response time: ${ms}ms`);
});

// Команда /start
bot.command('start', async (ctx) => {
  const userName = ctx.from.first_name;
  
  await ctx.reply(
    `👋 Привет, ${userName}!\n\n` +
    `Добро пожаловать в Qlink - систему онлайн-записи.\n\n` +
    `Я помогу вам:\n` +
    `📅 Записаться в салон красоты, барбершоп или другое заведение\n` +
    `🔍 Найти заведения рядом с вами\n` +
    `📋 Управлять вашими записями\n\n` +
    `Выберите действие:`,
    Markup.keyboard([
      ['🔍 Найти заведение', '📋 Мои записи'],
      ['⚙️ Настройки', '❓ Помощь']
    ]).resize()
  );
});

// Поиск заведений
bot.hears('🔍 Найти заведение', async (ctx) => {
  await ctx.reply(
    'Выберите категорию заведения:',
    Markup.keyboard([
      ['💇 Красота', '💊 Медицина'],
      ['💪 Спорт', '🚗 Авто'],
      ['🛠️ Бытовые услуги', '🎉 Досуг'],
      ['◀️ Назад']
    ]).resize()
  );
});

// Мои записи
bot.hears('📋 Мои записи', async (ctx) => {
  // TODO: Получить записи пользователя из БД
  await ctx.reply(
    '📋 Ваши записи:\n\n' +
    '1. Салон "Красота"\n' +
    '   📅 25 ноября, 14:00\n' +
    '   ✂️ Стрижка женская\n' +
    '   💰 1500 ₽\n\n' +
    '2. Барбершоп "Стиль"\n' +
    '   📅 28 ноября, 16:30\n' +
    '   ✂️ Стрижка + борода\n' +
    '   💰 2000 ₽',
    Markup.inlineKeyboard([
      [Markup.button.callback('Отменить запись', 'cancel_booking')],
      [Markup.button.callback('Перенести запись', 'reschedule_booking')]
    ])
  );
});

// Категории
bot.hears('💇 Красота', async (ctx) => {
  await ctx.reply(
    '💇 Салоны красоты рядом с вами:\n\n' +
    '1. Салон "Красота"\n' +
    '   ⭐ 4.9 (120 отзывов)\n' +
    '   📍 Москва, ул. Тверская, 10\n' +
    '   💰 от 1000 ₽\n\n' +
    '2. Beauty Studio\n' +
    '   ⭐ 4.8 (95 отзывов)\n' +
    '   📍 Москва, ул. Арбат, 25\n' +
    '   💰 от 1500 ₽',
    Markup.inlineKeyboard([
      [Markup.button.callback('Салон "Красота"', 'salon_1')],
      [Markup.button.callback('Beauty Studio', 'salon_2')],
      [Markup.button.callback('Показать на карте', 'show_map')]
    ])
  );
});

// Обработка выбора салона
bot.action(/salon_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    '💇 Салон "Красота"\n\n' +
    '⭐ 4.9 (120 отзывов)\n' +
    '📍 Москва, ул. Тверская, 10\n' +
    '🕐 Пн-Вс: 9:00 - 21:00\n' +
    '📞 +7 (495) 123-45-67\n\n' +
    'Услуги:\n' +
    '✂️ Стрижка женская - 1500 ₽\n' +
    '✂️ Стрижка мужская - 800 ₽\n' +
    '🎨 Окрашивание - 3000 ₽\n' +
    '💅 Маникюр - 1200 ₽',
    Markup.inlineKeyboard([
      [Markup.button.callback('📅 Записаться', 'book_salon_1')],
      [Markup.button.callback('📸 Фото работ', 'photos_salon_1')],
      [Markup.button.callback('💬 Отзывы', 'reviews_salon_1')],
      [Markup.button.callback('◀️ Назад', 'back_to_list')]
    ])
  );
});

// Процесс записи
bot.action(/book_salon_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    'Выберите услугу:',
    Markup.inlineKeyboard([
      [Markup.button.callback('✂️ Стрижка женская - 1500 ₽', 'service_1')],
      [Markup.button.callback('✂️ Стрижка мужская - 800 ₽', 'service_2')],
      [Markup.button.callback('🎨 Окрашивание - 3000 ₽', 'service_3')],
      [Markup.button.callback('💅 Маникюр - 1200 ₽', 'service_4')],
      [Markup.button.callback('◀️ Назад', 'back_to_salon')]
    ])
  );
});

// Выбор услуги
bot.action(/service_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    'Выберите дату:',
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Сегодня', 'date_today'),
        Markup.button.callback('Завтра', 'date_tomorrow')
      ],
      [
        Markup.button.callback('25 ноября', 'date_25'),
        Markup.button.callback('26 ноября', 'date_26')
      ],
      [
        Markup.button.callback('27 ноября', 'date_27'),
        Markup.button.callback('28 ноября', 'date_28')
      ],
      [Markup.button.callback('◀️ Назад', 'back_to_services')]
    ])
  );
});

// Выбор даты
bot.action(/date_(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    'Выберите время:',
    Markup.inlineKeyboard([
      [
        Markup.button.callback('10:00', 'time_10'),
        Markup.button.callback('11:00', 'time_11'),
        Markup.button.callback('12:00', 'time_12')
      ],
      [
        Markup.button.callback('14:00', 'time_14'),
        Markup.button.callback('15:00', 'time_15'),
        Markup.button.callback('16:00', 'time_16')
      ],
      [
        Markup.button.callback('17:00', 'time_17'),
        Markup.button.callback('18:00', 'time_18'),
        Markup.button.callback('19:00', 'time_19')
      ],
      [Markup.button.callback('◀️ Назад', 'back_to_dates')]
    ])
  );
});

// Подтверждение записи
bot.action(/time_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  
  await ctx.reply(
    '✅ Подтвердите запись:\n\n' +
    '💇 Салон "Красота"\n' +
    '📍 Москва, ул. Тверская, 10\n' +
    '✂️ Стрижка женская\n' +
    '📅 25 ноября, 14:00\n' +
    '💰 1500 ₽\n\n' +
    'Пожалуйста, укажите ваш номер телефона для подтверждения:',
    Markup.keyboard([
      [Markup.button.contactRequest('📱 Отправить номер телефона')],
      ['◀️ Отмена']
    ]).resize()
  );
});

// Получение контакта
bot.on(message('contact'), async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  
  await ctx.reply(
    '✅ Запись успешно создана!\n\n' +
    '💇 Салон "Красота"\n' +
    '📍 Москва, ул. Тверская, 10\n' +
    '✂️ Стрижка женская\n' +
    '📅 25 ноября, 14:00\n' +
    '💰 1500 ₽\n' +
    `📱 ${phone}\n\n` +
    '🔔 Мы отправим вам напоминание за 1 час до визита.\n\n' +
    'Хорошего дня! 😊',
    Markup.keyboard([
      ['🔍 Найти заведение', '📋 Мои записи'],
      ['⚙️ Настройки', '❓ Помощь']
    ]).resize()
  );
});

// Настройки
bot.hears('⚙️ Настройки', async (ctx) => {
  await ctx.reply(
    '⚙️ Настройки:\n\n' +
    'Выберите параметр:',
    Markup.inlineKeyboard([
      [Markup.button.callback('🔔 Уведомления', 'settings_notifications')],
      [Markup.button.callback('📍 Мой город', 'settings_city')],
      [Markup.button.callback('🌍 Язык', 'settings_language')],
      [Markup.button.callback('◀️ Назад', 'back_to_main')]
    ])
  );
});

// Помощь
bot.hears('❓ Помощь', async (ctx) => {
  await ctx.reply(
    '❓ Помощь\n\n' +
    'Как пользоваться ботом:\n\n' +
    '1️⃣ Нажмите "🔍 Найти заведение"\n' +
    '2️⃣ Выберите категорию\n' +
    '3️⃣ Выберите заведение из списка\n' +
    '4️⃣ Выберите услугу, дату и время\n' +
    '5️⃣ Подтвердите запись\n\n' +
    'Если у вас возникли вопросы, напишите нам: @qlink_support',
    Markup.keyboard([
      ['🔍 Найти заведение', '📋 Мои записи'],
      ['⚙️ Настройки', '❓ Помощь']
    ]).resize()
  );
});

// Кнопка "Назад"
bot.hears('◀️ Назад', async (ctx) => {
  await ctx.reply(
    'Главное меню:',
    Markup.keyboard([
      ['🔍 Найти заведение', '📋 Мои записи'],
      ['⚙️ Настройки', '❓ Помощь']
    ]).resize()
  );
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
  ctx.reply('Произошла ошибка. Попробуйте позже.');
});

export default bot;
