"use client";

import { Camera, Edit2, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileHeader({ profile }: { profile?: any }) {
  return (
    <div className="relative w-full pb-8">
      
      {/* Cover Area */}
      <div className="relative w-full h-[200px] md:h-[240px] lg:h-[280px] bg-linear-to-br from-teal-600 to-coral-500 overflow-hidden">
        {/* Geometric overlay pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="white" />
                <path d="M 40 0 L 0 40" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </div>
      </div>

      {/* Avatar & Profile Info Container */}
      <div className="relative px-4 md:px-8 lg:px-16 container mx-auto flex flex-col md:flex-row md:items-end">
        
        {/* Avatar Setup */}
        {/* Offset negative margin memposisikan Setengah di atas Cover, Setengah di konten */}
        <div className="relative -mt-[48px] md:-mt-[64px] z-20 self-center md:self-start group mx-auto md:mx-0 shrink-0">
          <div className="w-[96px] h-[96px] md:w-[128px] md:h-[128px] lg:w-[160px] lg:h-[160px] rounded-full border-[4px] lg:border-[6px] border-white overflow-hidden shadow-lg bg-gray-200 relative transition-transform duration-300 group-hover:scale-105 cursor-pointer">
            <img 
              src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || 'User')}&background=0D9488&color=fff&size=400`}
              alt={`Avatar ${profile?.full_name}`} 
              className="w-full h-full object-cover"
            />
            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Camera className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Profile Info Setup */}
        <div className="mt-4 md:mt-0 md:ml-6 lg:ml-8 flex-1 text-center md:text-left pt-0 md:pt-[24px]">
          
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 leading-tight">
              {profile?.full_name || 'Arif Rahman'}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[15px] font-medium text-gray-500">@{profile?.username || (profile?.full_name?.toLowerCase().replace(/\s/g, '_') || 'user')}</span>
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[12px] font-bold rounded-full border border-teal-100">
                {profile?.role === 'admin' ? 'Administrator' : profile?.role === 'counselor' ? 'Konselor' : 'Siswa/Remaja'}
              </span>
            </div>
          </div>

          <p className="text-[15px] text-gray-700 max-w-[600px] mx-auto md:mx-0 mb-4 leading-relaxed">
            {profile?.bio || 'Berkomitmen untuk terus belajar dan membagikan informasi edukatif seputar kesehatan remaja dan pengembangan diri.'}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 lg:gap-6 text-[14px] text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-[18px] h-[18px]" strokeWidth={2.5} />
              <span>{profile?.school_name || 'Sekolah Belum Diisi'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-[18px] h-[18px]" />
              <span>Bergabung {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : 'Baru Saja'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
