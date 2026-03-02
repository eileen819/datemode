"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateRecommend } from "@/lib/reco/gemini";
import { DataRequestSchema } from "@/lib/reco/input-schema";
import { createDateCoursePrompt } from "@/lib/reco/prompt";
import { toJson } from "@/lib/reco/to-json";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function reRecoFetchAction(resultId: string) {
  const supabase = await createSupabaseServerClient();

  // 로그인한 사용자 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      status: false,
      error: "로그인이 필요합니다.",
    };
  }

  // 기존 추천 가져오기
  const { data: rec, error: recError } = await supabase
    .from("recommendations")
    .select("id,user_id,anon_key,input_data")
    .eq("id", resultId)
    .single();

  if (recError || !rec) {
    return {
      status: false,
      error: "기존 추천 기록을 찾을 수 없습니다.",
    };
  }

  // 접근/귀속 규칙
  // 1) 이미 내 row면 패스
  if (rec.user_id === user.id) {
  } else if (rec.user_id == null) {
    // 2) 아직 비로그인 row면 anon_key 확인 후 claim
    const anonKey = (await cookies()).get("anon_key")?.value; // cookies()는 async :contentReference[oaicite:0]{index=0}
    if (!anonKey || rec.anon_key !== anonKey) {
      return { status: false, error: "비로그인 기록을 확인할 수 없습니다." };
    }

    const { error: claimError } = await supabase
      .from("recommendations")
      .update({ user_id: user.id })
      .eq("id", resultId)
      .is("user_id", null);

    if (claimError) {
      return { status: false, error: "기록 귀속 처리 중 오류가 발생했습니다." };
    }
  } else {
    // 3) 다른 사람 row면 차단
    return { status: false, error: "접근 권한이 없습니다." };
  }

  // 조회한 input_data 검증
  const validateInputData = DataRequestSchema.safeParse(rec.input_data);
  if (!validateInputData.success) {
    return {
      status: false,
      error: "원본 데이터 형식이 올바르지 않습니다.",
    };
  }

  // ai 응답 호출(프롬프트 생성 -> ai 호출)
  const prompt = createDateCoursePrompt(validateInputData.data);
  let newCreatedId: string;

  try {
    const result = await generateRecommend(prompt);
    if (!result.status || !result.data) {
      return {
        status: false,
        error: `AI 응답 오류: ${result.error ?? "데이터를 생성하지 못했습니다."}`,
      };
    }

    // supabase에 새 데이터 저장하기
    const { data: newData, error: insertError } = await supabase
      .from("recommendations")
      .insert({
        input_data: toJson(validateInputData.data),
        ai_response: toJson(result.data),
        user_id: user.id,
      })
      .select("id")
      .single();

    if (insertError || !newData) {
      console.error("DB Insert Error:", insertError);
      return { status: false, error: "추천 결과 저장 중 오류가 발생했습니다." };
    }
    newCreatedId = newData.id;
  } catch (error: any) {
    console.log(error);
    if (error.status === 503 || error.message?.includes("high demand")) {
      return {
        status: false,
        error:
          "현재 AI 서버에 사용자가 많아 처리가 지연되고 있습니다. 10초 뒤에 다시 시도해 주세요!",
      };
    }
    return {
      status: false,
      error: `알 수 없는 오류가 발생했습니다: ${error.message}`,
    };
  }
  redirect(`/recommend/result/${newCreatedId}`);
}
