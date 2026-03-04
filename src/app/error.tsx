"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 text-muted-foreground">
      <span>❗️ 오류가 발생했습니다. 잠시 후 다시 시도해주세요!</span>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="cursor-pointer border border-border rounded-md bg-foreground text-accent px-3 py-1 hover:bg-accent hover:text-foreground transition duration-200"
      >
        Retry
      </button>
    </div>
  );
}
