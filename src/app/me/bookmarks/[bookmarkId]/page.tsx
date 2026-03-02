import CourseDetailView from "@/components/common/CourseDetailView";
import { CourseSchema } from "@/lib/reco/output-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ bookmarkId: string }>;
}) {
  const { bookmarkId } = await params;
  // supabase에서 데이터 조회
  const supabase = await createSupabaseServerClient();

  // 로그인한 사용자 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error(authError);
    redirect(`/login?redirectTo=${encodeURIComponent("/me?tab=bookmarks")}`);
  }

  // 로그인한 사용자의 bookmark 데이터 DB 조회
  const { data: snapshotData, error: snapshotError } = await supabase
    .from("bookmarks")
    .select("snapshot")
    .eq("id", bookmarkId)
    .eq("user_id", user.id)
    .single();

  if (snapshotError || !snapshotData) {
    notFound();
  }

  const isBookmarked = snapshotData ? true : false;

  const parsed = CourseSchema.safeParse(snapshotData.snapshot);
  if (!parsed.success) {
    console.warn("원본 데이터 형식이 올바르지 않습니다.");
    notFound();
  }

  return (
    <CourseDetailView
      courseData={parsed.data}
      isBookmarked={isBookmarked}
      mode={"bookmarks"}
    />
  );
}
