import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const redirectRaw =
    searchParams.get("redirect_to") ?? searchParams.get("redirectTo") ?? "/me";

  console.log(redirectRaw);

  if (!token_hash || !type) {
    return NextResponse.redirect(new URL("/login?error=missing_token", origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as "magiclink" | "email",
  });
  if (error) {
    return NextResponse.redirect(new URL("/login?error=verify_failed", origin));
  }

  let target = redirectRaw;
  if (redirectRaw.startsWith("http://") || redirectRaw.startsWith("https://")) {
    try {
      const u = new URL(redirectRaw);
      if (u.origin === origin) {
        target = `${u.pathname}${u.search}`;
      } else {
        target = "/me";
      }
    } catch {
      target = "/me";
    }
  }

  const safePath =
    target.startsWith("/") && !target.startsWith("//") ? target : "/me";

  return NextResponse.redirect(new URL(safePath, origin));
}
