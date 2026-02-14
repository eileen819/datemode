import { mockRecommend } from "@/lib/mock/recommend";
import { Clock3 } from "lucide-react";

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
          <button className="cursor-pointer text-sm border border-border rounded-lg px-3 py-1.5 bg-card hover:bg-accent/30 transition duration-200">
            다시 추천
          </button>
        </div>
      </section>
      <section className="mt-4 grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {mockRecommend.courses.map((item) => (
          <article
            key={item.id}
            className="bg-card border border-border rounded-xl p-5 shadow-sm transition will-change-transform hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <div className="flex flex-wrap gap-2 mb-2 mt-3">
              {item.spots.map((place) => (
                <span
                  key={place.name}
                  className="text-xs border border-border bg-accent px-3 py-1 rounded-full"
                >
                  {place.name}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <div className="text-xs flex justify-center items-center gap-1 text-muted-foreground">
                <Clock3 size={14} strokeWidth={2.25} className="p-0" />
                <span>{item.durationHours}시간</span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {item.tags.map((t) => (
                  <span key={t}>{`#${t}`}</span>
                ))}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {item.summary}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
