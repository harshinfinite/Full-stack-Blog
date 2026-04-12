import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import EditEditor from "@/components/EditEditor";

export default async function postEditor({ params }) {
    const { id: rawId } = await params;
    const id = parseInt(rawId)
    const session = await auth();
    if (!session) redirect('/')

    const post = await prisma.post.findUnique({
        where: { id }

    })
    if (!post) return notFound()

    if (post.authorId !== parseInt(session.user.id)) redirect('/dashboard')

    return (
        <div>
            <EditEditor post={post} />
        </div>
    )
}