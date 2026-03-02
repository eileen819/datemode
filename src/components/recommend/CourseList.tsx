import { RecommendResponse } from "@/lib/reco/output-schema";
import CourseCard from "./CourseCard";

type CourseListProps = RecommendResponse & {
  resultId: string;
};

export default function CourseList({ courses, resultId }: CourseListProps) {
  return (
    <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((item) => (
        <CourseCard
          key={item.id}
          item={item}
          mode={"recommend"}
          resultId={resultId}
        />
      ))}
    </section>
  );
}
