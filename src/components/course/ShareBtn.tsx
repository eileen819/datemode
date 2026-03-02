"use client";

import { useParams, usePathname } from "next/navigation";

export default function ShareBtn() {
  const pathname = usePathname();
  const params = useParams<{ id: string; courseId: string }>();

  const onShare = async () => {
    if (!params.id || !params.courseId) return;

    const url = `${window.location.origin}${pathname}`;
    const title = "추천 코스 공유";

    try {
      if (
        typeof window !== "undefined" &&
        typeof window.navigator.share === "function"
      ) {
        await window.navigator.share({ title, url });
        return;
      }

      if (
        typeof window !== "undefined" &&
        window.navigator.clipboard.writeText
      ) {
        await window.navigator.clipboard.writeText(url);
        alert("링크를 복사했어요!");
        return;
      }

      prompt("아래 링크를 복사해 공유하세요!", url);
    } catch (error) {
      console.error(error);
      prompt("아래 링크를 복사해 공유하세요!", url);
    }
  };

  return (
    <div className="relative inline-block group">
      <button
        onClick={onShare}
        className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        공유하기
      </button>
    </div>
  );
}
