import { createSupabaseServerClient } from "@/lib/supabase/server";
import { error } from "console";
import { NextResponse } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get("offset") ?? 0);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("id, created_at, source_recommend_id, snapshot")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE);

  if (bookmarksError || !bookmarksData) {
    return NextResponse.json(
      { error: bookmarksError.message },
      { status: 500 },
    );
  }

  const items = (bookmarksData ?? []).slice(0, PAGE_SIZE);
  const hasMore = (bookmarksData ?? []).length > PAGE_SIZE;

  return NextResponse.json({ items, hasMore, nextOffset: offset + PAGE_SIZE });
}
