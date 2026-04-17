"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function NavbarFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Sembunyikan Navbar dan Footer jika berada di halaman auth atau dashboard
  const hideNavbarFooter = pathname.startsWith("/register") || pathname.startsWith("/login") || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
