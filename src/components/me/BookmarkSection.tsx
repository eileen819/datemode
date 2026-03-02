import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CourseCard from "../recommend/CourseCard";
import { CourseSchema } from "@/lib/reco/output-schema";
import Link from "next/link";
import Image from "next/image";

export default async function BookmarkSection() {
  const supabase = await createSupabaseServerClient();

  // 로그인 상태 확인하기
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;

  if (userError || !user) {
    console.error(userError);
    redirect(`/login?redirectTo=${encodeURIComponent("/me?tab=bookmarks")}`);
  }

  // 북마크 데이터 조회하기
  const { data: bookmarkData, error: bookmarkError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (bookmarkError) {
    throw new Error("북마크 데이터를 찾을 수 없어요!");
  }

  if (!bookmarkData || bookmarkData.length === 0) {
    return (
      <div className="mt-6 py-10 bg-card shadow-sm rounded-md flex flex-col justify-center items-center">
        <Image
          src="/bookmark.png"
          width={100}
          height={100}
          alt="empty-folder-image"
          priority
          className="mb-4"
        />
        <p className="text-lg font-semibold">아직 북마크한 코스가 없어요</p>
        <p className="text-sm text-muted-foreground">
          AI 추천을 받고 코스를 저장해보세요!
        </p>
        <Link
          href="/"
          className="cursor-pointer mt-6 text-sm rounded-full bg-accent border border-border px-3 py-1 hover:bg-foreground hover:text-accent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          코스 추천받기
        </Link>
      </div>
    );
  }

  const parsedSnapshot =
    bookmarkData?.flatMap((b) => {
      const parsed = CourseSchema.safeParse(b.snapshot);

      if (!parsed.success) {
        console.warn("Invalid bookmark snapshot", { bookmarkId: b.id });
        return [];
      }
      return [
        {
          item: parsed.data,
          resultId: b.source_recommend_id,
          parsedId: b.id,
        },
      ];
    }) ?? [];

  if (parsedSnapshot.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center mt-20">
        ❗️ 북마크 기록은 존재하지만 데이터 형식이 달라 표시할 수 없어요.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
      {parsedSnapshot.map((p) => (
        <CourseCard
          key={p.parsedId}
          item={p.item}
          mode={"bookmarks"}
          bookmarkId={p.parsedId}
        />
      ))}
    </div>
  );
}
