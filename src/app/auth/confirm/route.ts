import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const returnTo = searchParams.get("returnTo") ?? "/me";

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

  const safePath =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/me";

  return NextResponse.redirect(new URL(safePath, origin));
}
