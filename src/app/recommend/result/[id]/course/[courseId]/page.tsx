import CourseDetailView from "@/components/common/CourseDetailView";
import ExpiredCourse from "@/components/course/ExpiredCourse";
import { RecommendResponseSchema } from "@/lib/reco/output-schema";
import { getBookmarkStatus } from "@/lib/supabase/getBookmarkStatus";
import { getRecommendationRow } from "@/lib/supabase/getRecommendationRow";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; courseId: string }>;
}): Promise<Metadata> {
  const { id, courseId } = await params;
  const row = await getRecommendationRow(id);
  if (!row) {
    return {
      title: "코스를 찾을 수 없음",
      description: "요청하신 추천 코스를 찾을 수 없습니다.",
    };
  }
  const aiResponse = RecommendResponseSchema.safeParse(row.ai_response);
  if (!aiResponse.success) {
    return {
      title: "코스를 찾을 수 없음",
      description: "요청하신 추천 코스를 찾을 수 없습니다.",
    };
  }
  const validateResponse = aiResponse.data;
  const courseData = validateResponse.courses.find((c) => c.id === courseId);
  if (!courseData) {
    return {
      title: "코스를 찾을 수 없음",
      description: "요청하신 추천 코스를 찾을 수 없습니다.",
    };
  }
  return {
    title: courseData.title,
    description: courseData.summary,
    openGraph: {
      title: courseData.title,
      description: courseData.summary,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; courseId: string }>;
}) {
  const { id, courseId } = await params;

  // supabase에서 데이터 조회
  // 1) 전체 데이터 조회
  const row = await getRecommendationRow(id);
  if (!row) {
    return <ExpiredCourse />;
  }
  // 2) 북마크 데이터 조회
  const { isBookmarked } = await getBookmarkStatus(id, courseId);

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
    <CourseDetailView
      courseData={courseData}
      recommendId={id}
      isBookmarked={isBookmarked}
      mode={"recommend"}
    />
  );
}
