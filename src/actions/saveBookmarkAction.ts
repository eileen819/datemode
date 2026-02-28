"use server";

import { CourseSchema } from "@/lib/reco/output-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface ISaveBookmarkInput {
  snapshot: unknown;
  sourceRecommendId?: string | null;
}

export async function saveBookmarkAction({
  snapshot,
  sourceRecommendId,
}: ISaveBookmarkInput) {
  // 테이블에 입력할 데이터 검증
  const parsed = CourseSchema.safeParse(snapshot);
  if (!parsed.success) {
    return {
      status: false,
      error: "원본 데이터 형식이 올바르지 않습니다.",
    };
  }

  // getUser()로 진짜 로그인(권한)확인
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return {
      status: false,
      error: "UNAUTHORIZED: 사용자 권한이 없습니다.",
    };
  }

  // DB insert
  const { error: insertError } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    source_recommend_id: sourceRecommendId ?? null,
    snapshot: parsed.data,
  });

  if (insertError) {
    return {
      status: false,
      error: "DB_ERROR: 북마크 저장에 실패했습니다.",
    };
  }

  return {
    status: true,
    error: "",
  };
}
