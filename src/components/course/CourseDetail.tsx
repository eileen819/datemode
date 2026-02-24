export default function CourseDetail({
  summary,
  spots,
}: {
  summary: string;
  spots: { name: string; reason: string }[];
}) {
  return (
    <div className="md:flex md:items-start md:gap-6">
      <div className="md:w-3/5 md:space-y-4 md:py-4">
        {/* 코스 요약 */}
        <section className="py-2 px-1 md:p-0">
          <p className="text-sm leading-6 text-foreground break-keep">
            {summary}
          </p>
        </section>

        {/* 지도 영역 */}
        <section className="w-full h-64 bg-gray-300">
          <div>지도 영역</div>
        </section>
      </div>
      {/* 카드 영역 */}
      <section className="space-y-3 md:w-2/5 py-4">
        {spots.map((spot, i) => (
          <article
            key={spot.name}
            className="bg-accent/10 rounded-xl border border-border p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              {i + 1}. {spot.name}
            </h2>
            <p className="pl-4 text-sm text-muted-foreground break-keep">
              {spot.reason}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
