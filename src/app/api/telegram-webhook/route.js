import { NextResponse } from 'next/server';
import { handleTelegramUpdate } from '@/lib/telegramBot';

export async function POST(request) {
  try {
    const body = await request.json();
    await handleTelegramUpdate(body);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}