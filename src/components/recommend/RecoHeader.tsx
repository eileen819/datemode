import { DataRequest } from "@/lib/reco/input-schema";
import ReRecommendationBtn from "./ReRecommendationBtn";

export default function RecoHeader({
  inputData,
  resultId,
}: {
  inputData: DataRequest;
  resultId: string;
}) {
  const { region, timeslot, budget, categories } = inputData;
  return (
    <section className="flex justify-between items-center">
      <div className="flex-1 pb-2 flex flex-col gap-1">
        <h1 className="text-2xl font-bold">AI 추천 코스</h1>
        <div className="flex flex-wrap items-center text-xs md:text-sm text-muted-foreground">
          <span>{region}</span>
          <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
          <span>{timeslot}</span>
          <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
          <span>{budget}</span>
          <span className="mx-2 w-1 h-1 rounded-full bg-accent-hover shrink-0" />
          <span>{categories.join(" | ")}</span>
        </div>
      </div>
      <div className="shrink-0">
        <ReRecommendationBtn resultId={resultId} />
      </div>
    </section>
  );
}
