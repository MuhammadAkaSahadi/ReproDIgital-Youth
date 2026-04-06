"use client";

import { Target, Trophy, Flame } from "lucide-react";
import { useGoalStore } from "@/store/useGoalStore";

export function ProgressOverview() {
  const { goals } = useGoalStore();
  
  const totalAktif = goals.filter(g => g.status === 'Aktif').length;
  // Ini logika statik / dummy untuk demonstrasi bulan ini
  const tercapaiBulanIni = goals.filter(g => g.status === 'Tercapai').length; 
  const streak = 12; // Static dummy "12 hari berturut-turut"

  return (
    <div className="bg-white py-12 px-6 md:px-8 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Mobile Horizontal Scroll Container */}
        <div className="flex flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-4 sm:pb-0 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}} />

          {/* Card 1: Total Tujuan */}
          <div className="shrink-0 w-[240px] md:w-auto md:flex-1 bg-gradient-to-br from-teal-600 to-teal-500 rounded-xl p-8 text-white relative overflow-hidden shadow-sm snap-start group hover:-translate-y-1 transition-all duration-300 hover:shadow-hover">
            <Target className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white opacity-20 group-hover:scale-110 transition-transform duration-500" />
            <p className="text-[12px] font-bold tracking-widest uppercase mb-2 opacity-90">Total Tujuan</p>
            <p className="text-[40px] font-heading font-bold mb-1 leading-none">{totalAktif}</p>
            <p className="text-[14px] font-medium opacity-90 mt-2">tujuan aktif</p>
          </div>

          {/* Card 2: Dicapai Bulan Ini */}
          <div className="shrink-0 w-[240px] md:w-auto md:flex-1 bg-gradient-to-br from-coral-500 to-peach-400 rounded-xl p-8 text-white relative overflow-hidden shadow-sm snap-start group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(255,122,92,0.25)]">
            <Trophy className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white opacity-20 group-hover:scale-110 transition-transform duration-500" />
            <p className="text-[12px] font-bold tracking-widest uppercase mb-2 opacity-90">Dicapai Bulan Ini</p>
            <p className="text-[40px] font-heading font-bold mb-1 leading-none">{tercapaiBulanIni}</p>
            <p className="text-[14px] font-medium opacity-90 mt-2">tujuan tercapai</p>
          </div>

          {/* Card 3: Streak Harian */}
          <div className="shrink-0 w-[240px] md:w-auto md:flex-1 bg-gradient-to-br from-green-500 to-green-400 rounded-xl p-8 text-white relative overflow-hidden shadow-sm snap-start group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(34,197,94,0.25)]">
            <Flame className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white opacity-20 group-hover:scale-110 transition-transform duration-500" />
            <p className="text-[12px] font-bold tracking-widest uppercase mb-2 opacity-90">Streak Harian</p>
            <p className="text-[40px] font-heading font-bold mb-1 leading-none">{streak}</p>
            <p className="text-[14px] font-medium opacity-90 mt-2">hari berturut-turut</p>
          </div>

        </div>
      </div>
    </div>
  );
}
