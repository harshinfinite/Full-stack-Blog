"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const ProfileEditor = ({user}) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleSave= async() => {
    setLoading(true);
    try{
      const req = await fetch("/api/user",{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,bio,avatar})
      })
      if(!req.ok) return alert('Failed to Update')
      if(req.ok) router.refresh()
    }catch(error){
      alert("Network Error")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
      <input type="text" placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)}/>
      <input type="text" placeholder='Avatar URL' value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default ProfileEditor
