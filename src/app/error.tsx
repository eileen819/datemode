"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div className="flex justify-center items-center mt-10 text-muted-foreground">
      ❗️ 오류가 발생했습니다.
    </div>
  );
}
