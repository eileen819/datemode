import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Suspense } from "react";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://datemode.vercel.app/"),
  title: {
    default: "DateMode",
    template: "%s | DateMode",
  },
  description:
    "취향과 상황에 맞춘 AI 데이트 코스 추천 서비스. 장소 선정부터 동선 구성까지 자동으로 완성된 하루를 경험하세요.",
  openGraph: {
    title: "DateMode",
    description:
      "취향과 상황에 맞춘 AI 데이트 코스 추천 서비스. 장소 선정부터 동선 구성까지 자동으로 완성된 하루를 경험하세요.",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className="font-sans">
        <div className="max-w-107.5 md:max-w-240 mx-auto min-h-dvh flex flex-col">
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-1 px-4 pb-24 pt-4 md:pb-6">{children}</main>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
          <footer className="hidden md:flex w-full items-center justify-center border-t border-border py-4 text-sm text-muted-foreground">
            {new Date().getFullYear()} | Copyright Eileen
          </footer>
        </div>
      </body>
    </html>
  );
}
