import {
  Lock,
  Sparkles,
  Share2,
  Medal,
  Flame,
  CheckCircle2,
  Send,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AchievementSection() {
  const badges = [
    {
      id: "b1",
      title: "Pemula",
      description: "Tujuan pertama sukses dibuat",
      icon: (
        <Medal className="w-12 h-12 text-blue-500 mb-3" strokeWidth={1.5} />
      ),
      isLocked: false,
    },
    {
      id: "b2",
      title: "Konsisten",
      description: "Berhasil 7 hari streak",
      icon: (
        <Flame className="w-12 h-12 text-orange-500 mb-3" strokeWidth={1.5} />
      ),
      isLocked: false,
    },
    {
      id: "b3",
      title: "Pencatat",
      description: "Mencapai 3 tujuan",
      icon: (
        <CheckCircle2
          className="w-12 h-12 text-green-500 mb-3"
          strokeWidth={1.5}
        />
      ),
      isLocked: true,
    },
    {
      id: "b4",
      title: "Inspirasi",
      description: "Membagikan pencapaian",
      icon: <Send className="w-12 h-12 text-pink-500 mb-3" strokeWidth={1.5} />,
      isLocked: true,
    },
    {
      id: "b5",
      title: "Penjelajah",
      description: "Mencoba semua kategori",
      icon: (
        <Map className="w-12 h-12 text-purple-500 mb-3" strokeWidth={1.5} />
      ),
      isLocked: true,
    },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-[1200px] mx-auto w-full px-6 md:px-8 pb-16">
      {/* Badges Section */}
      <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm">
        <div className="mb-8">
          <h2 className="text-[28px] font-heading font-bold text-gray-900 leading-none mb-2">
            Pencapaianmu
          </h2>
          <p className="text-[15px] text-gray-500">
            Dapatkan lencana eksklusif dengan secara konsisten menyelesaikan
            tujuanmu.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative aspect-square flex flex-col items-center justify-center p-6 text-center rounded-2xl border transition-all duration-300 ${
                badge.isLocked
                  ? "bg-gray-50 border-transparent filter grayscale opacity-60"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-teal-200 cursor-pointer overflow-hidden group"
              }`}
            >
              {/* Shine animation effect on hover for unlocked */}
              {!badge.isLocked && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              )}

              <div className="relative">
                {badge.icon}
                {badge.isLocked && (
                  <div className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 border-2 border-gray-50">
                    <Lock className="w-3 h-3 text-gray-500" strokeWidth={3} />
                  </div>
                )}
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 leading-none mb-1.5">
                {badge.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-snug font-medium line-clamp-2">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote Section */}
      <div className="bg-gradient-to-br from-coral-500 to-peach-400 p-8 md:p-12 rounded-3xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        {/* Background visual element */}
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <Sparkles className="w-8 h-8 text-white/70 mb-4 mx-auto md:mx-0" />
          <h3 className="text-[24px] md:text-[28px] font-heading font-bold leading-tight mb-4 text-white">
            "Perjalanan ribuan mil selalu dimulai dengan satu langkah kecil.
            Tetapkan tujuanmu hari ini."
          </h3>
          <p className="text-white/80 font-medium text-[15px] uppercase tracking-widest text-[13px]">
            — Lao Tzu
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Button className="bg-white hover:bg-gray-50 text-black font-bold h-12 px-8 rounded-xl shadow-md border-0 active:scale-95 transition-all text-[15px]">
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan Motivasi
          </Button>
        </div>
      </div>
    </div>
  );
}
