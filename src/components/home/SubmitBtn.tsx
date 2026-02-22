"use client";

import recommendAction from "@/actions/recommendAction";
import { IFilter } from "@/types";
import { useActionState, useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "사용자님을 위한 맞춤 장소를 고르고 있어요... ✨",
  "지역별 숨은 맛집 데이터를 분석 중입니다... 🍴",
  "최적의 데이트 동선을 설계하고 있어요... 📍",
  "설레는 코스가 거의 다 완성되었습니다! 🚀",
];

export default function SubmitBtn({
  region,
  categories,
  budget,
  timeslot,
}: IFilter) {
  const [state, formAction, isPending] = useActionState(recommendAction, null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

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
    <form action={formAction}>
      <input type="text" name="region" value={region} hidden readOnly />
      {categories.map((cat) => (
        <input
          key={cat}
          type="text"
          name="categories"
          value={cat}
          hidden
          readOnly
        />
      ))}
      <input type="text" name="budget" value={budget} hidden readOnly />
      <input type="text" name="timeslot" value={timeslot} hidden readOnly />
      <button
        type="submit"
        disabled={isPending}
        className={`w-full mt-2 cursor-pointer bg-foreground ${isPending ? "animate-pulse" : ""} text-accent border border-border rounded-3xl py-3 font-semibold active:scale-[0.99] transition hover:opacity-95 disabled:opacity-40 disabled:active:scale-100`}
      >
        {isPending ? (
          <>
            <span className="inline-block animate-spin">🌀</span>
            <span> {LOADING_MESSAGES[index]}</span>
          </>
        ) : (
          <span>코스 추천받기</span>
        )}
      </button>
    </form>
  );
}
