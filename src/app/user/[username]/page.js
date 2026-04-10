import Link from "next/link";

const USER_DATA = {
  name: "Alex Rivera",
  username: "@alexrivera",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  bio: "Software Engineer & Designer. Writing about the intersection of React, Server Components, and aesthetically pleasing modern web design.",
  followers: 1204,
  following: 43,
};

const USER_POSTS = [
  {
    id: 1,
    title: "The Evolution of Server Components: Redefining the Client-Server Boundary",
    excerpt: "Server Components allow developers to build applications that span the server and client in a way that combines the rich interactivity of client-side apps...",
    date: "Oct 24, 2026",
    readingTime: "5 min read",
    likes: 124,
    comments: 32,
    coverImage: "https://picsum.photos/seed/tech1/800/400",
  },
  {
    id: 4,
    title: "Mastering Tailwind CSS custom variants",
    excerpt: "Learn how to build custom responsive variants in Tailwind v4 that automatically scale depending on viewport and nested conditions...",
    date: "Sep 12, 2026",
    readingTime: "7 min read",
    likes: 412,
    comments: 48,
    coverImage: "https://picsum.photos/seed/tailwind/800/400",
  },
  {
    id: 5,
    title: "Why Minimalist Design is Harder Than It Looks",
    excerpt: "Stripping away the non-essential sounds easy in theory, but achieving perfect visual harmony with fewer elements requires strict grid discipline...",
    date: "Aug 02, 2026",
    readingTime: "6 min read",
    likes: 890,
    comments: 112,
    coverImage: "https://picsum.photos/seed/min/800/400",
  },
];

export default function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Profile Header */}
      <section className="pt-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-border pb-12">
          <div className="relative">
            <img
              src={USER_DATA.avatar}
              alt={USER_DATA.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface shadow-xl shadow-primary/10 object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">{USER_DATA.name}</h1>
                <p className="text-primary font-medium">{USER_DATA.username}</p>
              </div>
              <button className="px-8 py-2.5 bg-foreground text-background font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm mx-auto md:mx-0">
                Follow
              </button>
            </div>
            
            <p className="text-lg opacity-80 mb-6 leading-relaxed max-w-2xl">
              {USER_DATA.bio}
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-medium opacity-70">
              <span className="flex items-center gap-2">
                <span className="text-foreground text-base">{USER_DATA.followers.toLocaleString()}</span> Followers
              </span>
              <span className="flex items-center gap-2">
                <span className="text-foreground text-base">{USER_DATA.following}</span> Following
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* User's Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Published Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USER_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href={`/post/${post.id}`} className="block relative h-48 w-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              <div className="flex flex-col grow p-6">
                <div className="text-xs opacity-60 flex items-center justify-between mb-3">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>

                <Link href={`/post/${post.id}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-foreground opacity-70 text-sm line-clamp-3 mb-6 grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm opacity-60 mt-auto pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group/btn">
                    <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </span>
                  <Link href={`/post/${post.id}#comments`} className="flex items-center gap-1.5 hover:text-primary transition-colors group/btn">
                    <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
