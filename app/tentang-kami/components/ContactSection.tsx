import { Mail, Globe, Users, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <div className="bg-teal-600 relative overflow-hidden py-16 md:py-24 px-6 md:px-16">
      
      {/* Geometric Overlay Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full text-teal-900" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <polygon points="0,0 20,0 0,20" />
          <polygon points="100,0 100,30 70,0" />
          <polygon points="100,100 80,100 100,80" />
          <polygon points="0,100 0,60 40,100" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Header Text */}
        <h2 className="text-[32px] md:text-[40px] font-heading font-bold text-white mb-4">
          Hubungi Kami
        </h2>
        <p className="text-[16px] md:text-[18px] text-white/90 max-w-xl mx-auto mb-12">
          Punya pertanyaan lebih lanjut terkait pendaftaran sukarelawan, usulan kerja sama kampus, atau kolaborasi instansi?
        </p>

        {/* Contact Info (Row on Desktop, Col on Mobile) */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-16">
          
          <div className="flex flex-col items-center text-white gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
              <Mail className="w-5 h-5 text-teal-100" />
            </div>
            <span className="text-[15px] font-bold">Email</span>
            <span className="text-[15px] text-teal-100/90 hover:text-white transition-colors cursor-pointer">info@reprodigitalyouth.id</span>
          </div>

          <div className="flex flex-col items-center text-white gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
              <Globe className="w-5 h-5 text-teal-100" />
            </div>
            <span className="text-[15px] font-bold">Instagram</span>
            <span className="text-[15px] text-teal-100/90 hover:text-white transition-colors cursor-pointer">@ReproDigitalYouth_PM</span>
          </div>

          <div className="flex flex-col items-center text-white gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
              <MapPin className="w-5 h-5 text-teal-100" />
            </div>
            <span className="text-[15px] font-bold">Lokasi</span>
            <span className="text-[15px] text-teal-100/90">Jember, Jawa Timur</span>
          </div>

        </div>

        {/* Social Media Buttons Platform List */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-16">
          <button 
            className="w-[56px] h-[56px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white transition-all duration-300 ease-out hover:bg-white hover:text-teal-600 hover:scale-110 hover:-rotate-6"
            aria-label="Instagram"
          >
            <Globe className="w-6 h-6" />
          </button>
          <button 
            className="w-[56px] h-[56px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white transition-all duration-300 ease-out hover:bg-white hover:text-teal-600 hover:scale-110 hover:rotate-6"
            aria-label="Facebook"
          >
            <Users className="w-6 h-6" />
          </button>
          <button 
            className="w-[56px] h-[56px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white transition-all duration-300 ease-out hover:bg-white hover:text-teal-600 hover:scale-110 hover:-rotate-6"
            aria-label="YouTube"
          >
            <Video className="w-6 h-6" />
          </button>
          <button 
            className="w-[56px] h-[56px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white transition-all duration-300 ease-out hover:bg-white hover:text-teal-600 hover:scale-110 hover:rotate-[5deg]"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </button>
        </div>

        {/* Call-to-action */}
        <div className="bg-teal-700/40 p-8 md:p-10 rounded-2xl w-full max-w-[800px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 border border-teal-500/30">
          <p className="text-white font-bold text-[20px] md:text-[24px] text-center md:text-left leading-tight">
            Tertarik bergabung sebagai mitra strategis atau relawan kampus?
          </p>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white font-bold h-14 px-8 rounded-xl shadow-md border-0 w-full md:w-auto shrink-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-95 text-[16px]">
            Hubungi Tim Kami
          </Button>
        </div>

      </div>
    </div>
  );
}
