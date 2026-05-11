import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileEditor from "@/components/ProfileEditor";
import PostManager from "@/components/PostManager";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const [posts, user] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: parseInt(session.user.id) },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { comments: true, likes: true } } },
    }),
    prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      include: { _count: { select: { followers: true, following: true, posts: true } } },
    }),
  ]);

  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;
  const totalLikes = posts.reduce((sum, p) => sum + p._count.likes, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-foreground opacity-60 mt-1">Welcome back, {user.name}</p>
          </div>
          <Link
            href='/editor'
            className="px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            + New Post
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Posts", value: posts.length },
            { label: "Published", value: publishedCount },
            { label: "Drafts", value: draftCount },
            { label: "Total Likes", value: totalLikes },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-1"
            >
              <span className="text-sm opacity-60 font-medium">{stat.label}</span>
              <span className="text-3xl font-extrabold tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Editor — 1 col */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5">Profile</h2>
              <ProfileEditor user={user} />
            </div>
          </div>

          {/* Post Manager — 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5">Your Posts</h2>
              <PostManager posts={posts} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}