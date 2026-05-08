"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfileHeader({ username, initialIsFollowing, initialFollowersCount , user}) {

    const {data:session} = useSession()

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followersCount, setFollowersCount] = useState(initialFollowersCount);

    const [isLoading, setIsLoading] = useState(false)


    async function handleFollow() {

        setIsLoading(true)

        try {
            const response = await fetch(`/api/user/${username}/follow`, {
                method: "POST"
            })
            if (!response.ok) {
                alert('Something went wrong')
                return
            }
            const { followed } = await response.json();
            setIsFollowing(followed)
            if (!followed) {
                setFollowersCount(prev => prev - 1)
            } else {
                setFollowersCount(prev => prev + 1)
            }
        } catch (error) {
            alert('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    
    return (
        <section className="pt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-border pb-12">
                <div className="relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface shadow-xl shadow-primary/10 object-cover"
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">{user.name}</h1>
                            <p className="text-primary font-medium">{user.username}</p>
                        </div>
    
    
                        <button className="px-8 py-2.5 bg-foreground text-background font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm mx-auto md:mx-0"
                            disabled={isLoading || session?.user?.username === username}
                            onClick={handleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
    
                    </div>
    
                    <p className="text-lg opacity-80 mb-6 leading-relaxed max-w-2xl">
                        {user.bio}
                    </p>
    
                    <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-medium opacity-70">
                        <span className="flex items-center gap-2">
                            <span className="text-foreground text-base">{followersCount}</span> Followers
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-foreground text-base">{user._count.following}</span> Following
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )

}
