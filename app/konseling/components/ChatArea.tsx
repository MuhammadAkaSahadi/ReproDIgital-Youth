"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { sendMessage } from "@/app/actions/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Phone, MoreVertical, Paperclip, Smile, SendHorizontal } from "lucide-react";

// Dummy UUID for sending/identifying the current user temporarily until Auth is fully set
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000";

// For UI Demonstration before DB hooks are fully solid
const MOCK_MESSAGES = [
  { id: "msg_1", content: "Halo, ini Dr. Anita. Ada yang bisa aku bantu hari ini?", sender: "counselor", created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: "msg_2", content: "Iya ibu, belakangan ngerasa sering stress gara-gara banyak tuntutan akademik.", sender_id: MOCK_USER_ID, created_at: new Date(Date.now() - 3000000).toISOString() },
];

export function ChatArea({ sessionId, onBack }: { sessionId: string; onBack?: () => void }) {
  const [messages, setMessages] = useState<any[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to real-time updates for this session
  useEffect(() => {
    if (!sessionId) return;
    
    // Subscribe to INSERT events on table 'messages'
    const channel = supabase
      .channel(`public:messages:session_id=eq.${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log("Realtime message received!", payload.new);
          // If the message is from us, we might have already added it optimistically
          // Simple duplication prevention by checking if we just added it
          setMessages((prev) => {
            const exists = prev.find(m => m.id === payload.new.id || (m.content === payload.new.content && m.sender_id === payload.new.sender_id));
            if (exists) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, supabase]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newContent = input.trim();
    setInput("");

    // Optimistic Update purely for UI smoothness
    const optimisticMsg = {
      id: crypto.randomUUID(),
      content: newContent,
      sender_id: MOCK_USER_ID,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    // Fire Server Action
    const result = await sendMessage(sessionId, newContent);
    if (!result.success) {
      console.error("Gagal mengirim pesan:", result.error);
      // In advanced apps, toast an error and remove the optimistic bubble here
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50/50 absolute inset-0 z-50 md:relative md:z-auto">
      
      {/* Chat Header */}
      <div className="h-[72px] md:h-[80px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-xs z-10 py-2 md:py-0">
        <div className="flex items-center gap-3">
          {/* Mobile Back Button */}
          {onBack && (
            <button 
              onClick={onBack} 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold active:bg-gray-200"
            >
              &larr;
            </button>
          )}

          <Avatar className="w-10 h-10 border border-gray-100">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Anita`} />
            <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">A</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center translate-y-[-2px]">
            <p className="font-heading font-bold text-gray-900 text-[15px] leading-tight mt-1">Dr. Anita</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></span>
              <p className="text-[12px] text-green-600 font-medium tracking-wide leading-none">Online</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 md:gap-2 text-gray-600">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 hidden sm:flex">
            <Video className="w-[18px] h-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
            <Phone className="w-[18px] h-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
            <MoreVertical className="w-[18px] h-[18px]" />
          </Button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col p-4 md:p-6 pb-2" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%230d9488%22 fill-opacity=%220.03%22 fill-rule=%22evenodd%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%223%22/%3E%3Ccircle cx=%2213%22 cy=%2213%22 r=%223%22/%3E%3C/g%3E%3C/svg%3E')" }}>
        
        {/* System Message Example */}
        <div className="flex justify-center mb-6 mt-2">
          <span className="bg-gray-200/80 text-gray-600 text-[12px] font-medium px-4 py-1.5 rounded-full shadow-xs">
            Sesi ini aman dan terenkripsi
          </span>
        </div>

        {messages.map((msg, idx) => {
          const isUser = msg.sender_id === MOCK_USER_ID || msg.sender === "user"; // Compatible with mock vs real data

          return (
            <div key={msg.id || idx} className={`flex flex-col mb-4 w-full max-w-[85%] md:max-w-[75%] ${isUser ? "self-end items-end" : "self-start items-start"}`}>
              <div className={`p-3 md:px-4 md:py-3.5 shadow-sm min-w-[60px] ${
                  isUser 
                    ? "bg-teal-600 text-white rounded-2xl rounded-br-none" 
                    : "bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-bl-none"
                }`}
              >
                <p className="text-[14px] md:text-[15px] leading-relaxed break-words">{msg.content}</p>
              </div>
              
              <div className="flex items-center gap-1 mt-1.5 px-1">
                <span className="text-[10px] md:text-[11px] text-gray-500 font-medium">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isUser && (
                  <span className="text-teal-500 text-[12px] font-bold ml-1 tracking-tighter shrink-0 leading-none">✓✓</span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="bg-white border-t border-gray-200 px-3 py-3 md:p-5 shrink-0 flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-500 shrink-0">
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik balasan pesan..."
            className="w-full h-11 md:h-12 pl-4 pr-12 bg-gray-50 border-gray-300 rounded-full focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all font-medium placeholder:text-gray-400"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 text-gray-400 hover:text-gray-600 hover:bg-transparent shrink-0 focus:outline-none">
            <Smile className="w-[18px] h-[18px]" />
          </Button>
        </div>

        <Button 
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-11 h-11 md:w-12 md:h-12 rounded-full p-0 flex items-center justify-center shrink-0 bg-teal-600 hover:bg-teal-500 transition-all disabled:bg-gray-300 disabled:opacity-100 border-0 shadow-sm disabled:cursor-not-allowed cursor-pointer active:scale-95"
        >
          <SendHorizontal className="w-5 h-5 text-white mr-0.5 mt-0.5" />
        </Button>
      </div>

    </div>
  );
}
