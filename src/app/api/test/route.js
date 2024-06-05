import { nar } from "@/lib/nar";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (req, res){
    const data = nar
    //const cli = await prisma.record.createMany({data})
    // const cli = await prisma.record.create({data:{
    //     date: "2021-08-11T00:00:00Z",
    //     summa: 123,
    //     authorId: "Лакатош Пейтер",
    //     description :"лакотош й 324 Дерцен -  - 149                                               "

    // }})
    return NextResponse.json({ cli });

}