import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { searchName } = await request.json();
    console.log("Received searchName:", searchName);
    
    if (!searchName) {
      return NextResponse.json({ error: "не вказано імя" }, { status: 400 });
    }
    const responseId = await prisma.client.findUnique({
      where: { name: searchName },
      select: { id: true },
    });
    return NextResponse.json({ id: responseId ? responseId.id : null });
  } catch (error) {
    console.error("Error in POST /api/1csync/getidbyname:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
