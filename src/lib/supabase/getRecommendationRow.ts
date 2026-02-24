import { createSupabaseServerClient } from "./server";

export async function getRecommendationRow(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`데이터 가져오기에 실패했습니다: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  return data;
}
