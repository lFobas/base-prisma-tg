import { NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.on('text', (ctx) => {
  ctx.reply('Привіт! Це відповідь від вашого Telegram бота.');
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    await bot.handleUpdate(body); // Передача запиту до Telegraf для обробки

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
