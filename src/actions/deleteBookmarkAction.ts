"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteBookmarkAction(bookmarkId: string) {
  const supabase = await createSupabaseServerClient();

  // 로그인 확인하기 (삭제 권한 확인)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      status: false,
      error: "UNAUTHORIZED: 사용자 권한이 없습니다.",
    };
  }

  // 북마크 삭제하기

  const { data: deleteData, error: deleteError } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", bookmarkId)
    .eq("user_id", user.id)
    .select("id")
    .single();

  if (deleteError || !deleteData) {
    return {
      status: false,
      error: "DB_ERROR: 북마크 삭제에 실패했습니다",
    };
  }

  return {
    status: true,
    error: "",
  };
}
