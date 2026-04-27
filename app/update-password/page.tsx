import Link from "next/link";
import { Users, FileText, HeadphonesIcon } from "lucide-react";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";

export const metadata = {
  title: "Perbarui Password - ReproDigital Youth",
  description: "Perbarui password Anda untuk keamanan akun ReproDigital Youth.",
};

export default function UpdatePasswordPage() {
  const stats = [
    { label: "Remaja Bergabung", value: "1,200+", icon: <Users className="w-5 h-5 text-teal-100" /> },
    { label: "Artikel Edukatif", value: "500+", icon: <FileText className="w-5 h-5 text-teal-100" /> },
    { label: "Konselor Tersedia", value: "50+", icon: <HeadphonesIcon className="w-5 h-5 text-teal-100" /> }
  ];

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Kolom Kiri - Branding (Hanya tampil di Desktop >= 1024px) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-teal-600 to-teal-500 p-16 flex-col sticky top-0 h-screen overflow-y-auto animate-in slide-in-from-left-8 duration-500 ease-out fill-mode-both">
        
        {/* Logo Link to Home */}
        <Link href="/" className="absolute top-12 left-16 z-20 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 bg-teal-600 rounded-full" />
          </div>
          <span className="font-heading font-bold text-white text-[20px] tracking-tight">ReproDigital</span>
        </Link>

        {/* Center Content: Illustration + Motivation + Stats */}
        <div className="flex-1 flex flex-col justify-center items-center mt-6 w-full max-w-[480px] mx-auto z-10">
          
          {/* Abstract Flat Illustration */}
          <div className="w-full aspect-square max-h-[360px] relative mb-10 flex items-center justify-center">
             <div className="absolute w-[80%] h-[80%] bg-teal-500/50 rounded-[40px] rotate-6 blur-md" />
             <div className="absolute w-[80%] h-[80%] bg-teal-400/40 rounded-[40px] -rotate-3" />
             
             {/* Main Abstract SVG (Studying/Celebrating) */}
             <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Character 1 - Celebrating/Reaching */}
                <rect x="200" y="160" width="30" height="120" rx="15" fill="white" />
                <circle cx="215" cy="110" r="25" fill="#FFC9A3" /> {/* Peach 400 placeholder */}
                <path d="M215 160 Q 250 120 280 100" stroke="white" strokeWidth="15" strokeLinecap="round" />
                
                {/* Character 2 - Reading/Studying */}
                <rect x="120" y="220" width="35" height="100" rx="15" fill="white" opacity="0.9" />
                <circle cx="137" cy="170" r="22" fill="#FFE2D1" /> {/* Coral 50 placeholder */}
                <rect x="150" y="200" width="40" height="30" rx="4" fill="#E2E8F0" transform="rotate(-15 150 200)" /> {/* Book */}
                
                {/* Sparkles / Stars */}
                <path d="M300 200 L 310 170 L 340 160 L 310 150 L 300 120 L 290 150 L 260 160 L 290 170 Z" fill="#FFE2D1" opacity="0.8" />
                <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
                <circle cx="340" cy="260" r="12" fill="#FFC9A3" opacity="0.7" />
             </svg>
          </div>

          <div className="w-full text-center">
            <h2 className="text-[36px] font-heading font-bold text-white mb-3 leading-tight">
              Keamanan Anda Prioritas Kami!
            </h2>
            <p className="text-[18px] text-white/95 italic font-medium mb-12">
              "Tetap aman, tetap terhubung. Lindungi akunmu untuk kenyamanan."
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 w-full bg-teal-800/20 backdrop-blur-sm p-6 rounded-2xl border border-teal-500/30">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-[20px] font-bold text-white mb-1 leading-none">{stat.value}</span>
                  <span className="text-[12px] text-teal-100/80 font-medium px-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Subtle Decorative Geometric Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
           <svg className="w-full h-full text-white" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
             <polygon points="100,0 100,100 0,100" fill="currentColor" opacity="0.5" />
             <circle cx="20" cy="80" r="40" fill="currentColor" opacity="0.3" />
           </svg>
        </div>
      </div>

      {/* Kolom Kanan - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center relative overflow-y-auto min-h-screen pt-24 lg:pt-0">
        
        {/* Mobile Branding Header (Hanya tampil di Mobile) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-teal-600 px-6 py-8 flex flex-col items-center justify-center shadow-sm">
          <Link href="/" className="relative z-20 flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-4 h-4 bg-teal-600 rounded-full" />
            </div>
            <span className="font-heading font-bold text-white text-[20px] tracking-tight">ReproDigital</span>
          </Link>
          <p className="text-white/90 text-[14px] font-medium text-center relative z-20">Keamanan Anda Prioritas Kami</p>
          
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
             <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
               <polygon points="100,0 100,100 0,60" fill="currentColor" />
             </svg>
          </div>
        </div>

        {/* Render Formulir */}
        <div className="w-full h-full px-6 py-8 lg:p-16 flex flex-col justify-center animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out fill-mode-both" style={{ animationDelay: '200ms' }}>
          <UpdatePasswordForm />
        </div>
      </div>

    </div>
  );
}
