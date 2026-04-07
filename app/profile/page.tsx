import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "./components/ProfileHeader";
import { TabIkhtisar } from "./components/TabIkhtisar";
import { TabAktivitas } from "./components/TabAktivitas";
import { TabBadge } from "./components/TabBadge";
import { TabPengaturan } from "./components/TabPengaturan";

export const metadata = {
  title: "Profil Saya - ReproDigital Youth",
  description: "Kelola profil, lihat pencapaian, dan pengaturan akun ReproDigital Anda.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="w-full max-w-[1440px] mx-auto bg-white min-h-screen shadow-sm border-x border-gray-200/50">
        
        {/* Bagian Header Profil */}
        <ProfileHeader />

        {/* Tab Navigation Section */}
        <div className="sticky top-[64px] lg:top-[80px] z-30 bg-white border-b border-gray-200">
          <div className="px-4 md:px-8 lg:px-16">
            <Tabs defaultValue="ikhtisar" className="w-full">
              <TabsList className="w-full justify-start h-14 bg-transparent p-0 overflow-x-auto snap-x hidden-scrollbar rounded-none space-x-8">
                <TabsTrigger 
                  value="ikhtisar" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Ikhtisar
                </TabsTrigger>
                <TabsTrigger 
                  value="aktivitas" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Aktivitas
                </TabsTrigger>
                <TabsTrigger 
                  value="badge" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Badge
                </TabsTrigger>
                <TabsTrigger 
                  value="pengaturan" 
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none px-0 text-[15px] font-medium text-gray-600 hover:text-gray-900 snap-start"
                >
                  Pengaturan
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ikhtisar" className="pt-8 animate-in fade-in duration-400">
                <TabIkhtisar />
              </TabsContent>
              
              <TabsContent value="aktivitas" className="pt-8 animate-in fade-in duration-400">
                <TabAktivitas />
              </TabsContent>
              
              <TabsContent value="badge" className="pt-8 animate-in fade-in duration-400">
                <TabBadge />
              </TabsContent>
              
              <TabsContent value="pengaturan" className="pt-8 animate-in fade-in duration-400 pb-12">
                <TabPengaturan />
              </TabsContent>
              
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
