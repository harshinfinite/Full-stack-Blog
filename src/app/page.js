import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import Like from "@/components/Like";
import { auth } from "@/auth";




export default async function Dashboard() {

  const session = await auth();

  
  const [posts, userLikes] = await Promise.all([
    prisma.post.findMany({

      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { likes: true } },
        author: true
      }
    }),

    session ? prisma.like.findMany({
      where: {
        userId: parseInt(session.user.id)
      }
    }) : Promise.resolve([])

  ])




  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-surface rounded-3xl shadow-sm border border-border">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 hidden md:block">
          Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Future of Blogging</span>
        </h1>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 md:hidden">
          Welcome to the Future
        </h1>
        <p className="text-xl text-foreground opacity-70 max-w-2xl mx-auto mb-8">
          Discover stories, thinking, and expertise from writers on any topic. A modern, minimalist approach to reading.
        </p>
        <Link
          href="/editor"
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary-hover hover:scale-105 transition-all shadow-lg hover:shadow-primary/30"
        >
          Start Writing Today
        </Link>
      </section>

      {/* Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Trending Stories</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-border transition-colors">
              Latest
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-full bg-primary/10 transition-colors">
              Trending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const readingTime = Math.ceil(post.content.split(" ").length / 200) + " min read"
            return (
              <article
                key={post.id}
                className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href={`/post/${post.id}`} className="block relative h-48 w-full overflow-hidden">
                  <img
                    src={post.coverImage || "https://picsum.photos/seed/default/800/400"}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex flex-col grow p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full border border-border"
                    />
                    <div>
                      <Link href={`/user/${post.author.name.toLowerCase().replace(' ', '')}`} className="text-sm font-semibold hover:text-primary transition-colors hover:underline">
                        {post.author.name}
                      </Link>
                      <div className="text-xs opacity-60 flex items-center shadow-none gap-1">
                        <span>{new Date(post.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span>&bull;</span>
                        <span>{readingTime}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/post/${post.id}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-foreground opacity-70 text-sm line-clamp-3 mb-6 grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm opacity-60">

                      <Like postId={post.id} initialCount={post._count.likes} initialLiked={userLikes.some(like => like.postId === post.id)} />


                      <Link href={`/post/${post.id}#comments`} className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn">
                        <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {0}
                      </Link>
                    </div>
                    <button aria-label="Save post" className="opacity-60 hover:opacity-100 hover:text-primary transition-all rounded-full p-2 hover:bg-border">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  );
}
