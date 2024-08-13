// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }){
    
//     const { id } = params
//     const client = await prisma.client.findUnique({
//         where: {
//           id,
//         },
//         include: {
//             records: true,
//           },
//       })


//     return NextResponse.json({ client });
// }

// export async function PUT(req, { params }){
//     const { id } = params
//     const data = await req.json();
//     try {
//         await prisma.client.update({
//             where: {
//                 id: id
//             },
//             data: data
//         })
//     } catch (error) {
//         console.error(error);
    
//     }
//     return NextResponse.json({  });
// }

