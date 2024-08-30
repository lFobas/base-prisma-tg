import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Обробка команди /start
bot.start((ctx) => {
  ctx.reply('Привіт! Я ваш Telegram бот. Використовуйте /help для отримання списку команд.');
});

// Обробка команди /help
bot.help((ctx) => {
  ctx.reply('Доступні команди:\n/start - Почати роботу\n/help - Отримати допомогу\n/getinfo - Отримати інформацію\n/app - Відкрити Таблиці Боржників');
});

// Обробка команди /getinfo
bot.command('getinfo', (ctx) => {
  const { id, first_name } = ctx.from;
  const info = `Ваше ім'я: ${first_name}\nВаш ID: ${id}`;
  ctx.reply(info);
});

// Обробка команди /app
bot.command('app', (ctx) => {
  const miniAppUrl = 'https://t.me/beregtvinfobot/baza';
  const markup = Markup.inlineKeyboard([
    Markup.button.url('Відкрити Борги', miniAppUrl),
  ]);
  ctx.reply('Натисніть на кнопку, щоб відкрити Mini App:', markup);
});

// Обробка будь-якого текстового повідомлення
bot.on('text', (ctx) => {
  ctx.reply('Привіт! Я ваш Telegram бот. Використовуйте /help для отримання списку команд.');
});

export const handleTelegramUpdate = async (body) => {
  await bot.handleUpdate(body);
};
