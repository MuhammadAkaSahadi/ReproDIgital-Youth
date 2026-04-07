import { Building2, HeartPulse, Landmark, BookOpenCheck } from "lucide-react";

export function PartnerSection() {
  const partners = [
    {
      id: "p1",
      name: "SMP Madinatul Ulum",
      type: "Sekolah Mitra",
      description: "Mitra institusi pendidikan untuk diseminasi literasi dan lokakarya langsung di pedesaan Jember.",
      icon: <BookOpenCheck className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    },
    {
      id: "p2",
      name: "Puskesmas Jenggawah",
      type: "Fasilitas Kesehatan",
      description: "Penyedia rujukan konseling medis valid dan kampanye kesehatan bagi para remaja program.",
      icon: <HeartPulse className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    },
    {
      id: "p3",
      name: "Desa Cangkring",
      type: "Pemerintah Desa",
      description: "Pemberi keleluasaan akses ruang aman dan persetujuan inisiatif pembinaan kepemudaan desa.",
      icon: <Landmark className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    },
    {
      id: "p4",
      name: "Universitas Jember",
      type: "Perguruan Tinggi",
      description: "Pendukung riset edukatorial dan penyedia relawan penggiat kesehatan reproduksi mahasiswa.",
      icon: <Building2 className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-[32px] md:text-[36px] font-heading font-bold text-gray-900 mb-4">Jejaring Mitra Kami</h2>
          <p className="text-[16px] md:text-[18px] text-gray-600">
            Perubahan besar tak bisa dilakukan sendiri. Kami bergerak bersama institusi tepercaya dari beragam sektor.
          </p>
        </div>

        {/* Grid Mitra (2x2 Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[900px] mx-auto">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 transition-all duration-300 hover:border-teal-500 hover:shadow-md group"
            >
              {/* Logo Box */}
              <div className="w-[80px] h-[80px] rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors group-hover:rotate-3">
                {partner.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-[20px] font-bold text-gray-900 mb-1 leading-tight group-hover:text-teal-700 transition-colors">{partner.name}</h4>
                <p className="text-coral-500 text-[13px] font-bold uppercase tracking-wide mb-3">{partner.type}</p>
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
