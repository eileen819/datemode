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
  TIMESLOT_TAGS,
} from "@/constants/tags";
import SubmitBtn from "./SubmitBtn";

export default function FilterPanel() {
  const [filters, setFilters] = useState<IFilter>({
    region: "",
    categories: [],
    budget: "",
    timeslot: "",
  });
  const [regionList, setRegionList] = useState<Region[]>(
    [...REGION_TAGS].slice(0, 3),
  );

  const setFilter = <T extends keyof IFilter>(key: T, value: IFilter[T]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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
        tags={TIMESLOT_TAGS}
        value={filters.timeslot}
        onSelect={(tag) => setFilter("timeslot", tag)}
        allowDeselect
      />
      <SubmitBtn
        region={filters.region}
        categories={filters.categories}
        budget={filters.budget}
        timeslot={filters.timeslot}
      />
    </>
  );
}
