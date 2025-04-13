'use server'

import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);


export async function sendTelegramMessage(message) {
  
  const chatId = process.env.TELEGRAM_MY_ID;
  
  if (!chatId || !message) return;

  try {
    await bot.telegram.sendMessage(chatId, message);
  } catch (err) {
    console.error("Telegram error:", err);
  }
}

// Обробка команди /start
bot.start((ctx) => {
  ctx.reply(
    "Привіт! Я ваш Telegram бот. Використовуйте /help для отримання списку команд."
  );
});

// Обробка команди /help
bot.help((ctx) => {
  ctx.reply(
    "Доступні команди:\n/start - Почати роботу\n/help - Отримати допомогу\n/getinfo - Отримати інформацію\n/app - Відкрити Таблиці Боржників"
  );
});

// Обробка команди /getinfo
bot.command("getinfo", (ctx) => {
  const { id: userId, first_name } = ctx.from;
  const chatId = ctx.chat.id;

  const info = `Ваше ім'я: ${first_name}\nВаш User ID: ${userId}\nВаш Chat ID: ${chatId}`;
  ctx.reply(info);
});


// Обробка команди /app
bot.command("app", (ctx) => {
  const miniAppUrl = "https://t.me/beregtvinfobot/baza";
  const markup = Markup.inlineKeyboard([
    Markup.button.url("Відкрити Борги", miniAppUrl),
  ]);
  ctx.reply("Натисніть на кнопку, щоб відкрити Mini App:", markup);
});

// Обробка будь-якого текстового повідомлення
bot.on("text", (ctx) => {
  ctx.reply(
    "Привіт! Я ваш Telegram бот. Використовуйте /help для отримання списку команд."
  );
});

export const handleTelegramUpdate = async (body) => {
  await bot.handleUpdate(body);
};
