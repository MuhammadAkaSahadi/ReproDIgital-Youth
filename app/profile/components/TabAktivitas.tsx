"use client";

import { useState } from "react";
import { useProfileStore, ActivityType } from "@/store/useProfileStore";
import { BookOpen, Target, HelpCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function TabAktivitas({ activities = [] }: { activities: any[] }) {
  const [filter, setFilter] = useState<ActivityType | "semua">("semua");

  const filteredActivities = filter === "semua" 
    ? activities 
    : activities.filter(a => a.type === filter);

  const getBorderColor = (type: ActivityType) => {
    if (type === "artikel") return "border-l-teal-500";
    if (type === "kuis") return "border-l-coral-500";
    if (type === "goal") return "border-l-green-500";
    return "border-l-gray-300";
  };

  const getIcon = (type: ActivityType) => {
    if (type === "artikel") return <BookOpen className="w-5 h-5 text-teal-600" />;
    if (type === "kuis") return <HelpCircle className="w-5 h-5 text-coral-600" />;
    if (type === "goal") return <Target className="w-5 h-5 text-green-600" />;
    return <Clock className="w-5 h-5 text-gray-600" />;
  };

  const getLabelColor = (type: ActivityType) => {
    if (type === "artikel") return "text-teal-600";
    if (type === "kuis") return "text-coral-600";
    if (type === "goal") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="w-full max-w-4xl">
      
      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {[
          { id: "semua", label: "Semua Aktivitas" },
          { id: "artikel", label: "Artikel" },
          { id: "kuis", label: "Kuis" },
          { id: "goal", label: "Goal" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all border ${
              filter === f.id 
                ? "bg-teal-600 text-white border-teal-600 shadow-md hover:bg-teal-700" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-gray-500">Belum ada aktivitas di kategori ini.</div>
        ) : (
          filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className={`bg-white border text-left border-gray-200 border-l-[4px] ${getBorderColor(activity.type)} rounded-xl p-5 hover:border-l-[6px] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                {getIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <span className={`uppercase text-[11px] font-bold tracking-wider mb-1 block ${getLabelColor(activity.type)}`}>
                  {activity.type}
                </span>
                <h4 className="text-[16px] font-bold text-gray-900 cursor-pointer hover:text-teal-600 transition-colors mb-1 line-clamp-1">
                  {activity.title}
                </h4>

                {/* Specific Meta display based on type */}
                {activity.type === 'artikel' && (
                   <div className="flex items-center gap-2 max-w-xs mt-2">
                     <Progress value={100} className="h-1.5 flex-1" indicatorColor="bg-teal-500" />
                     <span className="text-[12px] font-medium text-gray-600">{activity.description}</span>
                   </div>
                )}
                {activity.type === 'kuis' && (
                   <span className="inline-block mt-1 px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 text-[12px] font-bold rounded-md">
                     {activity.description}
                   </span>
                )}
                {activity.type === 'goal' && (
                   <div className="text-[13px] text-gray-600 mt-1">
                     {activity.description}
                   </div>
                )}
              </div>

              <div className="sm:text-right mt-2 sm:mt-0 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                <span className="text-[13px] font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{activity.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredActivities.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="bg-white hover:bg-gray-50 border-teal-200 text-teal-700 h-12 px-8 rounded-full font-bold">
            Muat Lebih Banyak
          </Button>
        </div>
      )}

    </div>
  );
}
