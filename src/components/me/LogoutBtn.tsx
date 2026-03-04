"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Ellipsis, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutBtn() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        console.error("signOut Error:", signOutError);
        alert("로그아웃 중 문제가 발생했습니다.");
        return;
      }

      router.replace("/");
      console.log("sign-out!");
    });
  };
  return (
    <button
      disabled={isPending}
      onClick={handleLogout}
      className="cursor-pointer p-2 rounded-md hover:bg-muted transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {isPending ? (
        <Ellipsis size={20} />
      ) : (
        <LogOut size={20} className="text-red-600" />
      )}
    </button>
  );
}
