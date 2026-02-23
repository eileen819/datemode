import { mockRecommend } from "@/lib/mock/recommend";
import { Clock } from "lucide-react";

export default function Course() {
  const data = mockRecommend.courses[0];

  return (
    <div className="mx-auto max-w-xl md:max-w-5xl px-4">
      {/* 헤더 영역 */}
      <header className="md:flex md:justify-between md:items-center border-b border-border/60 md:border-none pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{data.title}</h1>
          <div className="flex items-center gap-3 md:gap-6 pt-1 text-muted-foreground">
            <div className="inline-flex items-center gap-1.5">
              <Clock size={18} />
              <span>{data.durationHours}시간</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <span key={t} className="inline-flex items-center">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* md사이즈 이상에서 저장/공유버튼 */}
        <div className="hidden md:flex md:justify-center md:items-center md:gap-2">
          <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-muted hover:bg-accent/60 cursor-pointer">
            저장하기
          </button>
          <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer">
            공유하기
          </button>
        </div>
      </header>
      <div className="md:flex md:items-start md:gap-6">
        <div className="md:w-3/5 md:space-y-4 md:py-4">
          {/* 코스 요약 */}
          <section className="p-4 md:p-0">
            <p className="text-sm leading-6 text-foreground">{data.summary}</p>
          </section>

          {/* 지도 영역 */}
          <section className="w-full h-64 bg-gray-300">
            <div>지도 영역</div>
          </section>
        </div>
        {/* 카드 영역 */}
        <section className="space-y-3 md:w-2/5 py-4">
          {data.spots.map((spot, i) => (
            <article
              key={spot.name}
              className="bg-accent/10 rounded-xl border border-border p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {i + 1}. {spot.name}
              </h2>
              <p className="pl-4 text-sm text-muted-foreground">
                {spot.reason}
              </p>
              {i < data.spots.length - 1 && (
                <div className="pl-4 text-sm text-muted-foreground">
                  <span className="">도보 이동 {i}분</span>
                  <span>(추정)</span>
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
      {/* 모바일 하단 */}
      <div className="md:hidden flex justify-center items-center gap-2 mt-2">
        <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-muted hover:bg-accent/60 cursor-pointer">
          저장하기
        </button>
        <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer">
          공유하기
        </button>
      </div>
    </div>
  );
}
