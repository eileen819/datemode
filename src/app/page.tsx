import { Search } from "lucide-react";

const chipBase =
  "cursor-pointer border border-border bg-card rounded-2xl py-1.5 px-4 text-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">오늘 어디서 놀래? 😎</h1>
      <section>
        <h2 className="text-sm font-bold mb-2">📍 지역</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {["강남", "홍대", "성수", "잠실", "용산"].map((item) => (
            <button key={item} className={chipBase}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center border border-border w-full bg-background h-10 rounded-3xl px-4 focus-within:border-accent transition-colors duration-150 ease-in">
          <Search
            size={20}
            strokeWidth={2.25}
            className="mr-2 shrink-0 text-foreground/60"
          />
          <input
            type="text"
            placeholder="지역을 검색하세요"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm"
          />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-bold mb-2">🗂️ 카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {["맛집", "카페", "전시", "산책"].map((item) => (
            <button key={item} className={chipBase}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-bold mb-2">💰 예산</h2>
        <div className="flex flex-wrap gap-2">
          {["~3만원", "3~6만원", "6~10만원", "10만원+"].map((item) => (
            <button key={item} className={chipBase}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-bold mb-2">⏰ 시간대</h2>
        <div className="flex flex-wrap gap-2">
          {["오전(9~12시)", "오후(12~18시)", "저녁(18~22시)"].map((item) => (
            <button key={item} className={chipBase}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <button className="cursor-pointer bg-foreground text-accent border border-border rounded-3xl py-3 font-semibold active:scale-[0.99] transition hover:opacity-95 disabled:opacity-40 disabled:active:scale-100">
        코스 추천받기
      </button>
    </div>
  );
}
