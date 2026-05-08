import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request){
    const session = await auth();
    if(!session) return NextResponse.json({error:"Not Authenticated"},{status:401})
    const {name,bio,avatar}  =  await request.json();
    const updatedUser = await prisma.user.update({
        where:{id:parseInt(session.user.id)},
        data:{name, bio , avatar}
    });
    return NextResponse.json(updatedUser,{status:200})
}
