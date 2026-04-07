"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Editor() {

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await fetch('/api/post', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, status })
      });

      if (!response.ok) {
        alert("Something went wrong")
        return
      };

      router.push('/');
    } catch (error) {
      alert("Network error , Plese try again")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-foreground opacity-60 hover:opacity-100 hover:text-primary transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Drafts
          </Link>
          <span className="text-sm font-medium opacity-50 hidden sm:inline">Unsaved changes</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold border border-border rounded-full hover:bg-border transition-colors disabled:opacity-50">
            Preview
          </button>
          <button className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-6 h-full min-h-0">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-surface border border-border rounded-2xl shadow-sm overflow-hidden min-h-[50vh]">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Article Title..."
            className="w-full text-3xl font-extrabold px-8 pt-8 pb-4 bg-transparent outline-none placeholder:opacity-50 text-foreground"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Toolbar */}
          <div className="flex items-center gap-1 px-6 py-2 border-y border-border bg-background/50 overflow-x-auto">
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Bold">
              <span className="font-bold font-serif px-1">B</span>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Italic">
              <span className="italic font-serif px-1">I</span>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Underline">
              <span className="underline font-serif px-1">U</span>
            </button>
            <span className="w-px h-6 bg-border mx-2"></span>

            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Heading 1">
              <span className="font-bold text-sm">H1</span>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Heading 2">
              <span className="font-bold text-sm">H2</span>
            </button>
            <span className="w-px h-6 bg-border mx-2"></span>

            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Link">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Image">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Code Block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </button>
            <button className="p-2 rounded hover:bg-surface hover:text-primary transition-colors text-foreground opacity-70 hover:opacity-100 shrink-0" title="Quote">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            className="flex-1 w-full p-8 bg-transparent outline-none resize-none text-foreground font-sans text-lg leading-relaxed placeholder:opacity-40"
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>


        {/* Sidebar Settings (Optional/Mocked) */}
        <div className="w-full sm:w-80 flex flex-col gap-6">
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold mb-4">Post Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 opacity-80">Cover Image</label>
                <div className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-sm opacity-60 hover:opacity-100 group">
                  <svg className="w-6 h-6 mb-2 group-hover:text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload Image
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1 opacity-80">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-colors"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1 opacity-80">Tags</label>
                <input
                  id="tags"
                  type="text"
                  placeholder="react, tailwind..."
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1 opacity-80">Custom URL Slug</label>
                <input
                  id="slug"
                  type="text"
                  placeholder="my-awesome-post"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
