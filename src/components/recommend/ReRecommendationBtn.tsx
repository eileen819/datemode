/* "use client";

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
    console.log("start handleRefetch");
    if (!confirm("다시 새로운 추천 코스를 생성해드릴까요?")) {
      console.log("2. confirm cancel");
      return;
    }

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
        type="button"
        className={`flex justify-center items-center gap-2 ${isPending ? "" : "cursor-pointer"} text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-accent/30 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      >
        <RefreshCcw size={16} className={isPending ? "animate-spin" : ""} />
        <span>{isPending ? "생성 중..." : "다시 추천"}</span>
      </button>
    </>
  );
}
 */

"use client";

import { reRecoFetchAction } from "@/actions/reRecoAction";
import { useState, useTransition } from "react";
import LoadingOverlay from "../common/LoadingOverlay";
import { RefreshCcw } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import Portal from "../course/Portal";

export default function ReRecommendationBtn({
  resultId,
}: {
  resultId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleRefetch = () => {
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    setIsOpen(false);

    const supabase = createSupabaseBrowserClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      const redirectTo = encodeURIComponent(pathname);
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
        type="button"
        onClick={handleRefetch}
        disabled={isPending}
        className={`flex justify-center items-center gap-2 ${
          isPending ? "" : "cursor-pointer"
        } text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-accent/30 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      >
        <RefreshCcw size={16} className={isPending ? "animate-spin" : ""} />
        <span>{isPending ? "생성 중..." : "다시 추천"}</span>
      </button>

      {isOpen && (
        <Portal>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-75 flex-col justify-center items-center max-w-sm border border-border rounded-xl bg-white p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-foreground text-center">
                다시 새로운 추천 코스를 생성해드릴까요?
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-accent duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-accent duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
