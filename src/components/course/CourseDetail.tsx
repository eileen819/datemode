"use client";

import { Spot } from "@/lib/reco/output-schema";
import CourseMap from "./CourseMap";
import { verifiedSpot, verifySpot } from "@/lib/reco/verifySpot.client";
import { useCallback, useEffect, useState } from "react";
import SpotCard from "./SpotCard";

export default function CourseDetail({
  summary,
  spots,
}: {
  summary: string;
  spots: Spot[];
}) {
  const [spotsWithStatus, setSpotsWithStatus] = useState<verifiedSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 검증된 장소 찾기
  const run = useCallback(async () => {
    const verifiedSpots = await Promise.all(
      spots.map(async (spot) => await verifySpot(spot)),
    );
    setSpotsWithStatus(verifiedSpots);
    setIsLoading(false);
  }, [spots]);

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao.maps.load) return;

    kakao.maps.load(run);
  }, [run]);

  return (
    <div className="md:flex md:items-start md:gap-6">
      <div className="md:flex md:flex-col md:w-3/5 md:space-y-4 md:py-4">
        {/* 코스 요약 */}
        <section className="py-2 px-1 md:p-0">
          <p className="text-sm leading-6 text-foreground break-keep">
            {summary}
          </p>
        </section>
        {/* 지도 영역 */}
        <CourseMap spots={spotsWithStatus} isLoading={isLoading} />
      </div>
      {/* 카드 영역 */}
      <SpotCard spots={spotsWithStatus} isLoading={isLoading} />
    </div>
  );
}
