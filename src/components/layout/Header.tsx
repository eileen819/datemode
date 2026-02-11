export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="text-lg font-bold">
          <span>Date</span>
          <span className="text-accent">Mode</span>
        </div>
        <button
          aria-label="프로필"
          className="rounded-full border border-border bg-card px-3 py-2 text-sm"
        >
          😃
        </button>
      </div>
    </header>
  );
}
