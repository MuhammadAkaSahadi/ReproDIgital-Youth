import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "./components/ProfileHeader";
import { TabIkhtisar } from "./components/TabIkhtisar";
import { TabAktivitas } from "./components/TabAktivitas";
import { TabBadge } from "./components/TabBadge";
import { TabPengaturan } from "./components/TabPengaturan";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profil Saya - ReproDigital Youth",
  description: "Kelola profil, lihat pencapaian, dan pengaturan akun ReproDigital Anda.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  // 2. Fetch Summary Statistics
  // Articles
  const { count: articlesCount } = await supabase
    .from("content_progress")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id)
    .eq("is_completed", true);

  // Quizzes
  const { count: quizzesCount } = await supabase
    .from("quiz_attempts")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id)
    .eq("is_passed", true);

  // Streak
  const { data: streakData } = await supabase
    .from("user_streaks")
    .select("current_streak")
    .eq("user_id", user.id)
    .single();

  // Active Goals
  const { data: goalsData } = await supabase
    .from("goals")
    .select("*, goal_milestones(id, is_completed)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("target_date", { ascending: true });

  const activeGoalsCount = goalsData?.length || 0;
  
  // Format goals for UI
  function calculateGoalDaysLeft(targetDate: string | null) {
    if (!targetDate) return 0;
    const diffTime = new Date(targetDate).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  const activeGoals = (goalsData || []).map(goal => {
    const milestones = goal.goal_milestones || [];
    const totalSteps = milestones.length;
    const completedSteps = milestones.filter((m: any) => m.is_completed).length;
    const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    
    return {
      id: goal.id,
      title: goal.title,
      category: goal.category === 'education' ? 'Pendidikan' : goal.category === 'career' ? 'Karir' : goal.category === 'health' ? 'Kesehatan' : 'Lainnya',
      progress,
      totalSteps,
      completedSteps,
      deadline: goal.target_date ? new Date(goal.target_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-',
      daysLeft: calculateGoalDaysLeft(goal.target_date),
    };
  });

  const goalHampirSelesai = activeGoals.filter(g => g.progress >= 80 && g.progress < 100).length;

  const summary = {
    totalArtikel: articlesCount || 0,
    artikelBaruMingguIni: 0, // Placeholder
    totalKuis: quizzesCount || 0,
    streakHarian: streakData?.current_streak || 0,
    totalGoalAktif: activeGoalsCount,
    goalHampirSelesai,
  };

  // 3. Fetch Badges
  const { data: globalBadges } = await supabase.from("badges").select("*").order("condition_value", { ascending: true });
  const { data: userBadgesData } = await supabase.from("user_badges").select("badge_id, earned_at").eq("user_id", user.id);
  
  const earnedBadgeMap = new Map((userBadgesData || []).map(ub => [ub.badge_id, ub.earned_at]));

  const badges = (globalBadges || []).map(badge => ({
    id: badge.id,
    name: badge.name,
    iconType: badge.icon,
    requirement: badge.description,
    dateEarned: earnedBadgeMap.has(badge.id) ? new Date(earnedBadgeMap.get(badge.id) as string).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined,
  }));

  // 4. Fetch Activities (Format it to match Activity store interface)
  const { data: rawActivities } = await supabase
    .from("daily_activities")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const formatRelativeTime = (dateStr: string) => {
    const dates = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dates.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} detik lalu`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
  };

  const activities = (rawActivities || []).map(act => {
    let type = "goal";
    let title = "Aktivitas";
    let desc = "Penyelesaian aktivitas";
    
    if (act.activity_type === 'read_content') {
      type = "artikel";
      title = "Membaca artikel informatif";
      desc = "Penyelesaian literasi bacaan";
    } else if (act.activity_type === 'complete_quiz') {
      type = "kuis";
      title = "Mengerjakan tes / kuis";
      desc = "Selesai dikerjakan";
    } else if (act.activity_type === 'login') {
      type = "kuis"; // using a valid fallback color
      title = "Login sistem";
      desc = "Check-in harian";
    }

    return {
      id: act.id,
      type: type as any,
      title: title,
      description: desc,
      timestamp: formatRelativeTime(act.created_at)
    };
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="w-full max-w-[1440px] mx-auto bg-white min-h-screen shadow-sm border-x border-gray-200/50">
        
        {/* Bagian Header Profil */}
        <ProfileHeader profile={profile} />

        {/* Tab Navigation Section */}
        <div className="sticky top-[64px] lg:top-[80px] z-30 bg-white border-b border-gray-200">
          <div className="px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="ikhtisar" className="w-full">
              <TabsList className="w-full justify-start h-14 bg-transparent p-0 overflow-x-auto snap-x hidden-scrollbar rounded-none space-x-8">
                <TabsTrigger 
                  value="ikhtisar" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Ikhtisar
                </TabsTrigger>
                <TabsTrigger 
                  value="aktivitas" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Aktivitas
                </TabsTrigger>
                <TabsTrigger 
                  value="badge" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Badge
                </TabsTrigger>
                <TabsTrigger 
                  value="pengaturan" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Pengaturan
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ikhtisar" className="pt-8 animate-in fade-in duration-400">
                <TabIkhtisar summary={summary} activeGoals={activeGoals} badges={badges} />
              </TabsContent>
              
              <TabsContent value="aktivitas" className="pt-8 animate-in fade-in duration-400">
                <TabAktivitas activities={activities} />
              </TabsContent>
              
              <TabsContent value="badge" className="pt-8 animate-in fade-in duration-400">
                <TabBadge badges={badges} />
              </TabsContent>
              
              <TabsContent value="pengaturan" className="pt-8 animate-in fade-in duration-400 pb-12">
                <TabPengaturan profile={profile} />
              </TabsContent>
              
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
