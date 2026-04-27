"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Paperclip, CheckCheck, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { sendMessage } from "./actions";
import { format } from "date-fns";

// Mock Data untuk render awal UI
const MOCK_CONTACTS = [
  {
    id: "uuid-session-1", // Diganti menjadi string UUID later in real DB
    name: "Siswa A",
    topic: "Kesehatan Reproduksi",
    lastMessage: "Terima kasih atas sarannya, Kak.",
    lastTime: "10:30",
    unread: 2,
    active: true,
    status: "Aktif",
  },
  {
    id: "uuid-session-2",
    name: "Siswa B",
    topic: "Perkawinan Anak",
    lastMessage: "Saya merasa bingung...",
    lastTime: "Kemarin",
    unread: 0,
    active: false,
    status: "Menunggu",
  },
];

const INITIAL_MESSAGES = [
  {
    id: "mock-1",
    content: "Halo Kak, saya ingin berkonsultasi mengenai perubahan yang saya alami akhir-akhir ini.",
    created_at: new Date().toISOString(),
    sender_id: "student-uuid", // assume not current user
  },
  {
    id: "mock-2",
    content: "Halo Siswa. Silakan ceritakan, di sini aman dan rahasiamu terjaga.",
    created_at: new Date().toISOString(),
    sender_id: "me", // assume current user
  },
];

export default function KonselingChatPage() {
  const [activeContact, setActiveContact] = useState(MOCK_CONTACTS[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGES);
  const [userId, setUserId] = useState<string>("me");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    // Ambil current user untuk identifikasi "isSender"
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
      }
    });

    // Subscribe ke Realtime Supabase untuk tabel "messages"
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          // opsional: filter: `session_id=eq.${activeContact.id}`
        },
        (payload) => {
          // Jika pesan baru dari channel realtime yang sama dengan kontak aktif
          if (payload.new.session_id === activeContact.id) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeContact, supabase]);

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const contentToSend = messageInput;
    setMessageInput(""); // optimistik clear
    
    // Server Action
    const res = await sendMessage(activeContact.id, contentToSend);
    
    if (res.success && res.message) {
      // Karena Realtime mungkin cepat, kita bisa membiarkan channel supabase yang push state,
      // Tapi update optimistic juga aman asalkan kita handle deduplikasi.
      // Di sini kita biarkan Realtime Subscription yang menambah list pesan untuk konsistensi di multi-device.
    } else {
      console.error(res.error);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] flex flex-col pt-2 animate-in fade-in duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">Konseling Sebaya</h1>
          <p className="text-sm text-gray-600 mt-1">Sesi pendampingan siswa secara anonim dan aman (Realtime Active)</p>
        </div>
      </div>

      <Card className="flex-1 flex overflow-hidden border-gray-200 shadow-sm rounded-xl bg-white h-full w-full max-h-[600px] min-h-[500px]">
        {/* Left Sidebar (Contacts) */}
        <div className="w-full md:w-[320px] border-r border-gray-200 flex flex-col h-full bg-white shrink-0 hidden md:flex">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Link href="/dashboard" className="text-gray-500 hover:text-teal-600 transition-colors inline-flex items-center gap-1 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full hide-scrollbar">
            {MOCK_CONTACTS.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={cn(
                  "p-4 border-b border-gray-50 cursor-pointer transition-base hover:bg-gray-50 flex items-start gap-3",
                  activeContact.id === contact.id ? "bg-teal-50" : ""
                )}
              >
                <Avatar className="h-12 w-12 border border-white shadow-sm shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className={activeContact.id === contact.id ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"}>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h4>
                    <span className="text-xs text-gray-500 shrink-0">{contact.lastTime}</span>
                  </div>
                  <p className="text-xs font-medium text-teal-600 mb-1">{contact.topic}</p>
                  <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane (Chat Area) */}
        <div className="flex-1 flex flex-col h-full bg-gray-50/30">
          <div className="h-16 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 md:gap-4">
              <button className="md:hidden text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-teal-600 text-white"><User className="w-5 h-5" /></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-gray-900 leading-none mb-1 font-heading">{activeContact.name}</h3>
                <p className="text-xs font-medium text-teal-600">{activeContact.topic}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg) => {
              const isSender = msg.sender_id === userId;
              
              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex w-full",
                    isSender ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[85%] md:max-w-md px-4 py-2.5 rounded-2xl relative group",
                      isSender 
                        ? "bg-teal-600 text-white rounded-br-sm" 
                        : "bg-white border border-gray-100 shadow-sm text-gray-900 rounded-bl-sm"
                    )}
                  >
                    <p className="text-sm leading-relaxed mb-1">{msg.content}</p>
                    <div 
                      className={cn(
                        "flex items-center justify-end gap-1 text-[10px]",
                        isSender ? "text-teal-100" : "text-gray-400"
                      )}
                    >
                      <span>{format(new Date(msg.created_at), "HH:mm")}</span>
                      {isSender && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-200 shrink-0">
            <form onSubmit={handleSend} className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto">
              <Button type="button" variant="ghost" size="icon" className="shrink-0 text-gray-400 hover:text-gray-600 rounded-full hidden sm:flex">
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Ketik balasan untuk siswa..."
                  className="w-full bg-gray-50 border-gray-300 focus-visible:ring-teal-600 rounded-full pr-4 pl-4 py-6 text-sm"
                />
              </div>

              <Button 
                type="submit" 
                size="icon" 
                className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white rounded-full h-12 w-12 shadow-sm transition-fast"
                disabled={!messageInput.trim()}
              >
                <Send className="w-5 h-5 ml-0.5" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
