import { Search } from "lucide-react";

export default function SearchRegion() {
  return (
    <div className="flex items-center border border-border w-full bg-background h-10 rounded-3xl px-4 focus-within:border-accent transition-colors duration-150 ease-in mt-3">
      <Search
        size={20}
        strokeWidth={2.25}
        className="mr-2 shrink-0 text-foreground/60"
      />
      <input
        type="text"
        placeholder="지역을 검색하세요"
        className="flex-1 min-w-0 bg-transparent outline-none text-sm"
      />
    </div>
  );
}
