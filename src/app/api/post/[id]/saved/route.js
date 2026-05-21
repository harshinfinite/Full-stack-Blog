import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export async function POST(request, { params }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 })
        const { id: rawId } = await params;
    const id = parseInt(rawId);
    let alreadySaved;
    try {

        alreadySaved = await prisma.saved.findUnique({
            where: {
                userId_postId: {
                    userId: parseInt(session.user.id),
                    postId: id
                }
            }
        })

        if(!alreadySaved){
            await prisma.saved.create({
                data:{
                    userId : parseInt(session.user.id),
                    postId : id
                }
            })
        }else{
            await prisma.saved.delete({
                where:{
                    userId_postId:{
                        userId : parseInt(session.user.id),
                        postId : id
                    }
                }
            })
        }
    } catch (error) {
        return NextResponse.json({ error: "Something Went wrong!" }, { status: 500 })
    }

    return (
        NextResponse.json({saved:!alreadySaved},{status:200})
    )
}