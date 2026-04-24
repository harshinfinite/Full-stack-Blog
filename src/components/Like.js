"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React from 'react'

const Like = ({postId , initialCount ,initialLiked}) => {

    const {data:session} = useSession()
    const router = useRouter();

    const [initCount, setInitCount] = useState(initialCount);
    const [initLiked , setInitLiked] = useState(initialLiked)

    const handleLike = async () => {

        if(!session){
            router.push("/login")
            return
        };
        const response = await fetch(`/api/post/${postId}/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        if(!response.ok) return;
        const data = await response.json();
        if(data.liked){
            setInitCount(prev => prev + 1)
        }else{setInitCount(prev => prev - 1)}

        setInitLiked(data.liked)

    }
    return (
        <>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn"
                onClick={handleLike}>
                <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill={!initLiked ? "none" : "currentColor"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {initCount}
            </button>
        </>
    )
}

export default Like
