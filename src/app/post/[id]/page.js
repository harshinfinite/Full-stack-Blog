import Link from "next/link";
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import CommentBox from "@/components/CommentBox";



export default async function SinglePostView({ params }) {
  const {id: rawId} = await params
  const id = parseInt(rawId)

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });
  if (!post) notFound();

  const session = await auth();
  const isAuthor = session?.user?.id === String(post.authorId)

  const readingTime = Math.ceil(post.content.split(" ").length / 200) + 'min read'


  return (
    <div className="max-w-3xl mx-auto pb-16">
      <article>
        {/* Post Header */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Engineering
            </span>
            <span className="text-sm opacity-60 flex items-center gap-1">
              {new Date(post.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} <span className="mx-1">&bull;</span> {readingTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between border-y border-border py-4 gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/user/${post.author.name.replace('@', '')}`}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border border-border hover:opacity-80 transition-opacity cursor-pointer"
                />
              </Link>
              <div className="text-left">
                <Link href={`/user/${post.author.name.replace('@', '')}`} className="font-semibold block hover:text-primary transition-colors">
                  {post.author.name}
                </Link>
                <span className="text-sm opacity-60 block cursor-pointer">{post.author.name}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-border transition-colors group">
                <svg className="w-5 h-5 group-hover:text-primary transition-colors group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">{0}</span>
              </button>

              <Link href="#comments" className="p-2 border border-border rounded-full hover:bg-border transition-colors group">
                <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>

              <div className="h-6 w-px bg-border hidden sm:block"></div>

              {isAuthor && (
                <button className="p-2 text-foreground opacity-60 hover:opacity-100 hover:text-blue-500 transition-colors" title="Edit Post">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}

              {isAuthor && (
                <button className="p-2 text-foreground opacity-60 hover:opacity-100 hover:text-red-500 transition-colors" title="Delete Post">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img
            src={post.coverImage || "https://picsum.photos/seed/default/1200/600"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-loose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Author Card Footer */}
      <div className="mt-16 bg-surface p-8 rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-6">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-20 h-20 rounded-full"
        />
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold mb-1">Written by {post.author.name}</h3>
          <p className="opacity-70 text-sm mb-4">{post.author.bio || "No bio yet"}</p>
          <button className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover transition-colors">
            Follow {post.author.name.split(' ')[0]}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <section id="comments" className="mt-16 pt-16 border-t border-border">
        <h3 className="text-2xl font-bold mb-8">Comments ({post.comments.length})</h3>

        {/* Write Comment Box */}
        <CommentBox postId={post.id} />
        {/* Comments List */}
        <div className="space-y-8">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full border border-border cursor-pointer hover:opacity-80"
              />
              <div className="flex-1">
                <div className="bg-surface border border-border rounded-2xl rounded-tl-none p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-sm cursor-pointer hover:text-primary transition-colors">{comment.user.name}</span>
                    </div>
                    <span className="text-xs opacity-60 font-medium">{new Date(comment.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 px-2 text-xs font-semibold opacity-60">
                  <button className="hover:text-primary transition-colors flex items-center gap-1 group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    {0}
                  </button>
                  <button className="hover:text-foreground transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
