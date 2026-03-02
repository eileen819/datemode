import { CourseObj } from "@/lib/reco/output-schema";
import CourseDetail from "../course/CourseDetail";
import CourseHeader from "../course/CourseHeader";
import KakaoMapProvider from "../course/KakaoMapProvider";
import SaveBtn from "../course/SaveBtn";

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
          <div className="md:hidden flex justify-center items-center gap-2 mt-2">
            <SaveBtn
              courseData={courseData}
              recommendId={recommendId}
              initialBookmarked={isBookmarked}
            />
            <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              공유하기
            </button>
          </div>
        )}
      </div>
    </KakaoMapProvider>
  );
}
