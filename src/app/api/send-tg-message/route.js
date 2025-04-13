import { Telegraf } from "telegraf";
import { NextResponse } from "next/server";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export async function POST(request) {
  try {
    const { chatId, message } = await request.json();

    if (!chatId || !message) {
      return NextResponse.json({ error: "chatId і message обов'язкові" }, { status: 400 });
    }

    await bot.telegram.sendMessage(chatId, message);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Telegram Error:", error);
    return NextResponse.json({ error: "Не вдалося надіслати повідомлення" }, { status: 500 });
  }
}
