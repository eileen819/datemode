import FilterPanel from "@/components/home/FilterPanel";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">오늘 어디서 놀래? 😎</h1>
      <FilterPanel />
      <button className="mt-2 cursor-pointer bg-foreground text-accent border border-border rounded-3xl py-3 font-semibold active:scale-[0.99] transition hover:opacity-95 disabled:opacity-40 disabled:active:scale-100">
        코스 추천받기
      </button>
    </div>
  );
}
