export function HeroSection() {
  return (
    <div className="relative w-full min-h-[360px] md:h-[480px] bg-gradient-to-b from-teal-50 to-white overflow-hidden px-6 md:px-8 py-12 md:py-0 flex items-center border-b border-gray-100">
      
      {/* Decorative Illustration / Background Glow (Right side) */}
      <div className="absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2 w-[240px] md:w-[400px] h-[240px] md:h-[400px] pointer-events-none opacity-20 md:opacity-90 z-0 hidden sm:flex items-center justify-center">
        {/* Placeholder abstrak untuk ilustrasi "Remaja Indonesia & Edukasi" */}
        <div className="absolute w-[80%] h-[80%] bg-teal-200 rounded-full blur-[80px]" />
        
        {/* Flat shapes abstraction */}
        <div className="relative w-full h-full flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
          <div className="absolute w-[180px] h-[220px] bg-teal-600 rounded-tl-[80px] rounded-br-[80px] opacity-10 rotate-12" />
          <div className="absolute w-[140px] h-[140px] bg-coral-500 rounded-full opacity-10 -translate-x-12 -translate-y-12" />
          <svg className="w-[200px] h-[200px] text-teal-600 opacity-20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20 80 Q50 20 80 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="30" r="15" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-[32px] md:text-[48px] font-heading font-bold text-teal-600 leading-[1.1] mb-6 animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both" style={{ animationDelay: '200ms' }}>
            Tentang ReproDigital Youth
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-medium animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both" style={{ animationDelay: '400ms' }}>
            Memberdayakan remaja Indonesia di pedesaan melalui literasi kesehatan reproduksi komprehensif, ruang konseling yang aman, dan gamifikasi perencanaan masa depan yang suportif.
          </p>
        </div>
      </div>

      {/* Embedded keyframes for simple floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}} />
    </div>
  );
}
