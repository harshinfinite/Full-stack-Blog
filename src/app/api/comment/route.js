import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (request) {
    const session = await auth()
    if(!session) return  NextResponse.json({error:'Not authenticated'},{status: 401})

    const {content,postId} = await request.json();

    if(!content) return NextResponse.json({error: "Content required"},{status: 400});

    const comment = await prisma.comment.create({
        data: {
            content,
            post : { connect : {id: postId}},
            user : { connect : {id: parseInt(session.user.id)}}
        }
    });
    return NextResponse.json(comment,{status:201})
}