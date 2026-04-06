"use client";

import { useKonselingStore } from "@/store/useKonselingStore";
import { ChatList } from "./components/ChatList";
import { CounselorGrid } from "./components/CounselorGrid";
import { ChatArea } from "./components/ChatArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

export default function KonselingPage() {
  const { activeSessionId, setActiveSession } = useKonselingStore();

  return (
    <div className="flex w-full bg-white h-[calc(100vh-80px)] overflow-hidden">
      
      {/* =========================================
          DESKTOP LAYOUT (>= md)
          Two-pane Layout
      ========================================= */}
      <div className="hidden md:flex w-full h-full">
        {/* L1: Left Pane (Chat List) */}
        <ChatList />

        {/* L2: Right Pane (Chat Interface / Counselor Selection) */}
        <div className="flex-1 bg-gray-50 flex flex-col relative overflow-hidden">
          
           {!activeSessionId ? (
             /* Initial State (B.4) — Pemilihan Konselor */
             <div className="flex-1 flex flex-col items-center pt-16 px-8 overflow-y-auto w-full">
               <div className="w-20 h-20 bg-teal-100/50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-teal-100 shrink-0">
                  <Heart className="w-8 h-8 text-teal-600 fill-teal-600/20" />
               </div>
               <h2 className="text-[28px] font-heading font-bold text-gray-900 mb-2 shrink-0">
                 Pilih Konselor
               </h2>
               <p className="text-gray-500 text-[16px] max-w-md mx-auto text-center mb-8 shrink-0">
                 Semua obrolan bersifat rahasia dan aman. Pilih pesan di sebelah kiri atau temukan konselor yang pas untukmu.
               </p>
               
               <div className="w-full max-w-3xl flex-1">
                 <CounselorGrid />
               </div>
             </div>
           ) : (
             /* Chat Interface (B.3) */
             <div className="flex-1 flex flex-col overflow-hidden w-full h-full relative">
               <ChatArea sessionId={activeSessionId} />
             </div>
           )}

        </div>
      </div>

      {/* =========================================
          MOBILE LAYOUT (< md)
          Tabbed Interface / Fullscreen Chat
      ========================================= */}
      <div className="flex md:hidden w-full h-full flex-col">
        {!activeSessionId ? (
          
          <Tabs defaultValue="obrolan" className="w-full flex-1 flex flex-col h-full bg-white">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-gray-200 h-14 bg-white p-0">
              <TabsTrigger 
                value="obrolan" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none h-full text-[15px] font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Obrolan
              </TabsTrigger>
              <TabsTrigger 
                value="konselor" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none h-full text-[15px] font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Konselor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="obrolan" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col bg-white">
              <ChatList />
            </TabsContent>
            
            <TabsContent value="konselor" className="flex-1 overflow-y-auto m-0 p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-col items-center text-center mt-6 mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-[20px] mb-2">Daftar Konselor</h3>
                <p className="text-gray-500 text-[14px]">Temukan pendengar yang tepat bagimu.</p>
              </div>
              <CounselorGrid />
            </TabsContent>
          </Tabs>

        ) : (

          /* Mobile Active Chat Screen (Fullscreen) */
          <div className="flex-1 bg-white flex flex-col w-full h-full absolute inset-0 z-50">
             <ChatArea sessionId={activeSessionId} onBack={() => setActiveSession(null)} />
          </div>

        )}
      </div>

    </div>
  );
}
