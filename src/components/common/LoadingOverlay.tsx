"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
const LOADING_MESSAGES = [
  "사용자님을 위한 맞춤 장소를 고르고 있어요... ✨",
  "지역별 숨은 맛집 데이터를 분석 중입니다... 🍴",
  "최적의 데이트 동선을 설계하고 있어요... 📍",
  "설레는 코스가 거의 다 완성되었습니다! 🚀",
];

export default function LoadingOverlay({ isPending }: { isPending: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!isPending) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [isPending]);

  if (!isPending) {
    if (index !== 0) setIndex(0);
  }
  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-center items-center gap-4 bg-background/60 backdrop-blur-xs animate-pulse">
      <Loader2 className="h-10 w-10 animate-spin text-foreground" />
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">{LOADING_MESSAGES[index]}</p>
        <p className="text-sm text-muted-foreground">잠시만 기다려 주세요!</p>
      </div>
    </div>
  );
}
