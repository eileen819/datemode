import { Clock } from "lucide-react";
import { CourseObj } from "@/lib/reco/output-schema";
import SaveBtn from "./SaveBtn";
import DelBookmarkBtn from "../me/DelBookmarkBtn";
import ShareBtn from "./ShareBtn";

export default function CourseHeader({
  title,
  durationHours,
  tags,
  courseData,
  recommendId,
  initialBookmarked,
  mode,
}: {
  title: string;
  durationHours: number;
  tags: string[];
  courseData: CourseObj;
  recommendId: string;
  initialBookmarked: boolean;
  mode: "recommend" | "bookmarks";
}) {
  return (
    <header className="flex justify-between items-center border-b border-border/60 md:border-none pb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-3 md:gap-6 pt-1 text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <Clock size={18} />
            <span>{durationHours}시간</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* md사이즈 이상에서 저장/공유버튼 */}
      {mode === "recommend" && (
        <div className="hidden md:flex md:flex-col">
          <div className="md:flex md:justify-center md:items-center md:gap-2">
            <SaveBtn
              courseData={courseData}
              recommendId={recommendId}
              initialBookmarked={initialBookmarked}
            />
            <ShareBtn />
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            공유 링크는 24시간 후 만료됩니다.
          </p>
        </div>
      )}
      {mode === "bookmarks" && <DelBookmarkBtn />}
    </header>
  );
}
