"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface ISearchRegionProps<T extends string> {
  regions: readonly T[];
  onSelect: (tag: T) => void;
}

export default function SearchRegion<T extends string>({
  regions,
  onSelect,
}: ISearchRegionProps<T>) {
  const [query, setQuery] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return regions.filter((r) => r.toLowerCase().includes(q)).slice(0, 5);
  }, [query, regions]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);
    setActiveIndex(0);
    setDropOpen(Boolean(value.trim()));
  };

  const handleSelect = (region: T) => {
    onSelect(region);
    setActiveIndex(0);
    setQuery("");
    setDropOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (!dropOpen || filtered.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) {
          handleSelect(filtered[activeIndex]);
        }
        break;
      case "Escape":
        setDropOpen(false);
        break;
    }
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setDropOpen(false);
        setActiveIndex(0);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className="relative mt-3" ref={wrapRef}>
      <div className="flex items-center border border-border w-full bg-background h-10 rounded-3xl px-4 focus-within:border-accent transition-colors duration-150 ease-in">
        <Search
          size={20}
          strokeWidth={2.25}
          className="mr-2 shrink-0 text-foreground/60"
        />
        <input
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="지역을 검색하세요"
          className="flex-1 min-w-0 bg-transparent outline-none text-sm"
        />
      </div>
      {dropOpen && filtered.length > 0 && (
        <ul className="absolute w-full bg-card mt-0.5 border border-border rounded-md shadow-xs overflow-hidden">
          {filtered.map((item, index) => {
            const active = index === activeIndex;
            return (
              <li key={item}>
                <button
                  type="button"
                  onMouseEnter={() => {
                    if (activeIndex !== index) {
                      setActiveIndex(index);
                    }
                  }}
                  onClick={() => handleSelect(item)}
                  className={`text-left text-sm w-full px-4 py-2 cursor-pointer rounded-md ${active ? "bg-gray-100" : ""}`}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
