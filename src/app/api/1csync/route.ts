
import { NextResponse } from "next/server";
import { createRecords1C } from "../../../lib/actions";

export async function POST (request: Request) {
    try {
        const data = await request.json();
        const result = await createRecords1C(data);
        return NextResponse.json({ result });  
    } catch (error) {
        console.error("Error in POST /api/1csync:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}