import { Heart, Home } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="text-lg font-bold">
          <span>Date</span>
          <span className="text-accent">Mode</span>
        </div>
        <div className="flex justify-center items-center gap-6">
          <button className="text-foreground/60 hidden md:block rounded-full px-3 py-2 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">
            <Home size={24} strokeWidth={2.25} />
          </button>
          <button className="text-foreground/60 hidden md:block rounded-full px-3 py-2 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">
            <Heart size={24} strokeWidth={2.25} />
          </button>
          <button
            aria-label="프로필"
            className="rounded-full border border-border bg-card px-3 py-2 text-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            😃
          </button>
        </div>
      </div>
    </header>
  );
}
