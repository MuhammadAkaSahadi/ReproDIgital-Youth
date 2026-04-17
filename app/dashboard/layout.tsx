import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-body">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[260px] border-r border-gray-200 bg-white">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
