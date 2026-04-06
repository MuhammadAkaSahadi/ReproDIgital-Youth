"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, Activity, Banknote, User, Calendar, MoreVertical, FileText, CheckCircle } from "lucide-react";
import { Goal } from "@/store/useGoalStore";

interface GoalDetailSheetProps {
  goal: Goal | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoalDetailSheet({ goal, isOpen, onOpenChange }: GoalDetailSheetProps) {
  if (!goal) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pendidikan': return <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><BookOpen className="w-6 h-6" /></div>;
      case 'Karir': return <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><Briefcase className="w-6 h-6" /></div>;
      case 'Kesehatan': return <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Activity className="w-6 h-6" /></div>;
      case 'Keuangan': return <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0"><Banknote className="w-6 h-6" /></div>;
      default: return <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0"><User className="w-6 h-6" /></div>;
    }
  };

  // Circular progress math
  const radius = 50;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * goal.progress) / 100;

  // Days remaining logic
  const today = new Date();
  const targetDate = new Date(goal.targetDate);
  const diffTime = Math.max(0, targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md lg:max-w-[600px] overflow-y-auto p-0 flex flex-col bg-gray-50 border-l border-gray-200">
        
        {/* Header */}
        <div className="bg-white px-6 md:px-8 py-6 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 pr-4">
              {getCategoryIcon(goal.category)}
              <div>
                <SheetTitle className="text-[24px] font-heading font-bold text-gray-900 leading-tight mb-1">{goal.title}</SheetTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold uppercase">{goal.category}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${goal.priority === 'Tinggi' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-100 text-gray-600'}`}>{goal.priority}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-full shrink-0 -mt-2 -mr-2">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex flex-col gap-8 flex-1">
          
          {/* Section 1: Info */}
          <div>
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center"><FileText className="w-4 h-4 mr-2 text-gray-400" /> Deskripsi</h4>
            <SheetDescription className="text-[15px] text-gray-600 leading-relaxed font-medium">
              {goal.description}
            </SheetDescription>
          </div>

          {/* Section 2: Progress Overview */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex items-center justify-between shadow-xs">
            <div>
              <h4 className="font-heading font-bold text-teal-900 text-[20px] mb-1">Status Progres</h4>
              <p className="text-teal-700/80 text-[14px] mb-4">Kamu sudah menyelesaikan {goal.milestonesCompleted} dari {goal.milestonesCount} langkah!</p>
              <div className="inline-flex flex-col bg-white px-4 py-2 rounded-xl shadow-sm border border-teal-100">
                <span className="text-[11px] font-bold text-gray-500 uppercase">Sisa Waktu</span>
                <span className="text-[16px] font-bold text-teal-700 flex items-center gap-1.5 mt-0.5"><Calendar className="w-4 h-4" /> {diffDays} Hari</span>
              </div>
            </div>

            <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="#CCFBF1" strokeWidth="10" />
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="#14B8A6" strokeWidth="10" strokeLinecap="round" strokeDasharray={dashArray} strokeDashoffset={dashOffset} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[28px] font-heading font-bold text-teal-800 leading-none">{goal.progress}<span className="text-[16px]">%</span></span>
              </div>
            </div>
          </div>

          {/* Section 3: Tasks/Milestones */}
          <div>
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-gray-400" /> Langkah-Langkah (Milestones)</h4>
            <div className="flex flex-col gap-3">
              {goal.tasks.map((task, index) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:border-teal-300 transition-colors cursor-pointer shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center relative">
                      <Checkbox id={`task-${task.id}`} checked={task.completed} className="w-6 h-6 border-gray-300 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 rounded-md shadow-inner transition-transform active:scale-90" />
                    </div>
                    <label htmlFor={`task-${task.id}`} className={`text-[15px] cursor-pointer transition-colors ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium group-hover:text-teal-800'}`}>
                      {task.title}
                    </label>
                  </div>
                  <span className="text-[12px] font-medium text-gray-400 group-hover:text-gray-500 transition-colors">Langkah {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-6 shrink-0 sticky bottom-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button 
            className="w-full h-12 bg-teal-600 hover:bg-teal-500 text-white font-bold text-[15px] shadow-sm transition-all"
            disabled={goal.progress < 100 && goal.status !== 'Tercapai'}
          >
            {goal.status === 'Tercapai' ? 'Tujuan Sudah Tercapai 🎉' : 'Tandai Tujuan Tercapai'}
          </Button>
          {goal.progress < 100 && goal.status !== 'Tercapai' && (
             <p className="text-center text-[12px] text-gray-500 mt-3 font-medium">Selesaikan semua langkah di atas untuk merayakan pencapaian ini.</p>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
}
