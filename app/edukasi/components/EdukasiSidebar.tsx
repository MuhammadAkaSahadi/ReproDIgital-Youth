import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EdukasiSidebar() {
  return (
    <aside className="w-full flex-col gap-8 hidden lg:flex sticky top-[200px]">
      
      {/* Widget 1: Popular Topics */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h4 className="text-[18px] font-heading font-bold text-gray-900 mb-6">
          Topik Populer
        </h4>
        <ul className="space-y-5">
          {[
            "Tanda-tanda Pubertas Normal yang Wajib Kamu Tahu",
            "Cara Menjaga Kebersihan Organ Reproduksi Rutin",
            "Tips Ampuh Mengontrol Emosi Remaja",
            "Memahami Risiko & Bahaya Perkawinan Usia Anak",
            "Membangun Relasi yang Sehat dengan Teman Sebaya"
          ].map((title, idx) => (
            <li key={idx} className="flex gap-4 items-start group cursor-pointer">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-[14px] leading-tight text-gray-700 font-medium group-hover:text-teal-600 transition-colors">
                {title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Widget 2: Quick Quiz */}
      <div className="bg-teal-600 p-6 rounded-xl shadow-md text-center relative overflow-hidden group hover:bg-teal-700 transition-colors">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-teal-400/20 rounded-full blur-lg pointer-events-none" />
        
        <h4 className="text-[20px] font-heading font-bold text-white mb-2 relative z-10">
          Kuis Cepat
        </h4>
        <p className="text-white/90 text-sm mb-6 relative z-10">
          Uji pemahamanmu tentang mitos vs fakta seputar pubertas!
        </p>
        <Button className="w-full bg-coral-500 hover:bg-coral-400 text-white font-medium shadow relative z-10 border-0">
          <Play className="w-4 h-4 mr-2" />
          Mulai Kuis
        </Button>
      </div>

      {/* Widget 3: Need Help */}
      <div className="border-2 border-dashed border-teal-500 p-6 rounded-xl bg-teal-50/50 text-center">
        <h4 className="text-[16px] font-heading font-bold text-gray-900 mb-2">
          Butuh Teman Cerita?
        </h4>
        <p className="text-gray-600 text-sm mb-5">
          Konselor sebaya kami siap mendengarkan cerita dan keluh kesahmu, 100% rahasia.
        </p>
        <Link 
          href="/konseling"
          className="inline-flex items-center text-sm font-bold text-teal-600 hover:text-teal-700 group"
        >
          Hubungi Konselor
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
    </aside>
  );
}
