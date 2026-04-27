"use client";

import { useProfileStore } from "@/store/useProfileStore";
import { BookOpen, HelpCircle, Flame, Target, ArrowRight, ShieldCheck, Award, Star, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function getBadgeIcon(iconType: string) {
  switch (iconType) {
    case "star": return <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />;
    case "book": return <BookOpen className="w-8 h-8 text-blue-500 fill-blue-100" />;
    case "award": return <Award className="w-8 h-8 text-purple-500 fill-purple-100" />;
    case "flame": return <Flame className="w-8 h-8 text-orange-500 fill-orange-100" />;
    case "target": return <Target className="w-8 h-8 text-red-500" />;
    case "share": return <Share2 className="w-8 h-8 text-teal-500" />;
    default: return <ShieldCheck className="w-8 h-8 text-gray-500" />;
  }
}

export function TabIkhtisar({ summary, activeGoals = [], badges = [] }: {
  summary: any;
  activeGoals: any[];
  badges: any[];
}) {
  const recentEarnedBadges = badges.filter(b => b.dateEarned).slice(-5).reverse();

  return (
    <div className="w-full space-y-12">
      
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Artikel */}
        <div className="h-[140px] rounded-xl bg-linear-to-br from-teal-600 to-teal-500 shadow-md p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all text-white relative overflow-hidden group">
          <BookOpen className="w-10 h-10 absolute right-4 bottom-4 opacity-20 group-hover:scale-110 transition-transform" />
          <p className="text-teal-50 font-medium text-[14px]">Total Artikel Dibaca</p>
          <div>
            <h3 className="text-4xl font-bold">{summary.totalArtikel}</h3>
            <p className="text-teal-100 text-[12px] font-medium mt-1">+{summary.artikelBaruMingguIni} minggu ini</p>
          </div>
        </div>

        {/* Card 2 - Kuis */}
        <div className="h-[140px] rounded-xl bg-linear-to-br from-coral-500 to-peach-400 shadow-md p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all text-white relative overflow-hidden group">
          <HelpCircle className="w-10 h-10 absolute right-4 bottom-4 opacity-20 group-hover:scale-110 transition-transform" />
          <p className="text-orange-50 font-medium text-[14px]">Total Kuis Diikuti</p>
          <div>
            <h3 className="text-4xl font-bold">{summary.totalKuis}</h3>
            <p className="text-orange-100 text-[12px] font-medium mt-1">Sangat aktif!</p>
          </div>
        </div>

        {/* Card 3 - Streak */}
        <div className="h-[140px] rounded-xl bg-linear-to-br from-green-500 to-green-400 shadow-md p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all text-white relative overflow-hidden group">
          <Flame className="w-10 h-10 absolute right-4 bottom-4 opacity-20 group-hover:scale-110 transition-transform" />
          <p className="text-green-50 font-medium text-[14px]">Streak Harian</p>
          <div>
            <h3 className="text-4xl font-bold">{summary.streakHarian} <span className="text-xl font-medium">Hari</span></h3>
            <p className="text-green-100 text-[12px] font-medium mt-1">Luar biasa! Lanjutkan.</p>
          </div>
        </div>

        {/* Card 4 - Goal Aktif */}
        <div className="h-[140px] rounded-xl bg-linear-to-br from-purple-600 to-purple-500 shadow-md p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all text-white relative overflow-hidden group">
          <Target className="w-10 h-10 absolute right-4 bottom-4 opacity-20 group-hover:scale-110 transition-transform" />
          <p className="text-purple-50 font-medium text-[14px]">Total Goal Aktif</p>
          <div>
            <h3 className="text-4xl font-bold">{summary.totalGoalAktif}</h3>
            <p className="text-purple-100 text-[12px] font-medium mt-1">{summary.goalHampirSelesai} hampir selesai!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Goal Aktif Section (Takes up 2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-heading font-bold text-gray-900">Goal Aktif</h3>
            <Link href="/perencanaan" className="text-teal-600 font-semibold text-[14px] hover:text-coral-500 transition-colors flex items-center">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            {activeGoals.map(goal => (
              <div key={goal.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-teal-500 hover:shadow-md transition-all group flex flex-col md:flex-row gap-5 relative overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-[16px] mb-1 group-hover:text-teal-700 transition-colors">{goal.title}</h4>
                      <p className="text-[13px] font-medium text-coral-500">{goal.category}</p>
                    </div>
                    <div className="text-left md:text-right mt-2 md:mt-0">
                      <p className="text-[13px] font-semibold text-gray-700">{goal.deadline}</p>
                      <p className="text-[12px] text-gray-500">{goal.daysLeft} hari lagi</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[13px] font-semibold text-gray-700">{goal.completedSteps} dari {goal.totalSteps} langkah</span>
                      <span className="text-[13px] font-bold text-teal-600">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-gray-100" indicatorColor="bg-teal-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Terbaru Section (Takes up 1/3 width on desktop) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-heading font-bold text-gray-900">Badge Terbaru</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {recentEarnedBadges.slice(0, 4).map(badge => (
              <div key={badge.id} className="aspect-square bg-gray-50 border border-teal-100 rounded-xl flex flex-col items-center justify-center p-4 hover:scale-105 hover:shadow-md hover:bg-white transition-all text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  {getBadgeIcon(badge.iconType)}
                </div>
                <h4 className="font-bold text-gray-900 text-[14px] leading-tight mb-1">{badge.name}</h4>
                <p className="text-[11px] text-gray-500">{badge.dateEarned}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
