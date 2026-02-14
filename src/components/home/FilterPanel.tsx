"use client";

import { IFilter } from "@/types";
import MultiSection from "./MultiSection";
import SearchRegion from "./SearchRegion";
import SigleSection from "./SingleSection";
import { useState } from "react";

export default function FilterPanel() {
  const [filters, setFilters] = useState<IFilter>({
    region: "",
    categories: [],
    budget: "",
    time: "",
  });
  const [regionList, setRegionList] = useState(["강남", "홍대", "성수"]);
  console.log(regionList);

  const setFilter = <T extends keyof IFilter>(key: T, value: IFilter[T]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  console.log(filters);

  return (
    <>
      <SigleSection
        title="📍 지역"
        tags={regionList}
        value={filters.region}
        onSelect={(tag) => setFilter("region", tag)}
        allowDeselect
      >
        <SearchRegion
          regions={[
            "강남",
            "홍대",
            "성수",
            "잠실",
            "용산",
            "연남",
            "합정",
            "신촌",
            "이태원",
            "한남",
          ]}
          onSelect={(tag) => {
            setRegionList((prev) => {
              if (prev.includes(tag)) {
                return prev;
              }
              return [tag, ...prev].slice(0, 5);
            });
            setFilter("region", tag);
          }}
        />
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
    </>
  );
}
