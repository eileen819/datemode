import CourseDetail from "@/components/course/CourseDetail";
import CourseHeader from "@/components/course/CourseHeader";
import KakaoMapProvider from "@/components/course/KakaoMapProvider";
import SaveShareBtn from "@/components/course/SaveShareBtn";
import { RecommendResponseSchema } from "@/lib/reco/output-schema";
import { getRecommendationRow } from "@/lib/supabase/getRecommendationRow";
import { notFound } from "next/navigation";

export default async function Course({
  params,
}: {
  params: Promise<{ id: string; courseId: string }>;
}) {
  const { id, courseId } = await params;

  // supabase에서 데이터 조회
  const row = await getRecommendationRow(id);
  if (!row) {
    notFound();
  }

  const aiResponse = RecommendResponseSchema.safeParse(row.ai_response);
  if (!aiResponse.success) {
    console.error(aiResponse.error);
    throw new Error(
      `추천 데이터 형식이 올바르지 않습니다: ${aiResponse.error.message}`,
    );
  }
  const validateResponse = aiResponse.data;
  const courseData = validateResponse.courses.find((c) => c.id === courseId);
  if (!courseData) {
    notFound();
  }
  return (
    <KakaoMapProvider>
      <div className="mx-auto max-w-xl md:max-w-5xl px-4">
        <CourseHeader
          title={courseData.title}
          durationHours={courseData.durationHours}
          tags={courseData.tags}
        />
        <CourseDetail summary={courseData.summary} spots={courseData.spots} />
        <div className="md:hidden flex justify-center items-center gap-2 mt-2">
          <SaveShareBtn />
        </div>
      </div>
    </KakaoMapProvider>
  );
}
