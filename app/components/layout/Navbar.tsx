"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, User, Home, BookOpen, Heart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Edukasi", href: "/edukasi", icon: BookOpen },
  { name: "Konseling", href: "/konseling", icon: Heart },
  { name: "Perencanaan Masa Depan", href: "/perencanaan", icon: GraduationCap },
  { name: "Tentang Kami", href: "/tentang-kami", icon: User },
];

const BOTTOM_NAV_LINKS = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Edukasi", href: "/edukasi", icon: BookOpen },
  { name: "Konseling", href: "/konseling", icon: Heart },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop & Tablet Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[64px] lg:h-[80px] bg-white/80 backdrop-blur-md border-b md:border-none md:shadow-sm border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
          {/* Mobile Hamburger (Left on mobile) */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="text-gray-900">
                    <Menu className="h-6 w-6" />
                  </Button>
                }
              />
              <SheetContent
                side="left"
                className="w-[80%] max-w-[300px] p-0 flex flex-col"
              >
                <SheetHeader className="p-4 border-b text-left">
                  <SheetTitle className="text-teal-600 font-heading font-bold text-xl">
                    ReproDigital
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col py-4">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-6 py-4 transition-colors ${
                          isActive
                            ? "bg-teal-50 text-teal-600 border-r-4 border-teal-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                        }`}
                      >
                        <link.icon className="h-6 w-6 mr-4" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo (Center on mobile, Left on desktop) */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg lg:text-xl text-teal-600 hidden md:block">
              ReproDigital Youth
            </span>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1 px-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-teal-600 rounded-t-md" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search + Auth */}
          <div className="flex items-center justify-end gap-2 lg:gap-4 lg:w-[180px]">
            <Button variant="ghost" size="icon" className="text-gray-900">
              <Search className="h-5 w-5 lg:h-6 lg:w-6" />
            </Button>
            {/* Show Login only on tablet/desktop as mobile has bottom nav for profile */}
            <div className="hidden md:block">
              <Button render={<Link href="/login" />} className="bg-coral-500 hover:bg-coral-600 text-white rounded-full px-6 transition-colors">
                Masuk / Daftar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[64px] bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
        {BOTTOM_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-teal-600" : "text-gray-500"
              }`}
            >
              <div
                className={`p-1 rounded-full ${isActive ? "bg-teal-50" : ""}`}
              >
                <link.icon
                  className={`h-6 w-6 ${isActive ? "text-teal-600 fill-teal-50" : ""}`}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-medium leading-none">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer to prevent content from going under navbars */}
      <div className="h-[64px] lg:h-[80px]" />
    </>
  );
}
