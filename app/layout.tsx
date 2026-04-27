import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavbarFooterWrapper } from "@/app/components/layout/NavbarFooterWrapper";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utils/supabase/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!error && data) { 
      profile = data; 
    }
  }

  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", plusJakartaSans.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-body">
        <NavbarFooterWrapper profile={profile}>
          {children}
        </NavbarFooterWrapper>
        <Toaster />
      </body>
    </html>
  );
}
