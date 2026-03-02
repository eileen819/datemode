import { createSupabaseServerClient } from "./server";

export async function getRecommendationRow(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    } else {
      console.error(error);
      throw new Error("데이터를 찾을 수 없습니다!");
    }
  }
  if (!data) {
    return null;
  }

  return data;
}
