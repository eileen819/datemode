import * as z from "zod";
import { GoogleGenAI } from "@google/genai";
import { RecommendResponseSchema } from "./output-schema";

const apiKey = process.env.GEMINI_API_KEY;

const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash-lite";

type RecommendResult =
  | { status: true; data: z.infer<typeof RecommendResponseSchema> }
  | { status: false; error: string };

function isRetryable503Error(error: unknown) {
  const err = error as {
    status?: string;
    code?: number | string;
    error?: {
      code?: number | string;
      status?: string;
      message?: string;
    };
    message?: string;
  };

  const code = err?.error?.code ?? err?.code;
  const status = err?.error?.status ?? err?.status;
  const message = err?.error?.message ?? err?.message ?? "";

  return (
    code === 503 ||
    code === "503" ||
    status === "UNAVAILABLE" ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  );
}

async function requestRecommend(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
) {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema
        ? z.toJSONSchema(RecommendResponseSchema)
        : undefined,
    },
  });

  const text = response.text;
  if (!text || !text.trim()) {
    throw new Error(`${model}: AI가 응답을 생성하지 못했습니다.`);
  }

  const json = JSON.parse(text);
  const validated = RecommendResponseSchema.safeParse(json);

  if (!validated.success) {
    console.error(`${model} Zod Validation Error:`, validated.error.message);
    throw new Error(`${model}: AI가 생성한 데이터 형식이 올바르지 않습니다.`);
  }

  return validated.data;
}

export async function generateRecommend(
  prompt: string,
): Promise<RecommendResult> {
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
    const data = await requestRecommend(ai, PRIMARY_MODEL, prompt);
    return {
      status: true,
      data,
    };
  } catch (error) {
    console.error(`${PRIMARY_MODEL} Error:`, error);

    if (!isRetryable503Error(error)) {
      return {
        status: false,
        error: "추천 데이터를 생성하는 중에 오류가 발생했습니다.",
      };
    }

    try {
      console.warn(
        `${PRIMARY_MODEL} 이 503/UNAVAILABLE 상태여서 ${FALLBACK_MODEL} 로 fallback 합니다.`,
      );

      const data = await requestRecommend(ai, FALLBACK_MODEL, prompt);

      return {
        status: true,
        data,
      };
    } catch (fallbackError) {
      console.error(`${FALLBACK_MODEL} Fallback Error:`, fallbackError);

      return {
        status: false,
        error:
          "현재 AI 요청이 많아 추천 데이터를 생성하지 못했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  }
}
