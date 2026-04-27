import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative w-full bg-teal-600 py-16 md:py-20 lg:py-24 overflow-hidden">
      
      {/* Pattern Overlay: Geometric subtle Teal 700 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Subtle geometric pattern using CSS repeating linear gradient to mimic geometric shapes */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #0F766E 25%, transparent 25%, transparent 75%, #0F766E 75%, #0F766E), linear-gradient(45deg, #0F766E 25%, transparent 25%, transparent 75%, #0F766E 75%, #0F766E)`,
          backgroundSize: `60px 60px`,
          backgroundPosition: `0 0, 30px 30px`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] leading-tight font-heading font-bold text-white mb-6">
            Siap Memulai Perjalananmu?
          </h2>
          
          <p className="text-[16px] md:text-[18px] text-white/90 mb-10 max-w-2xl leading-relaxed">
            Bergabunglah bersama ribuan remaja lainnya yang telah mendapatkan akses ke edukasi terpercaya, 
            konseling aman, dan perencanaan masa depan yang lebih baik. Ruang amanmu menanti.
          </p>

          <Link 
            href="/register"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto bg-coral-500 hover:bg-coral-400 text-white h-14 px-12 rounded-[min(var(--radius-md),12px)] shadow-lg hover:shadow-xl text-lg font-medium transition-all group"
            )}
          >
            Daftar Sekarang
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </section>
  );
}
