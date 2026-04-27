import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OnboardingForm } from "./components/OnboardingForm";

export const metadata = {
  title: "Lengkapi Profil - ReproDigital Youth",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Cek profile saat ini
  const { data: profile } = await supabase
    .from("profiles")
    .select("school_name, grade, full_name, role")
    .eq("id", user.id)
    .single();

  // Reverse intercept (seperti instruksi pengguna):
  // Jika user sudah pernah onboarding (data lengkap), paksa ke dashboard.
  if (profile && profile.role === "student" && profile.school_name && profile.grade) {
    redirect("/");
  }

  // Jika counselor atau admin tidak wajib onboarding (opsional), anggap aman ke dashboard
  // Namun dalam instruksi, ini ditargetkan khusus student.
  if (profile && profile.role !== "student") {
    redirect("/dashboard");
  }

  const defaultName = profile?.full_name || user.user_metadata?.full_name || "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12 px-6">
      <OnboardingForm defaultName={defaultName} />
    </div>
  );
}
