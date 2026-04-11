import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Next.js Blog Platform Mock",
  description: "A visually stunning blog UI built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    // Defaulting to light theme. Theme switcher will toggle this class.
    <html lang="en" className="antialiased">
      <head>
        {/* Prevent hydration mismatch warnings from theme changes script if any could be added later */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="w-full bg-surface border-t border-border mt-auto py-6 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
            &copy; {new Date().getFullYear()} Blog Platform Mock. All UI rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
