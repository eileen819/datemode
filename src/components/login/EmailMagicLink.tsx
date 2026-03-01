"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function EmailMagicLink() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [cooldown, setCooldown] = useState(0);

  const btnDisabled = status === "sending" || cooldown > 0;
  const inputDisabled = status === "sending" || status === "sent";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onSend = async () => {
    const normalized = email.trim();
    if (!normalized) {
      setStatus("error");
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    const redirectTo =
      searchParams.get("redirect_to") ?? searchParams.get("redirectTo");
    const next = redirectTo ? decodeURIComponent(redirectTo) : "/me";
    const nextPath = next.startsWith("/") ? next : `/${next}`;

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: {
        emailRedirectTo: `${location.origin}${nextPath}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("sent");
    setCooldown(60);
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={onChange}
        disabled={inputDisabled}
        className="h-10 border border-border rounded-md w-full py-1 px-3 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
      />
      <button
        onClick={onSend}
        disabled={btnDisabled}
        className="h-10 rounded-md border border-border bg-accent cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-95 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {status === "sending"
          ? "보내는 중..."
          : cooldown > 0
            ? `재전송 (${cooldown}s)`
            : "로그인 링크 보내기"}
      </button>
      {status === "sent" && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          메일을 보냈어요! 받은편지함/스팸함을 확인해주세요. <br />
          60초 후 재전송할 수 있어요
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-500 text-center mt-2">
          전송 실패: {errorMsg}
        </p>
      )}
    </div>
  );
}
