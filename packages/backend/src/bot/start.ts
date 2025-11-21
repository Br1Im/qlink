import 'dotenv/config';
import bot from './index';

// Запуск бота в polling режиме (для разработки)
bot.launch().then(() => {
  console.log('🤖 Qlink Bot запущен!');
  console.log('Бот готов к работе...');
  console.log('Нажмите Ctrl+C для остановки');
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
