import { BookOpen, MessageCircle, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Edukasi Interaktif",
    description: "Artikel, video, kuis, dan infografis terkini seputar kesehatan reproduksi remaja.",
    icon: BookOpen,
    link: "/edukasi"
  },
  {
    title: "Konseling Sebaya",
    description: "Ruang aman untuk bercerita dan berkonsultasi dengan konselor sebaya yang ramah dan terlatih.",
    icon: MessageCircle,
    link: "/konseling"
  },
  {
    title: "Perencanaan Masa Depan",
    description: "Tetapkan tujuan, rancang langkahmu, dan persiapkan masa depan yang sehat dan bahagia.",
    icon: Target,
    link: "/perencanaan"
  }
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[24px] md:text-[30px] lg:text-[36px] leading-tight font-heading font-bold text-gray-900 mb-4">
            Jelajahi Fitur Kami
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan alat dan informasi yang kamu butuhkan untuk memahami tubuhmu dan merencanakan masa depan dengan percaya diri.
          </p>
        </div>

        {/* Feature Cards Grid (1 col on mobile/tablet, 3 cols on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-[0_12px_24px_rgba(13,148,136,0.15)] hover:scale-[1.02] hover:border-teal-500 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-br from-teal-50 to-teal-100 flex items-center justify-center mb-6 shrink-0 transition-transform group-hover:scale-110 duration-300">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
              </div>
              
              {/* Text Content */}
              <h3 className="text-[20px] md:text-[24px] font-heading font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-gray-600 mb-8 flex-1">
                {feature.description}
              </p>
              
              {/* Action Link */}
              <Link 
                href={feature.link}
                className="inline-flex items-center text-[14px] md:text-[16px] font-medium text-teal-600 group-hover:text-coral-500 transition-colors mt-auto"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
