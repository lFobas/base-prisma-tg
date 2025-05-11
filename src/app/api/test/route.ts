import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const resp = "ok from dummy route";
    return NextResponse.json(resp)
}