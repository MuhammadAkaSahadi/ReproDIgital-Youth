"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Target, Users, LogOut, Settings } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Ikhtisar", href: "/dashboard", icon: Home },
    { name: "Hub Edukasi", href: "/dashboard/edukasi", icon: BookOpen },
    { name: "Konseling Sebaya", href: "/dashboard/konseling", icon: Users },
    { name: "Perencanaan Masa Depan", href: "/dashboard/perencanaan", icon: Target },
    { name: "Verifikasi Konselor", href: "/dashboard/verifikasi-konselor", icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 shrink-0">
        <span className="text-xl font-bold font-heading text-teal-600">
          ReproDigital<span className="text-coral-500">Youth</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          // But beware of /dashboard matching everything, so we correct it:
          const isActuallyActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-fast",
                isActuallyActive
                  ? "bg-teal-50 text-teal-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-base",
                  isActuallyActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"
                )}
                strokeWidth={2}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-fast">
          <LogOut className="mr-3 h-5 w-5" strokeWidth={2} />
          Keluar
        </button>
      </div>
    </div>
  );
}
