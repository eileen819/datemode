"use client";

import { IFilter } from "@/types";
import MultiSection from "./MultiSection";
import SearchRegion from "./SearchRegion";
import SigleSection from "./SingleSection";
import { useState } from "react";
import {
  BUDGET_TAGS,
  CATEGORY_TAGS,
  Region,
  REGION_TAGS,
  TIME_TAGS,
} from "@/constants/tags";

export default function FilterPanel() {
  const [filters, setFilters] = useState<IFilter>({
    region: "",
    categories: [],
    budget: "",
    time: "",
  });
  const [regionList, setRegionList] = useState<Region[]>(
    [...REGION_TAGS].slice(0, 3),
  );
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
          regions={REGION_TAGS}
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
        tags={CATEGORY_TAGS}
        value={filters.categories}
        onSelect={(tags) => setFilter("categories", tags)}
      />
      <SigleSection
        title="💰 예산"
        tags={BUDGET_TAGS}
        value={filters.budget}
        onSelect={(tag) => setFilter("budget", tag)}
        allowDeselect
      />
      <SigleSection
        title="⏰ 시간대"
        tags={TIME_TAGS}
        value={filters.time}
        onSelect={(tag) => setFilter("time", tag)}
        allowDeselect
      />
    </>
  );
}
