import Image from "next/image";

export default function HistorySection() {
  return (
    <>
      <div className="mt-6 py-10 bg-card shadow-sm rounded-md flex flex-col justify-center items-center">
        <Image
          src="/empty-folder.png"
          width={130}
          height={130}
          alt="empty-folder-image"
          priority
          className="mb-2"
        />
        <p className="text-lg font-semibold">📂 아직 검색 기록이 없어요</p>
        <p className="text-sm text-muted-foreground">AI 추천을 받아보세요</p>
        <button className="cursor-pointer mt-6 text-sm rounded-full bg-accent border border-border px-3 py-1 hover:bg-foreground hover:text-accent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          코스 추천받기
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
        {new Array(3).fill("card").map((a, i) => (
          <div
            key={i}
            className="rounded-md bg-card w-full px-4 shadow-xs border border-border hover:shadow-sm hover:-translate-y-0.5 transition duration-200"
          >
            <div className="flex justify-between items-center border-b border-border py-3 px-2">
              <div className="space-x-2 text-center text-sm">
                <span>성수</span>
                <span>오후</span>
                <span>산책</span>
              </div>
              <button className="cursor-pointer text-sm px-3 py-1 rounded-full bg-accent border border-border hover:bg-foreground hover:text-accent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                다시보기
              </button>
            </div>
            <div className="text-sm text-muted-foreground py-3 px-2">
              2026.02.28
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
