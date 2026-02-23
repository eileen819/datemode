"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateRecommend } from "@/lib/reco/gemini";
import { DataRequestSchema } from "@/lib/reco/input-schema";
import { createDateCoursePrompt } from "@/lib/reco/prompt";
import { toJson } from "@/lib/reco/to-json";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function recommendAction(_: any, formData: FormData) {
  // 제출 데이터 가지고 오기
  const inputData = {
    region: String(formData.get("region") ?? ""),
    categories: formData.getAll("categories").map(String),
    budget: String(formData.get("budget") ?? ""),
    timeslot: String(formData.get("timeslot") ?? ""),
  };

  // zod로 입력된 input데이터 검증하기
  const parsed = DataRequestSchema.safeParse(inputData);
  if (!parsed.success) {
    return { status: false, error: "원본 데이터 형식이 올바르지 않습니다." };
  }

  // 프롬프트 정의
  const prompt = createDateCoursePrompt(parsed.data);
  let createdId: string;

  try {
    // gemini 추천코스 응답 호출하기
    const result = await generateRecommend(prompt);
    if (!result.status || !result.data) {
      return {
        status: false,
        error: `AI 응답에 오류가 발생했습니다: ${result.error ?? "unknown"}`,
      };
    }

    // supabase DB에 ai 응답 저장하기
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("recommendations")
      .insert({
        input_data: toJson(parsed.data),
        ai_response: toJson(result.data),
      })
      .select("id")
      .single();
    if (error) {
      return {
        status: false,
        error: `DB 저장에 실패했습니다: ${error.message}`,
      };
    }
    createdId = data.id;
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

  // 페이지 이동 - redirect
  redirect(`/recommend/result/${createdId}`);
}
