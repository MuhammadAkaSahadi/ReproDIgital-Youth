"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MailCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema, ResetPasswordSchema } from "@/validations/auth-validation";
import { createClient } from "@/utils/supabase/client";


export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      });

      if (error) {
        console.error("Error sending reset password email:", error.message);
        // Kita juga bisa menambahkan notasi error toast di masa mendatang
      }
      
      // Baik berhasil maupun gagal, biasanya kita tetap menampilkan sukses
      // agar tidak terjadi email enumeration (keamanan)
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS STATE VIEW
  if (isSubmitted) {
    return (
      <div className="w-full max-w-[440px] mx-auto text-center flex flex-col items-center py-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-xs border border-teal-100">
          <MailCheck className="w-12 h-12 text-teal-600" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-[28px] font-heading font-bold text-gray-900 mb-3 leading-tight">Link Terkirim!</h3>
        
        <p className="text-gray-600 text-[15px] mb-8 leading-relaxed max-w-sm px-4">
          Kami telah mengirimkan instruksi untuk me-reset kata sandi ke <br/>
          <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-sm block mt-2 mx-auto w-max">{submittedEmail}</span>
        </p>

        <p className="text-[13px] text-gray-500 mb-8 max-w-xs">
          Cek inbox atau folder spam Anda jika email tidak muncul dalam beberapa menit.
        </p>

        <Button 
          type="button" 
          onClick={() => window.location.href = '/login'}
          className="w-full h-14 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Masuk
        </Button>
      </div>
    );
  }

  // DEFAULT FORM VIEW
  return (
    <div className="w-full max-w-[440px] mx-auto animate-in fade-in duration-500">
      
      {/* Form Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-[28px] md:text-[32px] font-heading font-bold text-gray-900 leading-tight">Lupa Password?</h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 mt-2 max-w-[90%] mx-auto lg:mx-0">
          Masukkan email kamu dan kami akan mengirim link reset untuk memulihkan akun.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[14px] text-gray-700 font-semibold">Tuliskan Emailmu <span className="text-red-500">*</span></Label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 pointer-events-none">
              <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <Input 
              id="email" 
              type="email"
              placeholder="contoh@email.com" 
              className={`h-12 pl-11 pr-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.email ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-4 h-14 bg-coral-500 hover:bg-coral-600 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-md hover:shadow-lg hover:-translate-y-0.5 border-0 transition-all"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Mengirim...</>
          ) : "Kirim Link Reset"}
        </Button>

        {/* Kembali Link */}
        <div className="mt-8 flex justify-center">
          <Link href="/login" className="flex items-center text-[15px] text-teal-600 font-bold hover:text-coral-500 hover:translate-x-[-4px] transition-all duration-300 group">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Masuk
          </Link>
        </div>

      </form>
    </div>
  );
}
