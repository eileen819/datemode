"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function GoogleLoginBtn() {
  const searchParams = useSearchParams();

  const onGoogle = async () => {
    const redirectTo =
      searchParams.get("redirect_to") ?? searchParams.get("redirectTo");
    const next = redirectTo ? decodeURIComponent(redirectTo) : "/me";

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?redirectTo=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      throw new Error("Google 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <button
        onClick={onGoogle}
        className="flex justify-center items-center gap-2 h-10 rounded-md border border-border bg-white cursor-pointer hover:bg-muted transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Image
          src="/google-icon.png"
          width={18}
          height={18}
          alt="google-icon"
        />
        <span>Google로 로그인</span>
      </button>
    </div>
  );
}
