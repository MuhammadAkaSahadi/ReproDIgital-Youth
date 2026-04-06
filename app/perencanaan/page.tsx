import { ProgressOverview } from "./components/ProgressOverview";
import { GoalGrid } from "./components/GoalGrid";
import { PerencanaanHeader } from "./components/PerencanaanHeader";
import { AchievementSection } from "./components/AchievementSection";

export default function PerencanaanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
      
      {/* 2. Page Header (Desktop & Mobile) */}
      <PerencanaanHeader />

      {/* 3. Progress Overview Section */}
      <ProgressOverview />
      
      {/* 4. Goals Overview Section */}
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-8 mt-12 mb-12">
        <GoalGrid />
      </div>

      {/* 7. Gamification Elements */}
      <AchievementSection />

    </div>
  );
}
