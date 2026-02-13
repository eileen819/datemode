"use client";

import MultiSection from "@/components/home/MultiSection";
import SearchRegion from "@/components/home/SearchRegion";
import SigleSection from "@/components/home/SingleSection";
import { IFilter } from "@/types";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState<IFilter>({
    region: "",
    categories: [],
    budget: "",
    time: "",
  });

  const setFilter = <T extends keyof IFilter>(key: T, value: IFilter[T]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  console.log(filters);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">오늘 어디서 놀래? 😎</h1>
      <SigleSection
        title="📍 지역"
        tags={["강남", "홍대", "성수", "잠실", "용산"]}
        value={filters.region}
        onSelect={(tag) => setFilter("region", tag)}
        allowDeselect
      >
        <SearchRegion />
      </SigleSection>
      <MultiSection
        title="🗂️ 카테고리"
        tags={["맛집", "카페", "전시", "산책"]}
        value={filters.categories}
        onSelect={(tags) => setFilter("categories", tags)}
      />
      <SigleSection
        title="💰 예산"
        tags={["~3만원", "3~6만원", "6~10만원", "10만원+"]}
        value={filters.budget}
        onSelect={(tag) => setFilter("budget", tag)}
        allowDeselect
      />
      <SigleSection
        title="⏰ 시간대"
        tags={["오전(9~12시)", "오후(12~18시)", "저녁(18~22시)"]}
        value={filters.time}
        onSelect={(tag) => setFilter("time", tag)}
        allowDeselect
      />
      <button className="cursor-pointer bg-foreground text-accent border border-border rounded-3xl py-3 font-semibold active:scale-[0.99] transition hover:opacity-95 disabled:opacity-40 disabled:active:scale-100">
        코스 추천받기
      </button>
    </div>
  );
}
