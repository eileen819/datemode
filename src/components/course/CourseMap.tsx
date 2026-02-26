/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useKakaoMap } from "@/hooks/useKakaoMap";
import { verifiedSpot } from "@/lib/reco/verifySpot.client";
import { MapPinOff } from "lucide-react";
import { useMemo, useRef } from "react";

export default function CourseMap({
  spots,
  isLoading,
  setActiveId,
  setMapInstance,
}: {
  spots: verifiedSpot[];
  isLoading: boolean;
  setActiveId: (id: number) => void;
  setMapInstance?: (map: any) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap({ spots, mapRef, setActiveId, setMapInstance });

  const total = spots.length;
  const verifiedCount = useMemo(
    () => spots.filter((s) => s.mapStatus === "verified").length,
    [spots],
  );

  if (isLoading) {
    return (
      <section className="rounded-md overflow-hidden border border-border">
        <div className="h-64 md:h-85 bg-muted-foreground/20 animate-pulse rounded-md" />
      </section>
    );
  }

  return (
    <section className="flex flex-col rounded-md overflow-hidden border border-border">
      {verifiedCount === 0 ? (
        <div className="flex h-64 md:h-85 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
          <div className="text-center space-y-2">
            <p className="font-medium flex justify-center items-center gap-1">
              <MapPinOff size={16} />
              <span>위치 정보를 찾지 못했습니다</span>
            </p>
            <p className="text-xs">텍스트 추천만 제공됩니다.</p>
          </div>
        </div>
      ) : (
        <div ref={mapRef} className="flex-1 w-full min-h-64 md:min-h-85" />
      )}
      {total > 0 && (
        <div className="flex items-center justify-between px-3 py-2 text-xs bg-muted/40 border-t border-border">
          <div className="flex items-center gap-2 font-medium">
            <span>지도 표시 상태</span>
            <span>
              {verifiedCount} / {total}
            </span>
          </div>

          {verifiedCount === total && (
            <span className="text-emerald-600 font-medium">
              ✓ 모든 장소의 위치를 확인했습니다.
            </span>
          )}

          {verifiedCount > 0 && verifiedCount < total && (
            <span className="text-muted-foreground">
              일부 장소는 위치 확인이 되지 않았어요.
            </span>
          )}

          {verifiedCount === 0 && (
            <span className="text-muted-foreground">
              지도에 표시 가능한 장소가 없습니다.
            </span>
          )}
        </div>
      )}
    </section>
  );
}
