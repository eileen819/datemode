import { CourseObj } from "@/lib/reco/output-schema";
import CourseDetail from "../course/CourseDetail";
import CourseHeader from "../course/CourseHeader";
import KakaoMapProvider from "../course/KakaoMapProvider";
import SaveBtn from "../course/SaveBtn";
import ShareBtn from "../course/ShareBtn";

export default function CourseDetailView({
  courseData,
  isBookmarked,
  recommendId,
  mode,
}: {
  courseData: CourseObj;
  isBookmarked: boolean;
  recommendId?: string;
} & ({ mode: "recommend"; recommendId: string } | { mode: "bookmarks" })) {
  return (
    <KakaoMapProvider>
      <div className="mx-auto max-w-xl md:max-w-5xl px-4">
        <CourseHeader
          title={courseData.title}
          durationHours={courseData.durationHours}
          tags={courseData.tags}
          courseData={courseData}
          recommendId={recommendId!}
          initialBookmarked={isBookmarked}
          mode={mode}
        />
        <CourseDetail summary={courseData.summary} spots={courseData.spots} />
        {mode === "recommend" && (
          <>
            <div className="md:hidden flex justify-center items-center gap-2 mt-2">
              <SaveBtn
                courseData={courseData}
                recommendId={recommendId}
                initialBookmarked={isBookmarked}
              />
              <ShareBtn />
            </div>
            <p className="md:hidden mt-2 text-center text-xs text-muted-foreground">
              공유 링크는 24시간 후 만료됩니다.
            </p>
          </>
        )}
      </div>
    </KakaoMapProvider>
  );
}
