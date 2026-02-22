"use server";

import { generateRecommend } from "@/lib/reco/gemini";
import { DataRequestSchema } from "@/lib/reco/input-schema";
import { createDateCoursePrompt } from "@/lib/reco/prompt";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return { status: false, error: "입력값이 올바르지 않습니다." };
  }
  // 프롬프트 정의
  const prompt = createDateCoursePrompt(parsed.data);

  let isSuccess = false;

  try {
    // gemini 추천코스 응답 호출하기
    const result = await generateRecommend(prompt);
    if (!result.status) {
      return {
        status: false,
        error: `AI 응답에 오류가 발생했습니다: ${result.error}`,
      };
    }
    console.log(result.data);

    // supabase DB에 ai 응답 저장하기

    // 모든 과정이 성공하면 isSuccess를 true로 변경
    isSuccess = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      error: `데이터 생성 중 오류가 발생했습니다. ${error}`,
    };
  }

  if (isSuccess) {
    // 페이지 이동 - redirect
    redirect("/recommend/result");
  }

  return {
    status: true,
    error: "",
  };
}
