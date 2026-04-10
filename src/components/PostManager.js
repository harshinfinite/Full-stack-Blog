'use client'
import React from 'react'
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
            if(!post.ok){
                alert("Failed to delete Post")
                return
            }
            router.refresh();
        }catch(error){
            alert("Network error")
        }
    }
    return (
        <div>
            this is Dashboard
        </div>
    )
}

export default PostManager
