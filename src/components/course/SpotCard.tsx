import { verifiedSpot } from "@/lib/reco/verifySpot.client";
import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";

export default function SpotCard({
  spots,
  isLoading,
}: {
  spots: verifiedSpot[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="md:my-auto space-y-3 md:w-2/5 py-4">
        <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
      </section>
    );
  }

  return (
    <section className="md:my-auto space-y-3 md:w-2/5 py-4">
      {spots.map((spot, i) => (
        <article
          key={`${spot.order}-${i}`}
          className="flex flex-col gap-2 bg-accent/10 rounded-xl border border-border p-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex-1 flex gap-1">
              <span>{i + 1}. </span>
              <span className="break-keep">
                {spot.nameHint.replace(/\s*\([^)]*\)/g, "")}
              </span>
            </h2>

            {spot.mapStatus === "verified" && (
              <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <MapPin size={14} />
                지도 표시됨
              </span>
            )}
            {spot.mapStatus === "not_found" && (
              <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <AlertCircle size={14} /> 위치 미확인
              </span>
            )}
            {spot.mapStatus === "error" && (
              <span className="flex justify-center items-center gap-1 shrink-0 text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                <CheckCircle2 size={14} /> 검색 오류
              </span>
            )}
          </div>
          <p className="pl-4 text-sm text-muted-foreground break-keep">
            {spot.reason}
          </p>
        </article>
      ))}
    </section>
  );
}
