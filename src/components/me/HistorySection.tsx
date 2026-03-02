import { DataRequestSchema } from "@/lib/reco/input-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HistorySection() {
  const supabase = await createSupabaseServerClient();

  // 로그인 상태 확인하기
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;

  if (userError || !user) {
    console.error(userError);
    redirect(`/login?redirectTo=${encodeURIComponent("/me?tab=history")}`);
  }

  // 로그인한 사용자의 추천 기록을 DB에서 조회
  const { data: historyData, error: historyError } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (historyError) {
    throw new Error("검색 기록 데이터를 찾을 수 없어요!");
  }

  if (!historyData || historyData.length === 0) {
    return (
      <div className="mt-6 py-10 bg-card shadow-sm rounded-md flex flex-col justify-center items-center">
        <Image
          src="/empty-folder.png"
          width={100}
          height={100}
          alt="empty-folder-image"
          priority
          className="mb-4"
        />
        <p className="text-lg font-semibold">📂 아직 검색 기록이 없어요</p>
        <p className="text-sm text-muted-foreground">AI 추천을 받아보세요</p>
        <Link
          href="/"
          className="cursor-pointer mt-6 text-sm rounded-full bg-accent border border-border px-3 py-1 hover:bg-foreground hover:text-accent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          코스 추천받기
        </Link>
      </div>
    );
  }

  const parsedInput =
    historyData?.flatMap((h) => {
      const parsed = DataRequestSchema.safeParse(h.input_data);
      if (!parsed.success) {
        console.warn("Invalid input_data");
        return [];
      }
      const createdAtText = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(h.created_at));

      return [
        {
          id: h.id,
          inputData: parsed.data,
          createdAtText,
        },
      ];
    }) ?? [];

  if (parsedInput.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center mt-20">
        ❗️ 검색 기록은 존재하지만 데이터 형식이 달라 표시할 수 없어요.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
      {parsedInput.map((a) => (
        <div
          key={a.id}
          className="rounded-md bg-card w-full px-4 shadow-xs border border-border hover:shadow-sm hover:-translate-y-0.5 transition duration-200"
        >
          <div className="flex justify-between items-center border-b border-border py-3 px-2">
            <div className="flex justify-center items-center gap-1">
              <h2 className="font-semibold">{a.inputData.region}</h2>
              <div className="bg-accent w-1 h-1 rounded-full" />
              <p className="text-sm text-muted-foreground break-keep">
                {a.inputData.categories.join(" | ")}
              </p>
              <div className="bg-accent w-1 h-1 rounded-full" />
              <span className="text-sm text-muted-foreground">
                {a.inputData.timeslot.replace(/\(.*\)/, "").trim()}
              </span>
            </div>
            <Link
              href={`/recommend/result/${a.id}`}
              className="cursor-pointer text-sm px-3 py-1 rounded-full bg-accent border border-border hover:bg-foreground hover:text-accent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              다시보기
            </Link>
          </div>
          <div className="text-sm text-muted-foreground py-3 px-2">
            {a.createdAtText}
          </div>
        </div>
      ))}
    </div>
  );
}
