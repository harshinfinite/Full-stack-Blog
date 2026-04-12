"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const { data: session } = useSession()

  useEffect(() => {
    // Check initial theme from HTML class or default to light
    const isDark = document.documentElement.classList.contains("dark");
    // Use setTimeout to prevent React Compiler synchronous setState error
    setTimeout(() => {
      setTheme(isDark ? "dark" : "light");
    }, 0);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };

  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
              Blog Platform
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/editor" className="text-sm font-medium hover:text-primary transition-colors">
                  Write
                </Link>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-hover transition-colors">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-hover transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )
            }
            <button
              onClick={toggleTheme}
              className="ml-2 w-10 h-10 rounded-full bg-border flex items-center justify-center hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
