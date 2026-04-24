import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request, { params }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    try {
        const existLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: parseInt(session.user.id),
                    postId: id
                }
            }
        })
        if (!existLike) {
            await prisma.like.create({
                data: {
                    userId: parseInt(session.user.id),
                    postId: id
                }
            })
        } else {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId: parseInt(session.user.id),
                        postId: id
                    }
                }
            })
        }
        return NextResponse.json({ liked: !existLike }, { status: 200 })
    }catch(error){
        return NextResponse.json({error:"Something Went wrong!"},{status:500})
    }
    
}