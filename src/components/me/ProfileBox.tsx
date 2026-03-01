import LogoutBtn from "./LogoutBtn";

export default function ProfileBox() {
  return (
    <div className="rounded-md bg-card shadow-sm flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-border bg-blue-300"></div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">사용자</span>
          <span className="text-sm text-muted-foreground">user@email.com</span>
        </div>
      </div>
      <LogoutBtn />
    </div>
  );
}
