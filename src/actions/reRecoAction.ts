"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateRecommend } from "@/lib/reco/gemini";
import { DataRequestSchema } from "@/lib/reco/input-schema";
import { createDateCoursePrompt } from "@/lib/reco/prompt";
import { toJson } from "@/lib/reco/to-json";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function reRecoFetchAction(resultId: string) {
  // input_data 조회
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recommendations")
    .select("input_data")
    .eq("id", resultId)
    .single();
  if (error || !data) {
    throw new Error(`기존 추천 기록을 찾을 수 없습니다.: ${error.message}`);
  }

  // 조회한 input_data 검증
  const validateInputData = DataRequestSchema.safeParse(data.input_data);
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
      })
      .select("id")
      .single();

    if (insertError) {
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
