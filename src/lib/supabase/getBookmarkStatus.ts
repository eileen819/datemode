import { createSupabaseServerClient } from "./server";

export async function getBookmarkStatus(id: string, courseId: string) {
  const supabase = await createSupabaseServerClient();

  // 1) 유저 확인
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData) {
    return {
      isBookmarked: false,
    };
  }
  const userId = userData.user.id;

  // 2) bookmarks에서 데이터 조회하기
  const { data: bookmarkData, error: bookmarkError } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("source_recommend_id", id)
    .eq("course_key", courseId)
    .maybeSingle();

  if (bookmarkError) {
    return {
      isBookmarked: false,
    };
  }

  return { isBookmarked: !!bookmarkData };
}
