// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET (){
//     // const data = await request.json()
//     const res = await prisma.record.findMany({
//         where:{
//             authorId: "НЕРОЗНЕСЕНИЙ"
//         }
//     })
//     // const res = [{
//     //     id: "cm0l2jufq0002vq9zns68awqg",
//     //     date: "2021-08-11T00:00:00.000Z",
//     //     summa: "115",
//     //     description: "сурняк ч гагарін 9 156 ",
//     //     authorId: "Сурняк Чобо"
//     // },
//     // {
//     //     id: "cm0l2jufq0003vq9zdideybvf",
//     //     date: "2021-08-11T00:00:00.000Z",
//     //     summa: "115",
//     //     description: "сурняк ч гагарін 9 156 ",
//     //     authorId: "Сурняк Чобо"
//     // }]
//     return NextResponse.json({ res });

// }