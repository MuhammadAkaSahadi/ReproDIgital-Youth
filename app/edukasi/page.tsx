import { EdukasiHeader } from "./components/EdukasiHeader";
import { EdukasiFilter } from "./components/EdukasiFilter";
import { EdukasiGrid } from "./components/EdukasiGrid";
import { EdukasiSidebar } from "./components/EdukasiSidebar";

export const metadata = {
  title: "Pusat Edukasi | ReproDigital Youth",
  description: "Temukan ratusan artikel, video, dan infografis terpercaya seputar kesehatan reproduksi remaja.",
};

export default function EdukasiPage() {
  return (
    <div className="flex flex-col w-full flex-1">
      {/* Bagian A.1 Page Header */}
      <EdukasiHeader />
      
      {/* Bagian A.2 Filter & Category Section */}
      <EdukasiFilter />
      
      {/* Bagian A.3 Content Grid & A.4 Sidebar */}
      <section className="flex-1 bg-white min-h-[50vh] pt-8 md:pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area (Spans 2/3) */}
            <div className="lg:col-span-2">
              <EdukasiGrid />
            </div>

            {/* Sidebar (Spans 1/3, hidden on mobile) */}
            <div className="lg:col-span-1 border-gray-200 lg:pl-4">
              <EdukasiSidebar />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
