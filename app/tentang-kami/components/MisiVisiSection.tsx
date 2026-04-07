import { Target, Compass, CheckCircle2 } from "lucide-react";

export function MisiVisiSection() {
  return (
    <div className="bg-white py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[36px] font-heading font-bold text-gray-900 mb-4">Misi & Visi Kami</h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto">
            Komitmen kami dalam memajukan literasi kesehatan reproduksi dan pencegahan perkawinan anak di pedesaan Indonesia.
          </p>
        </div>

        {/* Layout Konten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Card 1 — Visi */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 min-h-[300px] transition-all duration-300 hover:border-teal-500 hover:shadow-md hover:-translate-y-1 group">
            <div className="w-[80px] h-[80px] rounded-full bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 cursor-default">
              <Target className="w-[40px] h-[40px] text-teal-600" />
            </div>
            <h3 className="text-[14px] font-bold text-teal-600 uppercase tracking-widest mb-4">Visi Kami</h3>
            <p className="text-[16px] md:text-[18px] text-gray-800 leading-relaxed font-medium">
              "Mewujudkan generasi muda Indonesia yang sehat, berdaya, terliterasi dengan baik secara digital, dan bebas dari bahaya perkawinan anak demi masa depan yang lebih cerah."
            </p>
          </div>

          {/* Card 2 — Misi */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 min-h-[300px] transition-all duration-300 hover:border-coral-500 hover:shadow-md hover:-translate-y-1 group">
             <div className="w-[80px] h-[80px] rounded-full bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 cursor-default">
              <Compass className="w-[40px] h-[40px] text-coral-500" />
            </div>
            <h3 className="text-[14px] font-bold text-coral-500 uppercase tracking-widest mb-4">Misi Kami</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-coral-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">Menyediakan literasi kesehatan reproduksi yang mudah dipahami.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-coral-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">Membangun ruang aman eksplorasi untuk konseling sebaya.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-coral-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">Mendorong remaja menatap arah merencanakan masa depan.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-coral-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-relaxed">Menurunkan angka risiko perkawinan anak di pedesaan Indonesia.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
