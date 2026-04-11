import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request,{params}) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const {id:rawId} = await params;
    const id = parseInt(rawId);

    const post = await prisma.post.findUnique({
        where: { id},
    });
    if (post.authorId !== parseInt(session.user.id)) return NextResponse.json({ error: "Not Author" }, { status: 403 });

    await prisma.comment.deleteMany({
        where:{postId:id}
    })

    await prisma.post.delete({
        where: { id }
    })

    return NextResponse.json({success:true},{status: 200})

}