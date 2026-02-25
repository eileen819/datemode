"use client";

import { Spot } from "@/lib/reco/output-schema";
import CourseMap from "./CourseMap";
import { verifiedSpot, verifySpot } from "@/lib/reco/verifySpot.client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";

export default function CourseDetail({
  summary,
  spots,
}: {
  summary: string;
  spots: Spot[];
}) {
  const [spotsWithStatus, setSpotsWithStatus] = useState<verifiedSpot[]>([]);

  // 검증된 장소 찾기
  const run = useCallback(async () => {
    const verifiedSpots = await Promise.all(
      spots.map(async (spot) => await verifySpot(spot)),
    );
    setSpotsWithStatus(verifiedSpots);
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
        <CourseMap spots={spotsWithStatus} />
      </div>
      {/* 카드 영역 */}
      <section className="md:my-auto space-y-3 md:w-2/5 py-4">
        {spotsWithStatus.map((spot, i) => (
          <article
            key={`${spot.order}-${i}`}
            className="flex flex-col gap-2 bg-accent/10 rounded-xl border border-border p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex-1 flex gap-1">
                <span>{i + 1}. </span>
                <span className="break-keep">
                  {spot.nameHint.replace(/\s*\([^)]*\)/g, "")}
                </span>
              </h2>

              {spot.mapStatus === "verified" && (
                <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <MapPin size={14} />
                  지도 표시됨
                </span>
              )}
              {spot.mapStatus === "not_found" && (
                <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <AlertCircle size={14} /> 위치 미확인
                </span>
              )}
              {spot.mapStatus === "error" && (
                <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                  <CheckCircle2 size={14} /> 검색 오류
                </span>
              )}
            </div>
            <p className="pl-4 text-sm text-muted-foreground break-keep">
              {spot.reason}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
