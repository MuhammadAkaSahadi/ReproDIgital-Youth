"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoalFormDialog } from "./GoalFormDialog";

export function PerencanaanHeader() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-coral-50/70 to-white px-6 md:px-8 py-8 md:py-12 border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between relative">
        
        <div className="z-10 relative">
          {/* Breadcrumb */}
          <p className="text-[13px] text-gray-500 font-medium mb-4">
            Beranda <span className="mx-1">/</span> <span className="text-teal-600 font-bold">Perencanaan Masa Depan</span>
          </p>
          
          <h1 className="text-[32px] md:text-[40px] font-heading font-bold text-gray-900 leading-tight mb-3">
            Perencanaan Masa Depanmu
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-lg leading-relaxed mb-6">
            Tetapkan tujuan, lacak kemajuan, dan wujudkan impianmu dengan langkah-langkah kecil yang konsisten.
          </p>
          
          <Button onClick={() => setIsFormOpen(true)} className="bg-coral-500 hover:bg-coral-600 active:scale-95 text-white font-bold h-12 px-6 rounded-lg shadow-sm border-0 w-full sm:w-auto transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Tujuan Baru
          </Button>
        </div>

        {/* Decorative Illustration right side (Visible on md+) */}
        <div className="hidden md:flex absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none">
          {/* Abstrak dekoratif (merepresentasikan target panah/pertumbuhan) */}
          <div className="relative w-64 h-64">
            <div className="absolute top-4 right-4 w-40 h-40 bg-teal-100/50 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-coral-100/50 rounded-full blur-2xl"></div>
            
            <svg className="absolute inset-0 w-full h-full text-teal-600 opacity-10" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="10" />
              <path d="M50 50 L90 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      <GoalFormDialog isOpen={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
