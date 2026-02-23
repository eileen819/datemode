"use client";

import { reRecoFetchAction } from "@/actions/reRecoAction";
import { useTransition } from "react";
import LoadingOverlay from "../common/LoadingOverlay";
import { RefreshCcw } from "lucide-react";

export default function ReRecommendationBtn({
  resultId,
}: {
  resultId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleRefetch = () => {
    if (!confirm("다시 새로운 추천 코스를 생성해드릴까요?")) return;

    startTransition(async () => {
      const result = await reRecoFetchAction(resultId);
      if (result.error || !result.status) {
        alert(result.error);
      }
    });
  };

  return (
    <>
      {isPending && <LoadingOverlay />}
      <button
        onClick={handleRefetch}
        disabled={isPending}
        className={`flex justify-center items-center gap-2 ${isPending ? "" : "cursor-pointer"} text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-accent/30 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      >
        <RefreshCcw size={16} className={isPending ? "animate-spin" : ""} />
        <span>{isPending ? "생성 중..." : "다시 추천"}</span>
      </button>
    </>
  );
}
