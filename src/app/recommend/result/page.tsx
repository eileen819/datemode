import { mockRecommend } from "@/lib/mock/recommend";
import { Clock3 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <section className="flex justify-between items-center">
        <div className="flex-1 pb-2 flex flex-col gap-1">
          <h1 className="text-2xl font-bold">AI 추천 코스</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground">
            <span>성수</span>
            <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
            <span>4시간</span>
            <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
            <span>3~6만원</span>
            <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
            <span>카페 | 산책</span>
          </div>
        </div>
        <div className="shrink-0">
          <button className="cursor-pointer text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-accent/30 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            다시 추천
          </button>
        </div>
      </section>
      <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRecommend.courses.map((item) => (
          <Link
            href={`/recommend/result/${item.id}`}
            key={item.id}
            className="block min-w-0 w-full bg-card border border-border rounded-xl p-5 shadow-sm transition will-change-transform hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <article className="flex flex-col h-full">
              <h2 className="text-lg font-semibold line-clamp-2">
                {item.title}
              </h2>
              <div className="flex w-full min-w-0 lg:flex-wrap lg:items-start gap-2 my-3 overflow-x-auto whitespace-nowrap lg:overflow-visible lg:whitespace-normal">
                {item.spots.map((place) => (
                  <span
                    key={place.name}
                    className="inline-flex shrink-0 text-xs border border-border bg-accent px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    {place.name}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <div className="text-xs flex justify-center items-center gap-1 text-muted-foreground">
                  <Clock3 size={14} strokeWidth={2.25} className="p-0" />
                  <span>{item.durationHours}시간</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {item.tags.map((t) => (
                    <span key={t}>{`#${t}`}</span>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {item.summary}
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
