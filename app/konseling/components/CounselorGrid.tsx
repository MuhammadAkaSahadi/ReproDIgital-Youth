"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useKonselingStore } from "@/store/useKonselingStore";

const MOCK_COUNSELORS = [
  { id: "c_1", name: "Dr. Anita Saraswati", spec: "Kesehatan Reproduksi", status: "online", sessions: 124, rating: 4.9 },
  { id: "c_2", name: "Deni Firmansyah", spec: "Kesehatan Mental", status: "offline", sessions: 86, rating: 4.7 },
  { id: "c_3", name: "Sinta Maharani", spec: "Hubungan Teman Sebaya", status: "online", sessions: 215, rating: 4.9 },
  { id: "c_4", name: "Budi Santoso", spec: "Perkembangan Remaja", status: "offline", sessions: 42, rating: 4.6 },
];

export function CounselorGrid() {
  const [filter, setFilter] = useState("Semua Konselor");
  const { setActiveSession } = useKonselingStore();

  return (
    <div className="w-full">
      {/* Filter Dropdown */}
      <div className="flex justify-start sm:justify-end mb-6 px-1">
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-sm appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "16px 16px"
          }}
        >
          <option>Semua Konselor</option>
          <option>Tersedia Sekarang</option>
          <option>Berdasarkan Rating</option>
        </select>
      </div>

      {/* Counselor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 px-1 pb-10">
        {MOCK_COUNSELORS.map((c) => (
          <div 
            key={c.id} 
            className="group bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-[0_12px_24px_rgba(13,148,136,0.15)] hover:-translate-y-1 hover:border-teal-500 transition-all duration-300 flex flex-col items-center"
          >
            
            <div className="relative mb-4 mt-2">
              <Avatar className="w-20 h-20 border-[3px] border-gray-50 shadow-sm transition-transform group-hover:scale-105">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name.replace(/\s+/g, '')}`} />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-xl font-bold">{c.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <h4 className="text-[18px] font-heading font-bold text-gray-900 leading-tight mb-1 group-hover:text-teal-700 transition-colors">{c.name}</h4>
            <p className="text-[11px] font-bold text-coral-500 tracking-wider uppercase mb-3">{c.spec}</p>

            <div className="flex items-center gap-1.5 mb-3">
              {c.status === "online" ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm"></span>
                  <span className="text-[13px] font-bold text-green-600">Tersedia</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                  <span className="text-[13px] font-medium text-gray-500">Offline</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-600 font-medium mb-6 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
              <span>{c.sessions} sesi</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center"><span className="text-yellow-500 mr-1 text-[14px]">★</span> {c.rating}</span>
            </div>

            <div className="w-full mt-auto">
              {c.status === "online" ? (
                <Button 
                  onClick={() => setActiveSession(c.id)}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-sm transition-all active:scale-95 border-0 rounded-lg"
                >
                  Mulai Chat
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-teal-600 hover:border-teal-500 active:bg-gray-100 font-medium transition-all active:scale-95 rounded-lg"
                >
                  Jadwalkan
                </Button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
