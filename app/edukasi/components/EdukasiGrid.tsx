"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, FileText, Image as ImageIcon, HelpCircle } from "lucide-react";
import { ContentType } from "@/store/useEdukasiStore";

const MOCK_DATA = [
  {
    id: 1,
    title: "Memahami Perubahan Tubuh di Masa Pubertas: Panduan Lengkap Remaja",
    excerpt: "Pubertas adalah masa transisi yang dialami setiap remaja. Yuk pelajari apa saja perubahan fisik dan emosional yang wajar terjadi agar tidak gampang panik.",
    category: "Pubertas & Perkembangan",
    type: "Video",
    date: "12 Okt 2025",
    views: "2.4k",
    readTime: "5 min tonton",
    isFeatured: true,
    progress: 0,
  },
  {
    id: 2,
    title: "5 Mitos Penyakit Menular Seksual yang Harus Kamu Tahu",
    excerpt: "Masih banyak informasi salah tentang PMS yang beredar di kalangan remaja. Mari buktikan faktanya di sini.",
    category: "Kesehatan Reproduksi",
    type: "Artikel",
    date: "10 Okt 2025",
    views: "1.2k",
    readTime: "4 min baca",
    isFeatured: false,
    progress: 45,
  },
  {
    id: 3,
    title: "Peta Perencanaan Masa Depan: Goals Spesifik Akademik",
    excerpt: "Cara mudah merancang strategi belajar agar kamu bisa meraih impian dan goals studi tanpa stres.",
    category: "Perencanaan",
    type: "Infografis",
    date: "8 Okt 2025",
    views: "850",
    readTime: "2 min layap",
    isFeatured: false,
    progress: 100,
  },
  {
    id: 4,
    title: "Kuis: Seberapa Paham Kamu Tentang Hak Tolak Anak?",
    excerpt: "Uji pengetahuanmu mengenai persetujuan dan batasan tubuh yang penting untuk keselamatan dirimu.",
    category: "Hak & Pendidikan",
    type: "Kuis",
    date: "5 Okt 2025",
    views: "3.1k",
    readTime: "10 min kuis",
    isFeatured: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Mengelola Stres dan Tekanan Akademik Rutin",
    excerpt: "Kesehatan mental sama pentingnya dengan fisik. Ini dia tips ringan kelola stres.",
    category: "Kesehatan Mental",
    type: "Artikel",
    date: "2 Okt 2025",
    views: "1.5k",
    readTime: "6 min baca",
    isFeatured: false,
    progress: 0,
  }
];

const getTypeStyle = (type: string) => {
  switch(type) {
    case "Video": return { badge: "bg-red-50 text-red-600 border-red-100", icon: <PlayCircle className="w-3.5 h-3.5 mr-1" /> };
    case "Kuis": return { badge: "bg-yellow-50 text-yellow-600 border-yellow-100", icon: <HelpCircle className="w-3.5 h-3.5 mr-1" /> };
    case "Infografis": return { badge: "bg-purple-50 text-purple-600 border-purple-100", icon: <ImageIcon className="w-3.5 h-3.5 mr-1" /> };
    default: return { badge: "bg-teal-50 text-teal-600 border-teal-100", icon: <FileText className="w-3.5 h-3.5 mr-1" /> };
  }
};

export function EdukasiGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {MOCK_DATA.map((item, idx) => {
        const isFeatured = item.isFeatured;
        const typeStyle = getTypeStyle(item.type);
        
        return (
          <Link 
            href={`/edukasi/${item.id}`} 
            key={item.id}
            className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-[0_12px_24px_rgba(13,148,136,0.15)] hover:-translate-y-1 hover:border-teal-500 transition-all duration-300 flex flex-col ${isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
          >
            {/* Thumbnail Area */}
            <div className={`relative w-full bg-gray-100 overflow-hidden ${isFeatured ? 'aspect-16/7 sm:aspect-16/7' : 'aspect-16/9'}`}>
              
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <ImageIcon className="w-8 h-8 text-gray-400 opacity-50" />
              </div>
              
              {/* Overlay Gradient (bottom up) */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/30 to-transparent pointer-events-none" />

               {/* Top-Left Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
                {isFeatured && (
                  <span className="bg-coral-500 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    Featured
                  </span>
                )}
                <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 border rounded shadow-sm backdrop-blur-md ${typeStyle.badge}`}>
                  {typeStyle.icon}
                  {item.type}
                </span>
              </div>
              
              {/* Top-Right Read Time */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-600 text-[12px] font-medium px-2.5 py-1 rounded shadow-sm z-10">
                {item.readTime}
              </div>

            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
              
              <span className="text-coral-500 text-[12px] font-bold uppercase tracking-wide mb-2 block">
                {item.category}
              </span>
              
              <h3 className={`${isFeatured ? 'text-[20px] md:text-[24px] lg:text-[26px] mb-3' : 'text-[18px] mb-2'} font-heading font-bold text-gray-900 line-clamp-2 group-hover:text-teal-700 transition-colors`}>
                {item.title}
              </h3>
              
              <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                {item.excerpt}
              </p>
              
              {/* Progress bar info (if > 0) */}
              {item.progress > 0 && (
                <div className="w-full mb-4">
                  <div className="flex justify-between text-[11px] font-medium text-gray-500 mb-1.5">
                    <span>Melanjutkan</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 rounded-full" 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              )}

              {/* Bottom Metadata */}
              <div className={`mt-auto flex items-center text-[12px] font-medium text-gray-500 pt-4 border-t ${item.progress > 0 ? 'border-transparent pt-0' : 'border-gray-100'}`}>
                <span className="hidden md:inline">{item.views} views</span>
                <span className="mx-2 hidden md:inline">•</span>
                <span>{item.date}</span>
              </div>
              
            </div>
          </Link>
        );
      })}
    </div>
  );
}
