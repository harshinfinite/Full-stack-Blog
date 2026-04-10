'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CommentBox = ({postId}) => {
    const [textContent, setTextContent] = useState('')
    const [loading , setLoading] = useState(false)
    const router = useRouter();

    async function handleComment () {
        setLoading(true)
        try{
            const response = await fetch('/api/comment',{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body :JSON.stringify({
                    content: textContent,
                    postId
                })
            });
            if(response.ok) {
                setTextContent("")
                router.refresh()
            }
        }catch(errro){
            alert("Network error")
        }finally{
            setLoading(false);
        }

    }

    return (
        <div className="flex gap-4 mb-12">
            <img
                src="https://i.pravatar.cc/150?u=current_user"
                alt="Current User"
                className="w-10 h-10 rounded-full hidden sm:block border border-border"
            />
            <div className="flex-1 bg-surface border border-border rounded-xl flex flex-col focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all overflow-hidden">
                <textarea
                    className="w-full p-4 bg-transparent outline-none resize-none min-h-25 text-sm"
                    placeholder="What are your thoughts?" 
                    onChange={(e) => setTextContent(e.target.value)}
                    value={textContent}
                ></textarea>
                <div className="bg-background/50 p-2 flex justify-end border-t border-border">
                    <button className="px-5 py-2 bg-primary text-white text-sm justify-center font-semibold rounded-full hover:bg-primary-hover transition-colors flex items-center gap-2 select-none group"
                    onClick={handleComment}
                    disabled={loading}
                    >
                        {loading ? "Posting..." : "Comment"}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CommentBox
