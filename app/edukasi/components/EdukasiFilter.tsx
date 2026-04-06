"use client";

import React from "react";
import { useEdukasiStore, ContentType, SortOption } from "@/store/useEdukasiStore";

const CATEGORIES = [
  "Semua",
  "Pubertas & Perkembangan",
  "Kesehatan Reproduksi",
  "Perkawinan Anak",
  "Hubungan Sehat",
  "Hak & Pendidikan",
  "Kesehatan Mental",
];

const CONTENT_TYPES: ContentType[] = ["Semua", "Artikel", "Video", "Infografis", "Kuis"];
const SORT_OPTIONS: SortOption[] = ["Terbaru", "Terpopuler", "A-Z"];

export function EdukasiFilter() {
  const {
    activeCategory,
    setActiveCategory,
    contentTypes,
    toggleContentType,
    sortOption,
    setSortOption,
  } = useEdukasiStore();

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky md:sticky top-[73px] md:top-[80px] z-30 shadow-xs md:shadow-sm transition-all md:py-8 py-5">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px] flex flex-col gap-5 md:gap-8">
        
        {/* Row 1: Category Tabs */}
        <div className="flex overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-hide gap-3 items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}} />
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-teal-600 text-white shadow-md border border-teal-600" 
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100 hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 2: Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Content Type Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto px-1 md:px-0">
            {CONTENT_TYPES.map((type) => {
              const isSelected = contentTypes.includes(type);
              
              return (
                <button
                  key={type}
                  onClick={() => toggleContentType(type)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    isSelected 
                      ? "border-teal-500 bg-teal-50 text-teal-700" 
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <span className="text-sm text-gray-500 font-medium pl-1 md:pl-0">Urutkan:</span>
            <div className="relative flex-1 md:w-[180px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer appearance-none shadow-sm transition-colors"
                title="Urutkan hasil"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
