import { CourseObj } from "@/lib/reco/output-schema";
import SaveBtn from "./SaveBtn";

export default function SaveShareArea({
  courseData,
  recommendId,
}: {
  courseData: CourseObj;
  recommendId: string;
}) {
  return (
    <>
      <SaveBtn courseData={courseData} recommendId={recommendId} />
    </>
  );
}
