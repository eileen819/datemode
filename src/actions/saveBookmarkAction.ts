"use server";

import { saveBookmarkInputSchema } from "@/components/me/saveBookmarkInputSchema";
import { CourseObj, CourseSchema } from "@/lib/reco/output-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ISaveBookmarkInput {
  snapshot: unknown;
  source_recommend_id: string;
  course_key: CourseObj["id"];
  pathname: string;
}

export async function saveBookmarkAction(input: ISaveBookmarkInput) {
  // 테이블에 입력할 데이터 검증
  // 1) bookmark Input 데이터 검증
  const bookmarkInput = saveBookmarkInputSchema.safeParse(input);
  if (!bookmarkInput.success) {
    return {
      status: false,
      error: "bookmarkInput: 원본 데이터 형식이 올바르지 않습니다.",
    };
  }

  const { snapshot, source_recommend_id, course_key } = bookmarkInput.data;

  // 2) snapshot 데이터 검증
  const parsed = CourseSchema.safeParse(snapshot);
  if (!parsed.success) {
    return {
      status: false,
      error: "원본 데이터 형식이 올바르지 않습니다.",
    };
  }

  // 3) 정합성: course_key와 snapshot.id 일치 확인
  if (parsed.data.id !== course_key) {
    return {
      status: false,
      error: "MISMATCH: snapshot.id와 course_key가 일치하지 않습니다.",
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

  // 토글 로직
  // DB insert 시도
  const { error: insertError } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    source_recommend_id: source_recommend_id,
    snapshot: parsed.data,
    course_key: course_key,
  });

  // 1) insert 성공 = 북마크 저장(true)
  if (!insertError) {
    if (input.pathname) {
      revalidatePath(input.pathname);
    }
  }

  // 2) insertError === 사실상 북마크 데이터 삭제
  if (insertError) {
    // 중복 저장(UNIQUE 위반)시 북마크 데이터 삭제하기
    if (insertError.code === "23505") {
      const { error: deleteError } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("source_recommend_id", source_recommend_id)
        .eq("course_key", course_key);

      if (deleteError) {
        return {
          status: false,
          error: "DB_ERROR: 북마크 삭제에 실패했습니다",
        };
      }

      if (input.pathname) {
        revalidatePath(input.pathname);
      }
    } else {
      // insert 과정에서 그 외의 에러 발생
      return {
        status: false,
        error: "DB_ERROR: 북마크 저장에 실패했습니다.",
      };
    }
  }

  return {
    status: true,
    error: "",
  };
}
