import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let profile = null;
  // Ambil data dari tabel profiles yang dibuat oleh trigger on_auth_user_created
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  
  if (data) {
    profile = data;
  } else {
    // Fallback jika delay dari trigger create
    profile = {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Guest",
      email: user.email,
      role: "student",
    };
  }

  // SISTEM ROUTING BARU: Hanya admin dan konselor yang boleh ke /dashboard
  // Siswa atau entitas lain diarahkan ke landing page ("/")
  if (profile.role !== "admin" && profile.role !== "counselor") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-body">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[260px] border-r border-gray-200 bg-white">
        <DashboardSidebar profile={profile} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar profile={profile} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
