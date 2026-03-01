import CourseDetail from "@/components/course/CourseDetail";
import CourseHeader from "@/components/course/CourseHeader";
import KakaoMapProvider from "@/components/course/KakaoMapProvider";
import SaveBtn from "@/components/course/SaveBtn";
import { RecommendResponseSchema } from "@/lib/reco/output-schema";
import { getBookmarkStatus } from "@/lib/supabase/getBookmarkStatus";
import { getRecommendationRow } from "@/lib/supabase/getRecommendationRow";
import { notFound } from "next/navigation";

export default async function Course({
  params,
}: {
  params: Promise<{ id: string; courseId: string }>;
}) {
  const { id, courseId } = await params;

  // supabase에서 데이터 조회
  // 1) 전체 데이터 조회
  const row = await getRecommendationRow(id);
  if (!row) {
    notFound();
  }
  // 2) 북마크 데이터 조회
  const { isBookmarked } = await getBookmarkStatus(id, courseId);
  console.log(`SERVER BMdata: ${isBookmarked}`);

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
          courseData={courseData}
          recommendId={id}
          initialBookmarked={isBookmarked}
        />
        <CourseDetail summary={courseData.summary} spots={courseData.spots} />
        <div className="md:hidden flex justify-center items-center gap-2 mt-2">
          <SaveBtn
            courseData={courseData}
            recommendId={id}
            initialBookmarked={isBookmarked}
          />
          <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            공유하기
          </button>
        </div>
      </div>
    </KakaoMapProvider>
  );
}
