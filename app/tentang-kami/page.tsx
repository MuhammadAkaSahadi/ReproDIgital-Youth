import { HeroSection } from "./components/HeroSection";
import { MisiVisiSection } from "./components/MisiVisiSection";
import { TeamSection } from "./components/TeamSection";
import { PartnerSection } from "./components/PartnerSection";
import { ContactSection } from "./components/ContactSection";

export const metadata = {
  title: "Tentang Kami - ReproDigital Youth",
  description: "Kenali lebih jauh misi dan visi dari ReproDigital Youth.",
};

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Misi & Visi Section */}
      <MisiVisiSection />
      
      {/* 3. Tim Section */}
      <TeamSection />

      {/* 4. Mitra Program Section */}
      <PartnerSection />
      
      {/* 5. Kontak Section */}
      <ContactSection />
    </div>
  );
}
