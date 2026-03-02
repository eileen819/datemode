"use client";

import { deleteBookmarkAction } from "@/actions/deleteBookmarkAction";
import { Bookmark, Ellipsis } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DelBookmarkBtn() {
  const router = useRouter();
  const { bookmarkId } = useParams<{ bookmarkId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!bookmarkId) return;
    if (!confirm("북마크를 삭제하시겠습니까?")) return;

    startTransition(async () => {
      try {
        const res = await deleteBookmarkAction(bookmarkId);
        if (!res.status) {
          alert(res.error ?? "북마크 삭제에 실패했습니다.");
          return;
        }
        router.push("/me?tab=bookmarks");
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer"
    >
      {isPending ? <Ellipsis /> : <Bookmark size={32} fill="#b4f000" />}
    </button>
  );
}
