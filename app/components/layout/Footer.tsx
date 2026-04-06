import Link from "next/link";
import { Heart, Camera, MessageSquare, Hash, PlayCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FOOTER_LINKS = [
  {
    title: "Tentang",
    links: [
      { name: "Tentang Kami", href: "/tentang-kami" },
      { name: "Tim Konselor", href: "#" },
      { name: "Kontak", href: "#" },
      { name: "Pertanyaan Umum (FAQ)", href: "#" },
    ],
  },
  {
    title: "Fitur",
    links: [
      { name: "Edukasi Interaktif", href: "/edukasi" },
      { name: "Konseling Sebaya", href: "/konseling" },
      { name: "Perencanaan Masa Depan", href: "/perencanaan" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Kebijakan Privasi", href: "#" },
      { name: "Syarat Ketentuan", href: "#" },
      { name: "Keamanan Sistem", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        
        {/* Desktop Grid Layout (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand Column */}
          <div className="col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                ReproDigital
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Platform edukasi dan konseling kesehatan reproduksi remaja yang aman, rahasia, dan terpercaya.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 -ml-2 text-gray-400 hover:text-teal-500 hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center" aria-label="Instagram">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-teal-500 hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center" aria-label="Twitter">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-teal-500 hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center" aria-label="Youtube">
                <PlayCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-teal-500 hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center" aria-label="Facebook">
                <Hash className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h4 className="text-white text-[14px] font-bold uppercase tracking-wider mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-teal-500 text-sm font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>

        {/* Mobile Accordion Layout (Hidden on Desktop) */}
        <div className="md:hidden pb-10">
          
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                ReproDigital Youth
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-[280px]">
              Platform edukasi dan konseling kesehatan reproduksi remaja.
            </p>
          </div>

          <Accordion className="w-full border-t border-gray-800">
            {FOOTER_LINKS.map((section, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-800">
                <AccordionTrigger className="text-white hover:text-teal-400 hover:no-underline text-sm font-bold uppercase py-4">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pb-2 pt-1 pl-2 text-left">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={link.href}
                          className="text-gray-400 hover:text-teal-400 text-sm inline-block py-1"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex items-center justify-center gap-6 mt-10">
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Instagram">
              <Camera className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Twitter">
              <MessageSquare className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Youtube">
              <PlayCircle className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Facebook">
              <Hash className="w-6 h-6" />
            </Link>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 md:pt-8 w-full flex flex-col md:flex-row items-center justify-center">
          <p className="text-gray-500 text-sm text-center">
            © 2026 ReproDigital Youth. Semua hak dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
}
