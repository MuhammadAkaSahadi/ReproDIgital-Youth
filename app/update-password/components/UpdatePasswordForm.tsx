"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updatePasswordSchema, UpdatePasswordSchema } from "@/validations/auth-validation";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const onSubmit = async (data: UpdatePasswordSchema) => {
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        toast.error(`Gagal memperbarui password: ${error.message}`);
      } else {
        toast.success("Password berhasil diperbarui! Silahkan masuk kembali.");
        
        // Optionally logout the user immediately so they can re-login with the new password
        await supabase.auth.signOut();
        
        // Redirect to login page
        router.push("/login");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem, silakan coba lagi nanti.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto animate-in fade-in duration-500">
      
      {/* Form Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-[28px] md:text-[32px] font-heading font-bold text-gray-900 leading-tight">Buat Password Baru</h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 mt-2 max-w-[90%] mx-auto lg:mx-0">
          Masukkan password baru Anda untuk memulihkan akun ini. Pastikan password kuat dan mudah diingat.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Password Baru Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[14px] text-gray-700 font-semibold">Password Baru <span className="text-red-500">*</span></Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 pointer-events-none transition-colors">
              <ShieldCheck className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter..." 
              className={`h-12 pl-11 pr-12 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.password ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-teal-600 transition-colors focus:outline-none rounded-md"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.password.message}</p>}
        </div>

        {/* Konfirmasi Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[14px] text-gray-700 font-semibold">Konfirmasi Password Baru <span className="text-red-500">*</span></Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 pointer-events-none transition-colors">
              <ShieldCheck className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password baru Anda..." 
              className={`h-12 pl-11 pr-12 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.confirmPassword ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-teal-600 transition-colors focus:outline-none rounded-md"
            >
              {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-4 h-14 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-md hover:shadow-lg hover:-translate-y-0.5 border-0 transition-all"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Memperbarui...</>
          ) : "Perbarui Password"}
        </Button>

      </form>
    </div>
  );
}
