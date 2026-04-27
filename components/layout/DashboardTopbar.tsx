"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "./DashboardSidebar";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/client";

export function DashboardTopbar({ profile }: { profile?: any }) {
  const initial = profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "U";
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!profile?.id) return;

    // Mengambil notifikasi awal
    const fetchNotifs = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) setNotifications(data);
    };
    fetchNotifs();

    // Subscribe Realtime ke tabel notifications
    const channel = supabase
      .channel('topbar-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, supabase]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 md:px-6 shrink-0 shadow-sm">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
              <Menu className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          }
        />
        <SheetContent side="left" className="p-0 w-[260px]">
          <SheetTitle className="sr-only">Menu Navigasi Sidebar</SheetTitle>
          <DashboardSidebar profile={profile} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Cari sesuatu..."
            className="w-full bg-gray-50 pl-9 border-gray-300 focus-visible:ring-teal-600 rounded-lg text-sm transition-fast h-9"
          />
        </div>
        <div className="flex-1 block md:hidden">
          <span className="text-lg font-bold font-heading text-teal-600 lg:hidden">
             RD YOUTH
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifikasi Widget */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-fast rounded-full">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-coral-500 border-2 border-white" />
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifikasi ({unreadCount} baru)</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif, idx) => (
                  <DropdownMenuItem key={idx} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <span className="text-sm font-medium">{notif.title || "Pemberitahuan"}</span>
                    <span className="text-xs text-gray-500 line-clamp-2 md:whitespace-normal break-words w-full">
                      {notif.content || notif.message}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1">Baru saja</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-gray-500">Seluruh notifikasi telah muat, tidak ada yang baru.</div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-teal-600 text-sm">Lihat Semua</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src={profile?.avatar_url || ""} alt="User Avatar" />
                  <AvatarFallback className="bg-teal-600 text-white font-medium text-xs">{initial}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900">{profile?.full_name || "User Name"}</p>
                  <p className="text-xs leading-none text-gray-500">{profile?.email || "user@example.com"}</p>
                  <p className="text-[10px] uppercase font-bold text-teal-600 tracking-wider mt-1">{profile?.role || "STUDENT"}</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <form action={signOut} className="w-full">
                <button type="submit" className="w-full text-left px-2 py-1.5 text-sm outline-none cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors">
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
