import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const returnTo = url.searchParams.get("returnTo") ?? "/";

  if (!token_hash || !type) {
    return NextResponse.redirect(`${url.origin}/login?error=missing_token`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as "email",
  });
  if (error) {
    return NextResponse.redirect(`${url.origin}/login?error=verify_failed`);
  }

  return NextResponse.redirect(`${url.origin}${returnTo}`);
}
