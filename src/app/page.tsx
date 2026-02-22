import FilterPanel from "@/components/home/FilterPanel";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">오늘 어디서 놀래? 😎</h1>
      <FilterPanel />
    </div>
  );
}
