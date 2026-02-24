import CourseList from "@/components/recommend/CourseList";
import RecoHeader from "@/components/recommend/RecoHeader";
import { DataRequestSchema } from "@/lib/reco/input-schema";
import { RecommendResponseSchema } from "@/lib/reco/output-schema";
import { getRecommendationRow } from "@/lib/supabase/getRecommendationRow";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const row = await getRecommendationRow(id);
  if (!row) {
    notFound();
  }

  const inputData = DataRequestSchema.safeParse(row.input_data);
  const aiResponse = RecommendResponseSchema.safeParse(row.ai_response);
  if (!inputData.success) {
    console.error(inputData.error);
    throw new Error(
      `입력 데이터 형식이 올바르지 않습니다: ${inputData.error.message}`,
    );
  }
  if (!aiResponse.success) {
    console.error(aiResponse.error);
    throw new Error(
      `추천 데이터 형식이 올바르지 않습니다: ${aiResponse.error.message}`,
    );
  }
  const validateInputData = inputData.data;
  const validateResponse = aiResponse.data;

  return (
    <div>
      <RecoHeader resultId={id} inputData={validateInputData} />
      <CourseList resultId={id} courses={validateResponse.courses} />
    </div>
  );
}
