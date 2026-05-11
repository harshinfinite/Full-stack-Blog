"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostManager({ posts }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    setDeletingId(postId);
    try {
      const res = await fetch(`/api/post/${postId}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete post");
        return;
      }
      router.refresh();
    } catch (error) {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 opacity-50">
        <p className="text-lg font-semibold">No posts yet</p>
        <p className="text-sm mt-1">Start writing your first story</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const readTime = Math.ceil(post.content.split(" ").length / 200);
        return (
          <div
            key={post.id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors group"
          >
            {/* Left — title + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {/* Status badge */}
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    post.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {post.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
                <span className="text-xs opacity-40">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h3 className="font-semibold text-sm leading-snug truncate group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              {/* Stats */}
              <div className="flex items-center gap-3 mt-1.5 text-xs opacity-50">
                <span>{readTime} min read</span>
                <span>·</span>
                <span>{post._count.likes} likes</span>
                <span>·</span>
                <span>{post._count.comments} comments</span>
              </div>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/editor/${post.id}`}
                className="px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
                className="px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors disabled:opacity-40"
              >
                {deletingId === post.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}