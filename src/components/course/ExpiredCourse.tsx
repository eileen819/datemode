import Link from "next/link";

export default function ExpiredCourse() {
  return (
    <div className="mx-auto max-w-md py-20 text-center mt-20">
      <h1 className="text-xl font-bold">추천 코스가 만료되었어요</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        공유 링크는 일정 시간이 지나면 만료될 수 있어요.
        <br /> 새 코스를 추천받아보세요.
      </p>

      <div className="mt-6 flex justify-center gap-2">
        <Link
          href="/"
          className="text-sm rounded-full bg-accent border border-border px-4 py-2 hover:bg-foreground hover:text-accent transition"
        >
          새 추천 받기
        </Link>
        <Link
          href="/me?tab=history"
          className="text-sm rounded-full border border-border px-4 py-2 hover:bg-accent/60 transition"
        >
          내 기록 보기
        </Link>
      </div>
    </div>
  );
}
