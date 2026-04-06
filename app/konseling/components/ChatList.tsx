"use client";

import { Search, MessageSquarePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKonselingStore } from "@/store/useKonselingStore";

const MOCK_CHATS = [
  { 
    id: "session_1", 
    name: "Dr. Anita (Konselor)", 
    lastMessage: "Halo! Bagaimana perasaanmu hari ini? Ada yang ingin diceritakan?", 
    time: "10:30", 
    unread: 2, 
    online: true 
  },
  { 
    id: "session_2", 
    name: "Rizky (Konselor Sebaya)", 
    lastMessage: "Baik, mari kita bahas rencana studi dan goals-mu ya.", 
    time: "Kemarin", 
    unread: 0, 
    online: false 
  },
  { 
    id: "session_3", 
    name: "Sinta (Konselor Sebaya)", 
    lastMessage: "Jangan sungkan untuk chat kapan pun kalau kamu butuh ngobrol.", 
    time: "Senin", 
    unread: 0, 
    online: true 
  },
];

export function ChatList() {
  const { activeSessionId, setActiveSession } = useKonselingStore();

  return (
    <div className="flex flex-col h-full bg-white md:border-r md:border-gray-200 w-full md:w-[360px] shrink-0">
      
      {/* Header Area */}
      <div className="bg-teal-600 p-6 flex-shrink-0 relative z-10 hidden md:block">
        <h3 className="text-white font-heading font-bold text-[22px] leading-tight mb-1">
          Konseling Sebaya
        </h3>
        <p className="text-white/80 text-[14px] font-medium tracking-wide">
          Ruang aman & rahasia
        </p>
        <Button className="w-full mt-6 bg-coral-500 hover:bg-coral-400 text-white font-bold h-12 shadow-sm transition-all border-0 rounded-lg group">
          <MessageSquarePlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Mulai Obrolan Baru
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <Input 
            className="w-full h-11 pl-10 pr-4 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all font-medium placeholder:text-gray-400" 
            placeholder="Cari obrolan..." 
          />
        </div>
      </div>

      {/* Chat List Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}} />
        
        {MOCK_CHATS.length > 0 ? (
          MOCK_CHATS.map((chat) => {
            const isActive = activeSessionId === chat.id;
            return (
              <div 
                key={chat.id}
                onClick={() => setActiveSession(chat.id)}
                className={`flex items-center gap-4 h-[84px] px-5 border-b border-gray-100 cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-teal-50/70 border-l-[4px] border-l-teal-500 md:pr-[16px]' 
                    : 'bg-white hover:bg-gray-50 border-l-[4px] border-l-transparent md:pr-[20px]'
                }`}
              >
                {/* Avatar + Online Badge */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <Avatar className="w-[48px] h-[48px] border border-gray-100">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name.replace(/\s+/g, '')}`} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0.5 right-0.5 w-[12px] h-[12px] bg-green-500 border-2 border-white rounded-full z-10 shadow-sm" title="Online"></span>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-gray-900 text-[15px] truncate pr-2">
                      {chat.name}
                    </span>
                    <span className="text-[12px] font-medium text-gray-500 shrink-0">
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-[13px] truncate ${isActive || chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {chat.unread > 0 && (
                  <div className="w-[20px] h-[20px] rounded-full bg-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-[10px] font-bold">{chat.unread}</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MessageSquarePlus className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="font-heading font-bold text-gray-900 text-[16px] mb-1">Belum ada obrolan</h4>
            <p className="text-gray-500 text-[14px] mb-6">Mulai konsultasi pertamamu sekarang.</p>
            <Button className="bg-coral-500 hover:bg-coral-600 text-white border-0">Mulai Konseling</Button>
          </div>
        )}
      </div>
      
    </div>
  );
}
