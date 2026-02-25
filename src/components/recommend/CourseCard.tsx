import { RecommendResponse } from "@/lib/reco/output-schema";
import { Clock3 } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  resultId: string;
  item: RecommendResponse["courses"][number];
};

export default function CourseCard({ resultId, item }: CourseCardProps) {
  const { id, title, summary, durationHours, tags, spots } = item;
  return (
    <Link
      href={`/recommend/result/${resultId}/course/${id}`}
      className="flex h-full w-full min-w-0 bg-card border border-border rounded-xl p-5 shadow-sm transition will-change-transform hover:shadow-md hover:-translate-y-0.5 duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <article className="flex flex-col h-full min-w-0 w-full">
        <h2 className="text-balance break-keep text-lg font-semibold line-clamp-2 lg:min-h-6">
          {title}
        </h2>
        <div className="flex w-full min-w-0 lg:min-h-4 items-start gap-2 my-2 overflow-x-auto whitespace-nowrap lg:whitespace-normal content-start transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus:rounded-md">
          {spots.map((place) => (
            <span
              key={place.order}
              className="inline-flex shrink-0 text-xs border border-border bg-accent px-3 py-1 rounded-full whitespace-nowrap"
            >
              {place.nameHint.replace(/\s*\([^)]*\)/g, "")}
            </span>
          ))}
        </div>
        <div className="flex-1 mt-1 mb-3 text-sm text-muted-foreground break-keep">
          {summary}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="text-xs flex justify-center items-center gap-1 text-muted-foreground">
            <Clock3 size={14} strokeWidth={2.25} className="p-0" />
            <span>{durationHours}시간</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {tags.map((t) => (
              <span key={t}>{`#${t}`}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
