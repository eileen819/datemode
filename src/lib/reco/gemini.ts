import * as z from "zod";
import { GoogleGenAI } from "@google/genai";
import { RecommendResponseSchema } from "./output-schema";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateRecommend(prompt: string) {
  if (!prompt.trim()) {
    return { status: false, error: "프롬프트가 비어있습니다." };
  }

  if (!apiKey) {
    return {
      status: false,
      error: "서버 설정 오류가 발생했습니다.",
    };
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema
          ? z.toJSONSchema(RecommendResponseSchema)
          : undefined,
      },
    });

    const text = response.text;
    if (!text || !text?.trim()) {
      throw new Error("AI가 응답을 생성하지 못했습니다.");
    }

    const json = JSON.parse(text);
    const validateData = RecommendResponseSchema.safeParse(json);
    if (!validateData.success) {
      console.error("Zod Validation Error:", validateData.error.message);
      return {
        status: false,
        error: "AI가 생성한 데이터의 형식이 맞지 않습니다.",
      };
    }

    return {
      status: true,
      data: validateData.data,
    };
  } catch (error) {
    console.error("GenerateRecommend Error:", error);
    return {
      status: false,
      error: "추천 데이터를 생성하는 중에 오류가 발생했습니다.",
    };
  }
}
