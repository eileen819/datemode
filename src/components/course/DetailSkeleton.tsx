export default function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:px-8 md:py-4">
      {/* 헤드 스켈레톤 */}
      <div className="space-y-2">
        <div className="h-9 w-75 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        <div className="h-6 w-75 bg-muted-foreground/20 animate-pulse rounded-md"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* 지도 스켈레톤 */}
        <div className="w-full md:w-3/5 h-64 md:h-85 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        {/* 카드 스켈레톤 */}
        <div className="flex flex-col w-full md:w-2/5 gap-4">
          <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
          <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
          <div className="w-full h-24 bg-muted-foreground/20 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
