"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function NavbarFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Sembunyikan Navbar dan Footer jika berada di halaman auth seperti register atau login
  const isAuthPage = pathname.startsWith("/register") || pathname.startsWith("/login");

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
