/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { verifiedSpot } from "@/lib/reco/verifySpot.client";
import { useEffect, useMemo, useRef } from "react";

export default function CourseMap({ spots }: { spots: verifiedSpot[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlayRef = useRef<any[]>([]);
  const runIdRef = useRef(0);

  // 카카오맵 띄우기
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps?.services?.Places || !kakao?.maps?.Map) return;
    if (!mapRef.current) return;

    // 이펙트 실행 식별
    runIdRef.current += 1;
    const runId = runIdRef.current;

    // 마커/오버레이 초기화
    const clearMap = () => {
      markersRef.current.forEach((m) => m.setMap(null));
      overlayRef.current.forEach((o) => o.setMap(null));
      markersRef.current = [];
      overlayRef.current = [];
    };

    // 지도 객체 생성
    if (!mapObj.current) {
      mapObj.current = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });
    }
    const map = mapObj.current;
    clearMap();

    // 마커들이 한 화면에 다 보이도록 하는 박스 생성
    const bounds = new kakao.maps.LatLngBounds();

    // 성공적으로 마커/오버레이를 꽂은 장소의 개수
    let successCount = 0;

    spots
      .filter((spot) => spot.mapStatus === "verified")
      .forEach((spot) => {
        if (runIdRef.current !== runId) return;
        if (!spot.lat || !spot.lng) return;

        const pos = new window.kakao.maps.LatLng(spot.lat, spot.lng);
        const marker = new window.kakao.maps.Marker({
          map: mapObj.current,
          position: pos,
        });
        markersRef.current.push(marker);

        // 오버레이
        const content = `<div class="bg-white px-2 py-1 rounded-full border border-primary text-xs font-bold shadow-sm translate-y-[-45px]">${spot.order}. ${spot.query}</div>`;
        const overlay = new kakao.maps.CustomOverlay({
          map,
          position: pos,
          content,
        });
        overlayRef.current.push(overlay);

        bounds.extend(pos);
        successCount++;
      });

    // 성공한 장소가 하나라도 있으면 지도 화면을 모든 핀마커가 보이도록 조정
    if (successCount > 0) {
      map.setBounds(bounds, 50, 50, 50, 50);
    }

    // 레이아웃 안정화
    requestAnimationFrame(() => {
      if (runIdRef.current !== runId) return;
      map.relayout();
      if (successCount > 0) map.setBounds(bounds, 50, 50, 50, 50);
    });

    return () => {
      runIdRef.current += 1;
      clearMap();
    };
  }, [spots]);

  const total = spots.length;
  const verifiedCount = useMemo(
    () => spots.filter((s) => s.mapStatus === "verified").length,
    [spots],
  );

  return (
    <section className="flex flex-col rounded-md overflow-hidden border border-border">
      <div ref={mapRef} className="flex-1 w-full min-h-64 md:min-h-85" />
      {total > 0 && (
        <div className="flex items-center justify-between px-3 py-2 text-xs bg-muted/40 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              지도 표시 {verifiedCount} / {total}
            </span>

            {verifiedCount < total && (
              <span className="text-muted-foreground">
                일부 장소는 위치 확인이 되지 않았어요
              </span>
            )}
          </div>

          {verifiedCount === total && (
            <span className="text-emerald-600 font-medium">✓ 모두 확인됨</span>
          )}
        </div>
      )}
    </section>
  );
}
