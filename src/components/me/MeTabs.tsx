import Link from "next/link";

export default function MeTabs({ activeTab }: { activeTab: string }) {
  return (
    <div className="grid grid-cols-2 border-b border-border">
      <Link
        href="/me?tab=history"
        className={`text-center cursor-pointer pt-4 pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${activeTab === "history" ? "text-foreground font-semibold border-b-2 border-accent" : "border-none text-muted-foreground hover:text-foreground"}`}
      >
        검색 히스토리
      </Link>
      <Link
        href="/me?tab=bookmarks"
        className={`text-center cursor-pointer pt-4 pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${activeTab === "bookmarks" ? "text-foreground font-semibold border-b-2 border-accent" : "border-none text-muted-foreground hover:text-foreground"}`}
      >
        북마크한 코스
      </Link>
    </div>
  );
}
