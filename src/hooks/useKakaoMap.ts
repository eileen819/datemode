/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifiedSpot } from "@/lib/reco/verifySpot.client";
import { RefObject, useEffect, useRef } from "react";

export function useKakaoMap({
  spots,
  mapRef,
  setActiveId,
  setMapInstance,
}: {
  spots: verifiedSpot[];
  mapRef: RefObject<HTMLDivElement | null>;
  setActiveId: (id: number) => void;
  setMapInstance?: (map: any) => void;
}) {
  const mapObj = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlayRef = useRef<any[]>([]);
  const runIdRef = useRef(0);

  // 카카오맵 띄우기
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps?.services?.Places || !kakao?.maps?.Map) return;

    // 마커/오버레이 초기화
    const clearMap = () => {
      markersRef.current.forEach((m) => m.setMap(null));
      overlayRef.current.forEach((o) => o.setMap(null));
      markersRef.current = [];
      overlayRef.current = [];
    };
    clearMap();

    // 지도 DOM 없으면 여기서 종료
    if (!mapRef.current) return;

    // 이펙트 실행 식별
    runIdRef.current += 1;
    const runId = runIdRef.current;

    // 지도 객체 생성
    if (!mapObj.current) {
      mapObj.current = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });
      setMapInstance?.(mapObj.current);
    }
    const map = mapObj.current;

    // 마커들이 한 화면에 다 보이도록 하는 박스 생성
    const bounds = new kakao.maps.LatLngBounds();

    // 성공적으로 마커/오버레이를 꽂은 장소의 개수
    let successCount = 0;

    // 마커/오버레이 띄우기
    spots
      .filter((spot) => spot.mapStatus === "verified")
      .forEach((spot) => {
        if (runIdRef.current !== runId) return;
        if (!spot.lat || !spot.lng) return;

        const pos = new window.kakao.maps.LatLng(spot.lat, spot.lng);
        const imageSrc = "/marker.png";
        const imageSize = new kakao.maps.Size(35, 35);
        const imageOption = { offset: new kakao.maps.Point(17, 34) };

        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );
        const marker = new window.kakao.maps.Marker({
          map: mapObj.current,
          position: pos,
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          setActiveId(spot.order);
        });
        markersRef.current.push(marker);

        // 오버레이
        const content = `<div class="bg-white px-2 py-1 rounded-full border border-foreground text-xs font-bold shadow-sm">${spot.order}. ${spot.query}</div>`;
        const overlay = new kakao.maps.CustomOverlay({
          map,
          position: pos,
          content,
          xAnchor: 0.5, // 컨텐츠의 x 위치
          yAnchor: 2.5, // 컨텐츠의 y 위치
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
  }, [spots, setActiveId, setMapInstance, mapRef]);
}
