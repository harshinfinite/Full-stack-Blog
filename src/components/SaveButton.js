'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import React from 'react'

const SaveButton = ({ postId,isSaved }) => {

  const { data: session } = useSession()
  const router = useRouter();

  const [initialSaved, setInitialSaved] = useState(isSaved)

  const handleSave = async () => {
    if (!session) {
      router.push('/login')
      return
    };
    const response = await fetch(`/api/post/${postId}/saved`,{
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) return
    const data = await response.json();
    setInitialSaved(data.saved)


  }
  return (
    <>
    <button aria-label="Save post" className="opacity-60 hover:opacity-100 hover:text-primary transition-all rounded-full p-2 hover:bg-border"
    onClick={handleSave}>
      <svg className="w-5 h-5" fill={!initialSaved ? "none" : "currentColor"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
    </>
  )
}

export default SaveButton
