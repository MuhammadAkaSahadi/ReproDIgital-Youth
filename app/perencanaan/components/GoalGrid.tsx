"use client";

import { useState } from "react";
import { useGoalStore, Goal } from "@/store/useGoalStore";
import { BookOpen, Briefcase, Activity, Banknote, User, Calendar, CheckSquare, Plus, Target } from "lucide-react";
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GoalDetailSheet } from "./GoalDetailSheet";
import { GoalFormDialog } from "./GoalFormDialog";

export function GoalGrid() {
  const { goals } = useGoalStore();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenDetail = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDetailOpen(true);
  };

  if (goals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
        <div className="relative mb-6">
          <Target className="w-20 h-20 text-gray-300" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border-2 border-gray-100 shadow-sm">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <h3 className="text-[22px] font-heading font-bold text-gray-900 mb-2">Belum Ada Tujuan</h3>
        <p className="text-[15px] text-gray-500 max-w-sm mb-6 leading-relaxed">Mulai rencanakan masa depanmu dengan menetapkan tujuan pertama yang ingin kamu capai.</p>
        <Button onClick={() => setIsFormOpen(true)} className="bg-coral-500 hover:bg-coral-600 text-white font-bold h-11 px-6 border-0 shadow-sm rounded-lg active:scale-95 transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Tujuan
        </Button>
        <GoalFormDialog isOpen={isFormOpen} onOpenChange={setIsFormOpen} />
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pendidikan': return <div className="w-[42px] h-[42px] rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><BookOpen className="w-[20px] h-[20px]" /></div>;
      case 'Karir': return <div className="w-[42px] h-[42px] rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><Briefcase className="w-[20px] h-[20px]" /></div>;
      case 'Kesehatan': return <div className="w-[42px] h-[42px] rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Activity className="w-[20px] h-[20px]" /></div>;
      case 'Keuangan': return <div className="w-[42px] h-[42px] rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0"><Banknote className="w-[20px] h-[20px]" /></div>;
      default: return <div className="w-[42px] h-[42px] rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0"><User className="w-[20px] h-[20px]" /></div>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    let style = "";
    if (priority === "Tinggi") style = "bg-red-50 text-red-600 border border-red-100";
    if (priority === "Sedang") style = "bg-yellow-50 text-yellow-600 border border-yellow-100";
    if (priority === "Rendah") style = "bg-gray-50 text-gray-600 border border-gray-100";
    return <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${style} shadow-xs`}>{priority}</span>;
  };

  return (
    <div className="w-full relative">
      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-1">
        <h2 className="text-[28px] font-heading font-bold text-gray-900 leading-none">Tujuanmu</h2>
        <div className="flex items-center gap-3">
          <select className="h-10 px-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer appearance-none shadow-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px 16px"
            }}
          >
            <option>Semua Kategori</option>
            <option>Sedang Aktif</option>
            <option>Telah Tercapai</option>
            <option>Ditunda / Lainnya</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
        {goals.map((goal) => (
          <div 
            key={goal.id} 
            onClick={() => handleOpenDetail(goal)}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 hover:border-teal-500 cursor-pointer transition-all duration-300 group flex flex-col h-full focus-visible:outline-teal-600 focus-visible:ring-1 focus-visible:ring-teal-500"
          >
            
            <div className="flex items-start justify-between mb-5">
              {getCategoryIcon(goal.category)}
              {getPriorityBadge(goal.priority)}
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-[18px] font-heading font-bold text-gray-900 leading-tight mb-2.5 line-clamp-2 group-hover:text-teal-700 transition-colors">{goal.title}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2">{goal.description}</p>
            </div>

            <div className="mb-6">
              <Progress value={goal.progress} className="gap-2">
                <div className="flex justify-between w-full mb-2">
                  <ProgressLabel className="text-[13px] text-gray-600 font-medium font-sans">Progress</ProgressLabel>
                  <ProgressValue className="text-[13px] text-teal-600 font-bold tabular-nums" />
                </div>
                <ProgressTrack className="h-[8px] bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                  <ProgressIndicator className="bg-teal-500 rounded-full transition-all duration-1000 ease-out" />
                </ProgressTrack>
              </Progress>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[13px] text-gray-500 font-medium">
              <div className="flex items-center gap-1.5" title="Tanggal Target">
                <Calendar className="w-[15px] h-[15px] text-gray-400/80" />
                <span>{new Date(goal.targetDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Milestones">
                <CheckSquare className="w-[15px] h-[15px] text-gray-400/80" />
                <span>{goal.milestonesCompleted}/{goal.milestonesCount} langkah</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      <GoalDetailSheet 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        goal={selectedGoal} 
      />
    </div>
  );
}
