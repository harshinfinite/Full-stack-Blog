"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SearchingBar = () => {
    const router = useRouter();
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        if(!query.trim()) return ;
        router.push(`/search?q=${query}`)
    }
    return (
        <div className="flex items-center gap-3 max-w-xl mx-auto mb-10">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key==="Enter" && handleSearch()}
                placeholder="Search stories..."
                className="flex-1 px-5 py-3 rounded-full border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button className="px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover transition-all"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}

export default SearchingBar
