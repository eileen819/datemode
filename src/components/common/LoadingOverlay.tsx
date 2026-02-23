import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-5 flex flex-col justify-center items-center gap-4 bg-background/60 backdrop-blur-xs animate-pulse">
      <Loader2 className="h-10 w-10 animate-spin text-foreground" />
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">AI가 새로운 코스를 짜고 있어요</p>
        <p className="text-sm text-muted-foreground">잠시만 기다려 주세요!</p>
      </div>
    </div>
  );
}
