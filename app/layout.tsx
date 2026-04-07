import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavbarFooterWrapper } from "@/app/components/layout/NavbarFooterWrapper";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReproDigital Youth",
  description: "Platform Edukasi dan Konseling Rekam Jejak Remaja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", plusJakartaSans.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-body">
        <NavbarFooterWrapper>
          {children}
        </NavbarFooterWrapper>
        <Toaster />
      </body>
    </html>
  );
}
