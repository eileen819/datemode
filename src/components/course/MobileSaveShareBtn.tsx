export default function MobileSaveShareBtn() {
  return (
    <div className="md:hidden flex justify-center items-center gap-2 mt-2">
      <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-muted hover:bg-accent/60 cursor-pointer">
        저장하기
      </button>
      <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer">
        공유하기
      </button>
    </div>
  );
}
