import { University, Globe, Mail } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  const teamMembers = [
    {
      id: "t1",
      name: "Divacyl Fiana Agustin",
      role: "Ketua Tim",
      studyContext: "Kesehatan Masyarakat",
      photoUrl:
        "https://ui-avatars.com/api/?name=Divacyl+Fiana&background=0D9488&color=fff&size=400",
    },
    {
      id: "t2",
      name: "Zahrotul Kamila",
      role: "Anggota Tim",
      studyContext: "Kesehatan Masyarakat",
      photoUrl:
        "https://ui-avatars.com/api/?name=Zahrotul+Kamila&background=0D9488&color=fff&size=400",
    },
    {
      id: "t3",
      name: "Aulia Friska Fadillah",
      role: "Anggota Tim",
      studyContext: "Kesehatan Masyarakat",
      photoUrl:
        "https://ui-avatars.com/api/?name=Aulia+Friska&background=0D9488&color=fff&size=400",
    },
    {
      id: "t4",
      name: "Mayona Putri",
      role: "Anggota Tim",
      studyContext: "Kesehatan Masyarakat",
      photoUrl:
        "https://ui-avatars.com/api/?name=Mayona+Putri&background=0D9488&color=fff&size=400",
    },
    {
      id: "t5",
      name: "Muhammad Aka Sahadi",
      role: "Anggota Tim",
      studyContext: "Teknologi Informasi",
      photoUrl:
        "https://ui-avatars.com/api/?name=Muhammad+Aka&background=0D9488&color=fff&size=400",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[36px] font-heading font-bold text-gray-900 mb-4">Kenali Tim Kami</h2>
          <p className="text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto">
            Orang-orang berdedikasi di balik platform edukasi progresif ini.
          </p>
        </div>

        {/* Grid Tim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02] group flex flex-col"
            >
              {/* Foto Container dengan aspect ratio 4:5 */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                {/* Menggunakan elemen img murni tanpa Next Image agar lebih fleksibel di prototype, namun menggunakan styling tailwind. */}
                <img 
                  src={member.photoUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>

              {/* Info Container */}
              <div className="p-6 flex flex-col items-center text-center flex-1">
                <h4 className="text-[18px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-teal-600 transition-colors">{member.name}</h4>
                
                <span className="inline-block bg-teal-50 text-teal-600 text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 border border-teal-100">
                  {member.role}
                </span>
                
                <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium mb-6 mt-auto">
                  <University className="w-4 h-4 shrink-0" />
                  <span>{member.studyContext}</span>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 border-t border-gray-100 w-full pt-4 justify-center">
                  <button className="text-gray-400 hover:text-[#0A66C2] transition-colors p-1" aria-label="Professional Profile">
                    <Globe className="w-[20px] h-[20px]" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-1" aria-label="Email Contact">
                    <Mail className="w-[20px] h-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
