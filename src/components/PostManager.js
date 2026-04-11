'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PostManager = ({ posts }) => {
    const router = useRouter();
    const handleDelete = async (postId) => {
        const confirmed = window.confirm("Are you sure You want to Delete this Post");
        if (!confirmed) return
        try {
            const post = await fetch(`/api/post/${postId}`, {
                method: "DELETE"
            })
            if (!post.ok) {
                alert("Failed to delete Post")
                return
            }
            router.refresh();
        } catch (error) {
            alert("Network error")
        }
    }
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    {/* Title */}
                    <h2>{post.title}</h2>
                    {/* Status badge — DRAFT gray, PUBLISHED green */}
                    <div>Status: {post.status}</div>
                    {/* Date */}
                    <div>{new Date(post.createdAt).toLocaleDateString("en-UN",{day:"numeric",month:"short",year:"numeric"})}</div>
                    {/* Comment count — post._count.comments */}
                    <div>{post._count.comments}</div>
                    {/* Edit button → Link to /editor/{post.id} */}
                    <Link href={`/editor/${post.id}`}></Link>
                    {/* Delete button → onClick={() => handleDelete(post.id)} */}
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default PostManager
