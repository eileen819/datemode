/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { ReactNode, useState } from "react";

declare global {
  interface Window {
    kakao?: any;
  }
}

export default function KakaoMapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`}
        onLoad={() => setIsLoaded(true)}
        onReady={() => setIsLoaded(true)}
        onError={(e) => console.error("Kakao SDK load error", e)}
      />
      {isLoaded && children}
    </>
  );
}
