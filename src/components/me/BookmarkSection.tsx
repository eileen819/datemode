import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CourseCard from "../recommend/CourseCard";
import { CourseSchema } from "@/lib/reco/output-schema";

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
  if (!bookmarkData || bookmarkData.length === 0)
    return <div>북마크가 없어요</div>;

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
    return <div>북마크는 존재하지만 데이터 형식이 달라 표시할 수 없어요.</div>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 py-6">
      {parsedSnapshot.map((p) => (
        <CourseCard key={p.parsedId} resultId={p.resultId} item={p.item} />
      ))}
    </div>
  );
}
