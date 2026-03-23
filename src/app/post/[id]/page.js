import Link from "next/link";

const POST_DATA = {
  id: 1,
  title: "The Evolution of Server Components: Redefining the Client-Server Boundary",
  content: `
    <p class="mb-6">Server Components allow developers to build applications that span the server and client in a way that combines the rich interactivity of client-side apps with the improved performance of traditional server rendering.</p>
    <h2 class="text-2xl font-bold mt-10 mb-4">Why Server Components?</h2>
    <p class="mb-6">For the past decade, building single-page applications (SPAs) has felt like a massive compromise. You get incredible user experiences but at the cost of sending massive JavaScript bundles to the client. This hurts performance, especially on lower-end devices or slow networks.</p>
    <p class="mb-6">Server Components solve this by allowing you to render components on the server ahead of time. Only the resulting HTML and a tiny bit of instructions are sent to the client.</p>
    <blockquote class="border-l-4 border-primary pl-4 my-8 italic text-lg opacity-80">
      "The best JavaScript is the JavaScript you don't send to the client."
    </blockquote>
    <h2 class="text-2xl font-bold mt-10 mb-4">The New Mental Model</h2>
    <p class="mb-6">In this new paradigm, you need to think about your component tree differently. Is this component interactive? Does it need state or lifecycle effects? If yes, it's a Client Component. Does it just fetch data and render UI? It's a Server Component.</p>
    <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto text-sm"><code>// Button.jsx - A Client Component
"use client";

export default function Button({ onClick, children }) {
  return (
    &lt;button onClick={onClick} className="btn"&gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>
  `,
  author: {
    name: "Alex Rivera",
    username: "@alexrivera",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    bio: "Software Engineer & Designer."
  },
  date: "Oct 24, 2026",
  readingTime: "5 min read",
  likes: 124,
  coverImage: "https://picsum.photos/seed/tech1/1200/600",
};

const COMMENTS = [
  {
    id: 1,
    author: {
      name: "Jamie Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    },
    date: "Oct 25, 2026",
    content: "This is a great breakdown! I've been struggling to understand the mental model behind RSCs, but the way you explained when to use client vs server components really clicked for me.",
    likes: 12,
  },
  {
    id: 2,
    author: {
      name: "Samira Jones",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    date: "Oct 26, 2026",
    content: "Do you think this will completely replace traditional SPAs or will they co-exist for different types of applications?",
    likes: 8,
  }
];

export default function SinglePostView() {
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
              {POST_DATA.date} <span className="mx-1">&bull;</span> {POST_DATA.readingTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8">
            {POST_DATA.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between border-y border-border py-4 gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/user/${POST_DATA.author.username.replace('@','')}`}>
                <img
                  src={POST_DATA.author.avatar}
                  alt={POST_DATA.author.name}
                  className="w-12 h-12 rounded-full border border-border hover:opacity-80 transition-opacity cursor-pointer"
                />
              </Link>
              <div className="text-left">
                <Link href={`/user/${POST_DATA.author.username.replace('@','')}`} className="font-semibold block hover:text-primary transition-colors">
                  {POST_DATA.author.name}
                </Link>
                <span className="text-sm opacity-60 block cursor-pointer">{POST_DATA.author.username}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-border transition-colors group">
                <svg className="w-5 h-5 group-hover:text-primary transition-colors group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">{POST_DATA.likes}</span>
              </button>
              
              <Link href="#comments" className="p-2 border border-border rounded-full hover:bg-border transition-colors group">
                <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
              
              <div className="h-6 w-px bg-border hidden sm:block"></div>

              <button className="p-2 text-foreground opacity-60 hover:opacity-100 hover:text-blue-500 transition-colors" title="Edit Post">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              <button className="p-2 text-foreground opacity-60 hover:opacity-100 hover:text-red-500 transition-colors" title="Delete Post">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img
            src={POST_DATA.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-loose"
          dangerouslySetInnerHTML={{ __html: POST_DATA.content }}
        />
      </article>

      {/* Author Card Footer */}
      <div className="mt-16 bg-surface p-8 rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-6">
        <img
          src={POST_DATA.author.avatar}
          alt={POST_DATA.author.name}
          className="w-20 h-20 rounded-full"
        />
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold mb-1">Written by {POST_DATA.author.name}</h3>
          <p className="opacity-70 text-sm mb-4">{POST_DATA.author.bio}</p>
          <button className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover transition-colors">
            Follow {POST_DATA.author.name.split(' ')[0]}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <section id="comments" className="mt-16 pt-16 border-t border-border">
        <h3 className="text-2xl font-bold mb-8">Comments ({COMMENTS.length})</h3>

        {/* Write Comment Box */}
        <div className="flex gap-4 mb-12">
          <img
            src="https://i.pravatar.cc/150?u=current_user"
            alt="Current User"
            className="w-10 h-10 rounded-full hidden sm:block border border-border"
          />
          <div className="flex-1 bg-surface border border-border rounded-xl flex flex-col focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all overflow-hidden">
            <textarea
              className="w-full p-4 bg-transparent outline-none resize-none min-h-[100px] text-sm"
              placeholder="What are your thoughts?"
            ></textarea>
            <div className="bg-background/50 p-2 flex justify-end border-t border-border">
              <button className="px-5 py-2 bg-primary text-white text-sm justify-center font-semibold rounded-full hover:bg-primary-hover transition-colors flex items-center gap-2 select-none group">
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {COMMENTS.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full border border-border cursor-pointer hover:opacity-80"
              />
              <div className="flex-1">
                <div className="bg-surface border border-border rounded-2xl rounded-tl-none p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-sm cursor-pointer hover:text-primary transition-colors">{comment.author.name}</span>
                    </div>
                    <span className="text-xs opacity-60 font-medium">{comment.date}</span>
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
                    {comment.likes}
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
