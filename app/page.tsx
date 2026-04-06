import { Button } from "@/components/ui/button";
import { Play, ShieldCheck, HeartHandshake, CheckCircle } from "lucide-react";
import { FeaturesSection } from "@/app/components/home/FeaturesSection";
import { TestimonialsSection } from "@/app/components/home/TestimonialsSection";
import { CTASection } from "@/app/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[600px] lg:max-h-[800px] lg:h-[calc(100vh-80px)] flex items-center bg-linear-to-b from-teal-50 to-white overflow-hidden py-16 md:py-0">
        
        {/* Decorative elements - Organic shapes SVG representation */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-teal-100 opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-coral-50 opacity-60 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col md:flex-row items-center">
          
          {/* Kolom Kiri: Teks & CTA (Desktop: 60%, Tablet: 55%, Mobile: Single column order 2) */}
          <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col justify-center order-2 md:order-1 mt-10 md:mt-0 lg:pr-12 xl:pr-16">
            
            <h1 className="text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[48px] lg:leading-[56px] font-heading font-bold text-gray-900 mb-6">
              Wujudkan Masa Depanmu <span className="text-teal-600 lg:block">Lebih Cerah</span>
            </h1>
            
            <p className="text-[16px] md:text-[18px] leading-[28px] text-gray-600 mb-8 max-w-xl">
              Platform edukasi dan konseling kesehatan reproduksi yang aman, rahasia, dan dirancang khusus untuk remaja sepertimu. Temukan jawaban atas pertanyaanmu dan rencanakan masa depan dengan percaya diri.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-coral-500 hover:bg-coral-600 text-white h-12 px-8 rounded-md shadow-md text-base transition-all font-medium">
                Mulai Belajar
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-teal-600 text-teal-600 hover:bg-teal-50 bg-white h-12 px-8 rounded-md shadow-sm text-base transition-all font-medium">
                <Play className="w-5 h-5 mr-2" />
                Lihat Video
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 md:mt-16 lg:mt-24 grid grid-cols-2 md:flex md:flex-row items-start md:items-center justify-start gap-y-6 md:gap-y-0 gap-x-4 lg:gap-x-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 leading-tight">Aman &<br className="hidden md:block lg:hidden" /> Rahasia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 leading-tight">Konselor<br className="hidden md:block lg:hidden" /> Terlatih</span>
              </div>
              <div className="flex items-center gap-3 col-span-2 md:col-span-1 mt-2 md:mt-0">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 leading-tight">Gratis<br className="hidden md:block lg:hidden" /> Selamanya</span>
              </div>
            </div>
            
          </div>

          {/* Kolom Kanan: Ilustrasi (Desktop: 40%, Tablet: 45%, Mobile: Single column order 1) */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-auto md:w-[45%] lg:w-[40%] flex justify-center items-center order-1 md:order-2 relative">
            
            {/* Hero Illustration Container */}
            <div className="relative w-full max-w-[500px] aspect-4/3 bg-teal-100/40 rounded-2xl flex items-center justify-center border border-white/60 shadow-[0_20px_40px_-15px_rgba(13,148,136,0.15)] overflow-visible backdrop-blur-sm group">
              {/* Decorative inner gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-teal-500/5 to-coral-500/5 rounded-2xl" />
              
              {/* Placeholder text indicating where the illustration goes */}
              <div className="relative text-center space-y-4">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-md border-4 border-teal-50 overflow-hidden transform transition-transform group-hover:scale-105 duration-300">
                  <span className="text-4xl text-coral-500 font-heading font-bold drop-shadow-sm">✨</span>
                </div>
                <p className="text-teal-700 font-medium text-sm md:text-base px-6">
                  [Ilustrasi Remaja Indonesia Diverse (4:3)]
                </p>
              </div>
              
              {/* Floating Card Overlay */}
              <div className="absolute -bottom-6 -left-2 md:-left-8 bg-white p-3 md:p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 transition-transform group-hover:-translate-y-1 duration-300">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-[3px] border-white bg-teal-400" />
                  <div className="w-8 h-8 rounded-full border-[3px] border-white bg-coral-400" />
                  <div className="w-8 h-8 rounded-full border-[3px] border-white bg-peach-400" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-sm font-bold text-gray-900 leading-none">1.200+</span>
                  <span className="text-[10px] text-gray-500 font-medium leading-tight mt-1">Remaja Bergabung</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Fitur Utama Section */}
      <FeaturesSection />

      {/* 4. Testimoni Section */}
      <TestimonialsSection />

      {/* 5. CTA Section */}
      <CTASection />

    </div>
  );
}
