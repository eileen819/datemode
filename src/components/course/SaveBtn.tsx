"use client";

import { saveBookmarkAction } from "@/actions/saveBookmarkAction";
import { CourseObj } from "@/lib/reco/output-schema";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useOptimistic, useRef, useState } from "react";

export default function SaveBtn({
  courseData,
  recommendId,
  initialBookmarked,
}: {
  courseData: CourseObj;
  recommendId: string;
  initialBookmarked: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const inFlightRef = useRef(false);
  const pendingActionRef = useRef<"save" | "delete" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookmarked, setOptimistic] = useOptimistic(
    initialBookmarked ?? false,
    (prev, action: { type: "toggle" } | { type: "set"; value: boolean }) => {
      if (action.type === "toggle") return !prev;
      if (action.type === "set") return action.value;
      return prev;
    },
  );

  const onClick = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setIsSubmitting(true);

    const nextAction: "save" | "delete" = bookmarked ? "delete" : "save";
    pendingActionRef.current = nextAction;

    try {
      // 로그인 체크
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user) {
        const redirectTo = encodeURIComponent(`${pathname}`);
        router.push(`/login?redirectTo=${redirectTo}`);
        return;
      }

      if (authError) {
        console.error(authError);
        alert("로그인 상태 확인에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 서버 액션을 호출해서 해당 코스를 DB에 저장
      startTransition(() => {
        // 1) UI 토글 - optimistic 상태 업데이트
        setOptimistic({ type: "toggle" });
      });

      // 2) 북마크 저장하기
      const res = await saveBookmarkAction({
        snapshot: courseData,
        source_recommend_id: recommendId,
        course_key: courseData.id,
        pathname,
      });

      if (!res?.status || res.bookmarked == null) {
        startTransition(() => {
          setOptimistic({ type: "toggle" });
        });
        alert(res?.error ?? "북마크 처리에 실패했습니다");
        return;
      }

      startTransition(async () => {
        setOptimistic({ type: "set", value: res.bookmarked });
      });
    } finally {
      pendingActionRef.current = null;
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const disabled = isSubmitting;
  const pendingText =
    pendingActionRef.current === "delete" ? "삭제 중..." : "저장 중...";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-sm border border-border px-4 py-2 rounded-2xl ${bookmarked ? "bg-accent/80" : "bg-muted"} hover:bg-accent/60 cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
    >
      {disabled ? pendingText : bookmarked ? "저장됨" : "저장하기"}
    </button>
  );
}
