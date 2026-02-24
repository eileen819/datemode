import { Clock } from "lucide-react";
import SaveShareBtn from "./SaveShareBtn";

export default function CourseHeader({
  title,
  durationHours,
  tags,
}: {
  title: string;
  durationHours: number;
  tags: string[];
}) {
  return (
    <header className="md:flex md:justify-between md:items-center border-b border-border/60 md:border-none pb-4">
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
      <div className="hidden md:flex md:justify-center md:items-center md:gap-2">
        <SaveShareBtn />
      </div>
    </header>
  );
}
