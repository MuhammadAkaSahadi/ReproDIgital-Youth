import Link from "next/link";
import { ShieldCheck, Lock, Key } from "lucide-react";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export const metadata = {
  title: "Reset Password - ReproDigital Youth",
  description: "Pulihkan akses ke akun ReproDigital Youth kamu.",
};

export default function ResetPasswordPage() {
  const stats = [
    { label: "Keamanan Data", value: "Terenkripsi", icon: <ShieldCheck className="w-5 h-5 text-teal-100" /> },
    { label: "Privasi", value: "Tetap Terjaga", icon: <Lock className="w-5 h-5 text-teal-100" /> },
    { label: "Akses Cepat", value: "Ke Akunmu", icon: <Key className="w-5 h-5 text-teal-100" /> }
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
          
          {/* Abstract Flat Illustration - Password/Lock Theme */}
          <div className="w-full aspect-square max-h-[360px] relative mb-10 flex items-center justify-center">
             <div className="absolute w-[70%] h-[70%] bg-teal-500/50 rounded-full blur-xl" />
             <div className="absolute w-[80%] h-[80%] bg-teal-400/30 rounded-3xl rotate-12" />
             
             {/* Main Abstract SVG */}
             <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Shield / Lock Graphic */}
                <path d="M200 120 L270 150 L270 230 C270 280 200 320 200 320 C200 320 130 280 130 230 L130 150 L200 120 Z" fill="white" stroke="#FFE2D1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="175" y="190" width="50" height="40" rx="8" fill="#FFC9A3" />
                <path d="M185 190 V170 C185 155 215 155 215 170 V190" stroke="#FFC9A3" strokeWidth="8" strokeLinecap="round" />
                
                {/* Decorative Stars & Circles */}
                <circle cx="100" cy="180" r="10" fill="white" opacity="0.8" />
                <circle cx="310" cy="140" r="15" fill="#FFE2D1" opacity="0.9" />
                <path d="M300 280 L 310 250 L 340 240 L 310 230 L 300 200 L 290 230 L 260 240 L 290 250 Z" fill="white" opacity="0.6" />
             </svg>
          </div>

          <div className="w-full text-center">
            <h2 className="text-[32px] md:text-[36px] font-heading font-bold text-white mb-3 leading-tight">
              Akses Aman Terlindungi
            </h2>
            <p className="text-[17px] text-white/95 italic font-medium mb-12">
              "Privasi dan perlindungan datamu selalu menjadi prioritas kami."
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 w-full bg-teal-800/20 backdrop-blur-sm p-6 rounded-2xl border border-teal-500/30">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-[18px] font-bold text-white mb-1 leading-none">{stat.value}</span>
                  <span className="text-[12px] text-teal-100/80 font-medium px-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Subtle Decorative Geometric Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
           <svg className="w-full h-full text-white" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
             <polygon points="0,0 30,100 0,100" fill="currentColor" opacity="0.5" />
             <circle cx="90" cy="20" r="30" fill="currentColor" opacity="0.3" />
           </svg>
        </div>
      </div>

      {/* Kolom Kanan - Reset Password Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center relative overflow-y-auto min-h-screen pt-24 lg:pt-0">
        
        {/* Mobile Branding Header (Hanya tampil di Mobile) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-teal-600 px-6 py-8 flex flex-col items-center justify-center shadow-sm">
          <Link href="/" className="relative z-20 flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-4 h-4 bg-teal-600 rounded-full" />
            </div>
            <span className="font-heading font-bold text-white text-[20px] tracking-tight">ReproDigital</span>
          </Link>
          <p className="text-white/90 text-[14px] font-medium text-center relative z-20">Keamanan Terlindungi</p>
          
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
             <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
               <polygon points="100,0 100,100 0,60" fill="currentColor" />
             </svg>
          </div>
        </div>

        {/* Render Formulir */}
        <div className="w-full h-full px-6 py-8 lg:p-16 flex flex-col justify-center animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out fill-mode-both" style={{ animationDelay: '200ms' }}>
          <ResetPasswordForm />
        </div>
      </div>

    </div>
  );
}
