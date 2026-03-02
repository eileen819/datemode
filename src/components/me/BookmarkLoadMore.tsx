/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CourseSchema } from "@/lib/reco/output-schema";
import { useState, useTransition } from "react";
import CourseCard from "../recommend/CourseCard";
import { RowItem } from "@/types";

export default function BookmarkLoadMore({
  initialOffset,
  initialRow,
  initialHasMore,
}: {
  initialOffset: number;
  initialRow: RowItem[];
  initialHasMore: boolean;
}) {
  const [row, setRow] = useState(initialRow);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const [isPending, startTransition] = useTransition();

  const handleMore = () => {
    startTransition(async () => {
      const res = await fetch(`/api/bookmarks?offset=${offset}`);
      if (!res.ok) {
        console.error(await res.text());
        alert("북마크 데이터를 더 불러오지 못했어요.");
        return;
      }
      const json = await res.json();

      const nextParsed =
        (json.items ?? []).flatMap((b: any) => {
          const parsed = CourseSchema.safeParse(b.snapshot);

          if (!parsed.success) {
            console.warn("Invalid bookmark snapshot", { bookmarkId: b.id });
            return [];
          }
          return [
            {
              item: parsed.data,
              resultId: b.source_recommend_id,
              parsedId: b.id,
            },
          ];
        }) ?? [];

      setRow((prev) => [...prev, ...nextParsed]);
      setOffset(json.nextOffset);
      setHasMore(Boolean(json.hasMore));
    });
  };

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
        {row.map((p) => (
          <CourseCard
            key={p.parsedId}
            item={p.item}
            mode={"bookmarks"}
            bookmarkId={p.parsedId}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pb-10">
          <button
            onClick={handleMore}
            disabled={isPending}
            className="cursor-pointer text-sm rounded-full bg-accent border border-border px-4 py-2 hover:bg-foreground hover:text-accent transition focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          >
            {isPending ? "불러오는 중..." : "더보기"}
          </button>
        </div>
      )}
    </>
  );
}
