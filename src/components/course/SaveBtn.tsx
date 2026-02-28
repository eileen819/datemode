"use client";

import { saveBookmarkAction } from "@/actions/saveBookmarkAction";
import { CourseObj } from "@/lib/reco/output-schema";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SaveBtn({
  courseData,
  recommendId,
}: {
  courseData: CourseObj;
  recommendId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const supabase = createSupabaseBrowserClient();

  const onClick = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      throw new Error("로그인 확인 시에 에러가 발생했습니다.");
    }

    if (!session) {
      const redirectTo = encodeURIComponent(`${pathname}`);
      router.push(`/login?redirectTo=${redirectTo}`);
      return;
    }

    // 서버 액션을 호출해서 해당 코스를 DB에 저장
    startTransition(async () => {
      const res = await saveBookmarkAction({
        snapshot: courseData,
        source_recommend_id: recommendId,
        course_key: courseData.id,
      });
      if (res.error || !res.status) {
        alert(res.error);
      }
      if (!res.error && res.status) {
        // DB 저장 성공 시, 마이페이지로 이동
        router.push("/me?tab=bookmarks");
      }
    });
  };

  return (
    <button
      onClick={onClick}
      className="text-sm border border-border px-4 py-2 rounded-2xl bg-muted hover:bg-accent/60 cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {isPending ? "저장 중..." : "저장하기"}
    </button>
  );
}
