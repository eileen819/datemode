"use client";

import { reRecoFetchAction } from "@/actions/reRecoAction";
import { useTransition } from "react";
import LoadingOverlay from "../common/LoadingOverlay";
import { RefreshCcw } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";

export default function ReRecommendationBtn({
  resultId,
}: {
  resultId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleRefetch = async () => {
    if (!confirm("다시 새로운 추천 코스를 생성해드릴까요?")) return;

    // 로그인 체크
    const supabase = createSupabaseBrowserClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      const redirectTo = encodeURIComponent(`${pathname}`);
      router.push(`/login?redirectTo=${redirectTo}`);
      return;
    }

    startTransition(async () => {
      const result = await reRecoFetchAction(resultId);
      if (result.error || !result.status) {
        alert(result.error);
      }
    });
  };

  return (
    <>
      {isPending && <LoadingOverlay isPending={isPending} />}
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
