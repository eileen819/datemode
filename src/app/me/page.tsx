"use client";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  // const supabase = await createSupabaseServerClient();
  // const { data } = await supabase.auth.getUser();

  // const user = data.user;

  const [active, setActive] = useState<"history" | "bookmark">("history");

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-4">내 활동</h1>
      <div className="rounded-md bg-card shadow-sm flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border bg-blue-300"></div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">사용자</span>
            <span className="text-sm text-muted-foreground">
              user@email.com
            </span>
          </div>
        </div>
        <button className="cursor-pointer p-2 rounded-md hover:bg-muted transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <LogOut size={20} className="text-red-600" />
        </button>
      </div>
      <div className="grid grid-cols-2 border-b border-border">
        <button
          className={`cursor-pointer pt-4 pb-2 transition duration-300 ease-in-out ${active === "history" ? "text-foreground font-semibold border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          검색 히스토리
        </button>
        <button
          className={`cursor-pointer pt-4 pb-2 transition duration-300 ease-in-out ${active === "bookmark" ? "text-foreground font-semibold border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          북마크한 코스
        </button>
      </div>
      <div className="mt-6 py-10 bg-card shadow-sm rounded-md flex flex-col justify-center items-center">
        <Image
          src="/empty-folder.png"
          width={130}
          height={130}
          alt="empty-folder-image"
          className="mb-2"
        />
        <p className="text-lg font-semibold">📂 아직 검색 기록이 없어요</p>
        <p className="text-sm text-muted-foreground">AI 추천을 받아보세요</p>
        <button className="cursor-pointer mt-2 text-sm rounded-full bg-accent border border-border px-3 py-1 hover:bg-foreground hover:text-accent transition duration-200 ease-in-out">
          코스 추천받기
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
        {new Array(3).fill("card").map((a, i) => (
          <div
            key={i}
            className="cursor-pointer rounded-md bg-card w-full px-4 shadow-xs border border-border hover:shadow-sm hover:-translate-y-0.5 transition duration-200"
          >
            <div className="flex justify-between items-center border-b border-border py-3 px-2">
              <div className="space-x-2 text-center text-sm">
                <span>성수</span>
                <span>오후</span>
                <span>산책</span>
              </div>
              <div className="text-sm px-3 py-1 rounded-full bg-accent border border-border hover:bg-foreground hover:text-accent transition duration-200 ease-in-out">
                다시보기
              </div>
            </div>
            <div className="text-sm text-muted-foreground py-3 px-2">
              2026.02.28
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
