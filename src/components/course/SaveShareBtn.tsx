export default function SaveShareBtn() {
  return (
    <>
      <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-muted hover:bg-accent/60 cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        저장하기
      </button>
      <button className="text-sm border border-border px-4 py-2 rounded-2xl bg-foreground text-muted hover:bg-accent/60 hover:text-foreground cursor-pointer transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        공유하기
      </button>
    </>
  );
}
