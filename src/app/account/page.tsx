import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  const user = data.user;

  return (
    <div>
      {user ? (
        <span>로그인 됨 ✅: {user.email}</span>
      ) : (
        <span>미로그인 ❌</span>
      )}
    </div>
  );
}
