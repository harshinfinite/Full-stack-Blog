"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProfileEditor({ user }) {
  const avatarInputRef = useRef(null)
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false)
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatar }),
      });
      if (!req.ok) return alert("Failed to update profile");
      router.refresh();
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  async function handleAvatarUpload(e) {
    setUploading(true)
   try{
     const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'avatar')
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const url = await response.json()
    setAvatar(url)
   }catch(error){
    alert("Image Upload Failed ! , try again")
   }finally{

     setUploading(false)
   }
  }

  return (
    <div className="space-y-4">
      {/* Avatar Preview */}
      <div className="flex items-center gap-4 mb-2">
        <img
          src={avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-border"
        />
        <div>
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="text-xs opacity-50">{user.email}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold opacity-60 mb-1 uppercase tracking-wide">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold opacity-60 mb-1 uppercase tracking-wide">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell readers about yourself..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold opacity-60 mb-1 uppercase tracking-wide">
            Avatar 
          </label>
          <div className="w-full h-10 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-sm opacity-60 hover:opacity-100"
            onClick={() => avatarInputRef.current.click()}>
            <input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={handleAvatarUpload} />
            Upload Avatar
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading || uploading}
        className="w-full py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm mt-2"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}