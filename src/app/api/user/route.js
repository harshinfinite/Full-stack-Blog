import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(request){
    const session = await auth();
    const {name,bio,avatar}  =  await request.json();
    const updatedUser = await prisma.user.update({
        where:{id:parseInt(session.user.id)},
        data:{name, bio , avatar}
    });
    return NextResponse.json(updatedUser,{status:200})
}
