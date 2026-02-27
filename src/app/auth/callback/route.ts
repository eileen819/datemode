import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  console.log(origin);
  const code = searchParams.get("code");
  const returnTo = searchParams.get("returnTo") ?? "/me";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", origin));
  }

  const safePath =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/me";

  return NextResponse.redirect(new URL(safePath, origin));
}
