import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { RegisterForm } from "./components/RegisterForm";

export const metadata = {
  title: "Daftar - ReproDigital Youth",
  description: "Buat akun ReproDigital Youth untuk memulai perjalanan kesehatan reproduksi dan perencanan masa depanmu.",
};

export default function RegisterPage() {
  const valueProps = [
    "Akses gratis selamanya",
    "Ruang aman & rahasia",
    "Konselor sebaya terlatih",
    "Materi edukatif berkualitas",
  ];

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Kolom Kiri - Branding (Hanya tampil di Desktop >= 1024px) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-teal-600 to-teal-500 p-16 flex-col sticky top-0 h-screen overflow-y-auto animate-in slide-in-from-left-8 duration-500 ease-out fill-mode-both">
        
        {/* Logo Link to Home */}
        <Link href="/" className="absolute top-12 left-16 z-20 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            {/* Simple logo abstraction */}
            <div className="w-4 h-4 bg-teal-600 rounded-full" />
          </div>
          <span className="font-heading font-bold text-white text-[20px] tracking-tight">ReproDigital</span>
        </Link>

        {/* Center Content: Illustration + Value Props */}
        <div className="flex-1 flex flex-col justify-center items-center mt-12 w-full max-w-[480px] mx-auto z-10">
          
          {/* Abstract Flat Illustration */}
          <div className="w-full aspect-square max-h-[360px] relative mb-12 flex items-center justify-center">
             {/* Decorative Background inside Illustration */}
             <div className="absolute w-[80%] h-[80%] bg-teal-500/50 rounded-full blur-2xl" />
             
             {/* Main Abstract SVG */}
             <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Character 1 Placeholder */}
                <rect x="180" y="200" width="40" height="100" rx="20" fill="white" />
                <circle cx="200" cy="160" r="30" fill="#FFC9A3" /> {/* Peach 400 placeholder */}
                
                {/* Character 2 Placeholder */}
                <rect x="100" y="240" width="40" height="60" rx="20" fill="white" opacity="0.9" />
                <circle cx="120" cy="200" r="25" fill="#FFE2D1" /> {/* Coral 50 placeholder */}
                
                {/* Decorative Elements */}
                <path d="M260 220 Q 300 150 350 200" stroke="#FFE2D1" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 15" />
                <circle cx="320" cy="120" r="15" fill="white" opacity="0.8" />
                <circle cx="80" cy="100" r="10" fill="#FFC9A3" />
             </svg>
          </div>

          <div className="w-full text-center">
            <h2 className="text-[32px] font-heading font-bold text-white mb-8 leading-tight">
              Mulai Perjalananmu Hari Ini
            </h2>

            <div className="flex flex-col gap-5 text-left w-fit mx-auto">
              {valueProps.map((prop, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-white/95 shrink-0" strokeWidth={2.5} />
                  <span className="text-white/95 text-[16px] font-medium">{prop}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Subtle Decorative Geometric Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
           <svg className="w-full h-full text-white" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
             <circle cx="100" cy="100" r="60" fill="currentColor" />
             <circle cx="0" cy="20" r="30" fill="currentColor" />
           </svg>
        </div>
      </div>

      {/* Kolom Kanan - Register Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center relative overflow-y-auto min-h-screen">
        
        {/* Mobile Branding Header (Hanya tampil di Mobile) */}
        <div className="lg:hidden w-full bg-teal-600 px-6 py-8 flex flex-col items-center justify-center relative mb-6">
          <Link href="/" className="relative z-20 flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-4 h-4 bg-teal-600 rounded-full" />
            </div>
            <span className="font-heading font-bold text-white text-[20px] tracking-tight">ReproDigital</span>
          </Link>
          <p className="text-white/90 text-[14px] font-medium text-center relative z-20">Mulai Perjalananmu Hari Ini</p>
          
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
             <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
               <polygon points="0,0 100,0 100,100 0,60" fill="currentColor" />
             </svg>
          </div>
        </div>

        {/* Formulir Registrasi */}
        <div className="w-full h-full px-6 py-6 lg:p-16 flex flex-col justify-center animate-in slide-in-from-bottom-8 fade-in duration-500 ease-out fill-mode-both" style={{ animationDelay: '200ms' }}>
          <RegisterForm />
        </div>
      </div>

    </div>
  );
}
