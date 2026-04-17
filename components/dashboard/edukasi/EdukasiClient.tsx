"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Eye, FileText, Image as ImageIcon, X } from "lucide-react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock Data
const MOCK_CONTENT = [
  {
    id: 1,
    title: "Pentingnya Menjaga Kesehatan Reproduksi di Masa Remaja",
    type: "Artikel",
    status: "Dipublikasikan",
    date: "14/08/2026",
    views: "1.2k",
  },
  {
    id: 2,
    title: "Dampak Psikologis Perkawinan Anak Usia Dini",
    type: "Video",
    status: "Dipublikasikan",
    date: "12/08/2026",
    views: "850",
  },
  {
    id: 3,
    title: "Mitos dan Fakta tentang Mentruasi",
    type: "Kuis",
    status: "Draft",
    date: "10/08/2026",
    views: "-",
  },
  {
    id: 4,
    title: "Tips Membangun Hubungan Sehat",
    type: "Infografis",
    status: "Diarsipkan",
    date: "05/08/2026",
    views: "320",
  },
];

const TIPE_KONTEN = ["Semua", "Artikel", "Video", "Kuis", "Infografis"];
const STATUS_KONTEN = ["Semua", "Draft", "Dipublikasikan", "Diarsipkan"];

export function EdukasiClient() {
  const [activeTipe, setActiveTipe] = useState("Semua");
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = MOCK_CONTENT.filter((item) => {
    const matchTipe = activeTipe === "Semua" || item.type === activeTipe;
    const matchStatus = activeStatus === "Semua" || item.status === activeStatus;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTipe && matchStatus && matchSearch;
  });

  const getThumbnailStyle = (type: string) => {
    switch (type) {
      case "Artikel": return "bg-teal-500 text-white";
      case "Video": return "bg-coral-500 text-white";
      case "Kuis": return "bg-green-500 text-white";
      case "Infografis": return "bg-amber-500 text-white";
      default: return "bg-gray-200 text-gray-500";
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Dipublikasikan": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Diarsipkan": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">Manajemen Konten</h1>
          <p className="text-sm text-gray-600 mt-1">Kelola konten edukasi untuk siswa</p>
        </div>
        <Button className="bg-coral-500 hover:bg-coral-600 text-white transition-fast shrink-0 gap-2 font-medium">
          <Plus className="h-4 w-4" />
          Buat Konten Baru
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="rounded-xl border-none shadow-sm overflow-hidden p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari konten edukasi..."
              className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-fast"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="h-px w-full md:h-10 md:w-px bg-gray-200"></div>

          <div className="flex flex-col xl:flex-row gap-4 flex-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
              <span className="text-sm text-gray-500 font-medium shrink-0 mr-2">Tipe:</span>
              {TIPE_KONTEN.map((tipe) => (
                <button
                  key={tipe}
                  onClick={() => setActiveTipe(tipe)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full shrink-0 transition-fast ${
                    activeTipe === tipe
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tipe}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
              <span className="text-sm text-gray-500 font-medium shrink-0 mr-2">Status:</span>
              {STATUS_KONTEN.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full shrink-0 transition-fast ${
                    activeStatus === status
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {filteredContent.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-base group cursor-pointer flex flex-col h-full bg-white">
              {/* Thumbnail */}
              <div className={`h-32 w-full flex items-center justify-center ${getThumbnailStyle(item.type)}`}>
                <span className="text-3xl font-bold uppercase tracking-wider">{item.type.substring(0, 2)}</span>
              </div>
              
              <CardContent className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getThumbnailStyle(item.type).replace('text-white', 'text-white')}`}>
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${getBadgeStyle(item.status)}`}>
                      {item.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <CardTitle className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 font-heading group-hover:text-teal-600 transition-colors">
                  {item.title}
                </CardTitle>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-sm text-gray-600 mt-auto">
                <span className="font-medium">{item.date}</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Eye className="h-4 w-4 text-gray-400" />
                  {item.views}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in bg-white rounded-xl border border-dashed border-gray-200">
          <div className="bg-gray-50 rounded-full p-6 mb-4">
            <FileText className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Konten tidak ditemukan</h3>
          <p className="text-gray-500 max-w-sm mb-6">
            Tidak ada konten edukasi yang sesuai dengan pencarian atau filter yang Anda pilih.
          </p>
          <Button variant="outline" onClick={() => { setActiveTipe("Semua"); setActiveStatus("Semua"); setSearchQuery(""); }} className="border-gray-200 text-gray-700 hover:bg-gray-50">
            Hapus Filter
          </Button>
        </div>
      )}
    </div>
  );
}
