"use client";

import { useProfileStore, Badge } from "@/store/useProfileStore";
import { Lock, Star, BookOpen, Award, Flame, Target, Share2, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function getBadgeIcon(iconType: string, isEarned: boolean) {
  const colorClass = isEarned ? "text-teal-600 fill-teal-100" : "text-gray-400";
  const sizeClass = "w-12 h-12";
  
  switch (iconType) {
    case "star": return <Star className={`${sizeClass} ${isEarned ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />;
    case "book": return <BookOpen className={`${sizeClass} ${isEarned ? "text-blue-500 fill-blue-100" : "text-gray-400"}`} />;
    case "award": return <Award className={`${sizeClass} ${isEarned ? "text-purple-500 fill-purple-100" : "text-gray-400"}`} />;
    case "flame": return <Flame className={`${sizeClass} ${isEarned ? "text-orange-500 fill-orange-100" : "text-gray-400"}`} />;
    case "target": return <Target className={`${sizeClass} ${isEarned ? "text-red-500" : "text-gray-400"}`} />;
    case "share": return <Share2 className={`${sizeClass} ${isEarned ? "text-teal-500" : "text-gray-400"}`} />;
    default: return <ShieldCheck className={`${sizeClass} ${isEarned ? "text-teal-500" : "text-gray-400"}`} />;
  }
}

export function TabBadge({ badges = [] }: { badges: any[] }) {
  const earnedCount = badges.filter(b => b.dateEarned).length;
  const totalCount = badges.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="w-full space-y-10">
      
      {/* Progress Overview Container */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-4xl">
        
        {/* Simple Progress Visualization (Since Shadcn doesn't have CircularProgress by default, we use a crafted one or customized standard progress) */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#0d9488" 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={283 - (283 * progressPercent) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-teal-700">{progressPercent}%</span>
            <span className="text-[10px] font-semibold text-teal-600/80 uppercase">Tercapai</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">Koleksi Badge Kamu</h3>
          <p className="text-gray-600 text-[16px] mb-4">
            Kamu telah mengeumpulkan <strong className="text-teal-600 text-lg">{earnedCount}</strong> dari <strong className="text-teal-600 text-lg">{totalCount}</strong> badge yang tersedia.
          </p>
          <div className="block md:w-3/4">
             <Progress value={progressPercent} className="h-2 bg-gray-100" indicatorColor="bg-teal-500" />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {badges.map((badge) => {
          const isEarned = !!badge.dateEarned;

          return (
            <div 
              key={badge.id}
              className={`relative aspect-[4/5] rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ${
                isEarned 
                  ? "bg-white border-2 border-teal-100 hover:border-teal-400 hover:shadow-lg hover:scale-105 hover:-rotate-1" 
                  : "bg-gray-50 border border-gray-200 grayscale opacity-60"
              }`}
            >
              {/* Lock Overlay for unearned badges */}
              {!isEarned && (
                <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm z-10">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                </div>
              )}

              {/* Badge Icon */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-sm mb-4 ${isEarned ? "bg-teal-50 border border-teal-100" : "bg-white border border-gray-200"}`}>
                {getBadgeIcon(badge.iconType, isEarned)}
              </div>

              {/* Content */}
              <h4 className={`font-bold text-[15px] mb-2 leading-tight ${isEarned ? "text-gray-900" : "text-gray-600"}`}>
                {badge.name}
              </h4>

              {isEarned ? (
                <span className="mt-auto items-center px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase rounded-md border border-teal-100">
                  {badge.dateEarned}
                </span>
              ) : (
                <div className="mt-auto w-full">
                  <p className="text-[11px] text-gray-500 mb-2 leading-tight line-clamp-2">{badge.requirement}</p>
                  <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
