import CourseDetailView from "@/components/common/CourseDetailView";
import { CourseSchema } from "@/lib/reco/output-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookmarkId: string }>;
}): Promise<Metadata> {
  const { bookmarkId } = await params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      title: "북마크 코스",
      description: "로그인 후 북마크한 코스를 확인할 수 있어요.",
    };
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("snapshot")
    .eq("id", bookmarkId)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return {
      title: "코스를 찾을 수 없음",
      description: "요청하신 북마크 코스를 찾을 수 없습니다.",
    };
  }

  const parsed = CourseSchema.safeParse(data.snapshot);
  if (!parsed.success) {
    return {
      title: "코스를 찾을 수 없음",
      description: "요청하신 북마크 코스를 찾을 수 없습니다.",
    };
  }

  const course = parsed.data;
  const summary =
    (course.summary && course.summary.trim()) ||
    "북마크한 코스 상세 정보를 확인할 수 있어요.";

  return {
    title: course.title,
    description: summary,
    openGraph: {
      title: course.title,
      description: summary,
    },
  };
}

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
