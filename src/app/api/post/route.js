import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const session = await auth()
    if(!session) return NextResponse.json({error : "Not Authenticated"},{status:401})
    const {title,content,status} = await request.json();

    if (!title || !content)
        return NextResponse.json({error: "Title and Content required"},{status: 400});
    

    const post = await prisma.post.create({
        data : {
            title,
            content,
            status: status || "DRAFT",
            author : {connect:{id : parseInt(session.user.id)}}
        }
    })
    
    return NextResponse.json(post,{status:201})
}