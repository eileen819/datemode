import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
    console.log("sign-out!");
  };
  return (
    <button className="cursor-pointer p-2 rounded-md hover:bg-muted transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <LogOut onClick={handleLogout} size={20} className="text-red-600" />
    </button>
  );
}
