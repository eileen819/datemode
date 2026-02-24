"use client";

import { useEffect, useRef } from "react";

export default function CourseMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const kakao = window.kakao;
    if (!kakao?.maps?.load) {
      console.log("카카오 맵 SDK가 아직 로드되지 않았습니다.");
      return;
    }

    kakao.maps.load(() => {
      if (!mapRef.current) return;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      new kakao.maps.Map(container, options);
    });
  }, []);

  return (
    <section className="rounded-md overflow-hidden border border-border">
      <div ref={mapRef} className="w-full h-87.5" />
    </section>
  );
}
