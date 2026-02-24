"use client";

import recommendAction from "@/actions/recommendAction";
import { IFilter } from "@/types";
import { useActionState, useEffect } from "react";
import LoadingOverlay from "../common/LoadingOverlay";

export default function SubmitBtn({
  region,
  categories,
  budget,
  timeslot,
}: IFilter) {
  const [state, formAction, isPending] = useActionState(recommendAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <>
      {isPending && <LoadingOverlay isPending={isPending} />}
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
          className={`w-full mt-2 ${isPending ? "" : "cursor-pointer"} bg-foreground text-accent border border-border rounded-3xl py-3 font-semibold active:scale-[0.99] transition hover:opacity-95 disabled:opacity-40 disabled:active:scale-100`}
        >
          {isPending ? (
            <>
              <span className="inline-block animate-spin">🌀</span>
              <span> 코스 생성 중...</span>
            </>
          ) : (
            <span>코스 추천받기</span>
          )}
        </button>
      </form>
    </>
  );
}
