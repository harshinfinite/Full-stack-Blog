import React from 'react'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation';
import ProfileEditor from '@/components/ProfileEditor';
import PostManager from '@/components/PostManager';


export default async function Dashboard() {
    const session = await auth();
    if (!session) {
        redirect("/login")
    }
    const posts = await prisma.post.findMany({
        where:{authorId: parseInt(session.user.id)},
        orderBy: {createdAt : "desc"},
        include: {_count:{select:{comments:true}}}
    })
    const user = await prisma.user.findUnique({
      where: {id: parseInt(session.user.id)}
    })

    const handleDelete = (postId) => {
      confirm.alert("Sure to delete this Post")
    }

  return (
    <div>
      <ProfileEditor user={user} />
      <PostManager posts={posts} />
    </div>
  )
}

