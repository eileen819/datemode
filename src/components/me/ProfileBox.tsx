/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutBtn from "./LogoutBtn";
import { redirect } from "next/navigation";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";

export default async function ProfileBox() {
  noStore();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    if (authError) {
      console.error(authError);
    }
    redirect(`/login?redirectTo=${encodeURIComponent("/me?tab=bookmarks")}`);
  }

  const meta = (user.user_metadata ?? {}) as Record<string, any>;

  const name = meta.full_name || meta.name || "사용자";
  const avatar = meta.avatar_url || meta.picture || null;
  const email = user.email ?? null;

  return (
    <div className="rounded-md bg-card shadow-sm flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="flex justify-center items-center w-12 h-12">
            <Image
              src={avatar}
              width={50}
              height={50}
              alt="profile_image"
              className="rounded-full object-cover border border-border"
            />
          </div>
        ) : (
          <div className="bg-accent w-12 h-12 rounded-full border border-border" />
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{name}</span>
          <span className="text-sm text-muted-foreground">{email}</span>
        </div>
      </div>
      <LogoutBtn />
    </div>
  );
}
