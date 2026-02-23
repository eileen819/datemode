"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h2>오류가 발생했습니다.</h2>
    </div>
  );
}
