"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEdukasiStore } from "@/store/useEdukasiStore";

export function EdukasiHeader() {
  const { searchQuery, setSearchQuery } = useEdukasiStore();

  return (
    <div className="w-full min-h-[240px] md:h-[280px] bg-linear-to-b from-teal-50 to-white px-6 md:px-0 pt-8 pb-10 flex flex-col justify-center relative">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mt-10 mb-6 md:mb-8 font-medium">
          <Link href="/" className="hover:text-teal-600 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-teal-600 font-semibold">Edukasi</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[40px] font-heading font-bold text-gray-900 mb-3">
          Pusat Edukasi
        </h1>
        <p className="text-[16px] md:text-[18px] text-gray-600 mb-8 max-w-2xl">
          Temukan ratusan artikel, video, dan infografis terpercaya seputar kesehatan reproduksi.
        </p>

        {/* Search Bar */}
        <div className="relative w-full mb-10 md:max-w-[600px] h-12 md:h-14">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-teal-600" />
          </div>
          <input
            type="text"
            placeholder="Cari topik atau pertanyaanmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-12 pr-4 bg-white border border-gray-200 rounded-lg shadow-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-gray-900 placeholder:text-gray-400 text-base"
          />
        </div>
        
      </div>
    </div>
  );
}
