"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { signInWithGoogle } from "@/app/auth/actions";
import { LoginSchema, loginSchema } from "@/validations/auth-validation";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const { signInWithEmail } = await import("@/app/auth/actions");
    const result = await signInWithEmail(formData);

    setIsLoading(false);
    
    if (result.error) {
      toast.error("Gagal Masuk", {
        description: result.error,
      });
    } else {
      toast.success("Berhasil Masuk!", {
        description: "Anda akan segera dialihkan ke web.",
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto">
      
      {/* Form Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-[28px] md:text-[32px] font-heading font-bold text-gray-900 leading-tight">Masuk ke Akun</h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 mt-2">Lanjutkan belajar dan mencapai tujuanmu.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Field with Icon */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[14px] text-gray-700 font-semibold">Email <span className="text-red-500">*</span></Label>
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

        {/* Password Field with Show/Hide Toggle */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[14px] text-gray-700 font-semibold">Password <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi" 
              className={`h-12 px-4 pr-12 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.password ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("password")}
            />
            <button 
              type="button" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-[20px] h-[20px]" /> : <Eye className="w-[20px] h-[20px]" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.password.message}</p>}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="rememberMe" 
              className="w-5 h-5 border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 rounded-[4px]"
              onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
            />
            <label htmlFor="rememberMe" className="text-[14px] font-medium text-gray-600 cursor-pointer select-none pb-px">
              Ingat saya
            </label>
          </div>
          <Link href="/reset-password" className="text-[14px] text-teal-600 font-bold hover:text-coral-500 transition-colors relative group">
            Lupa Password?
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral-500 transition-all duration-200 ease-out group-hover:w-full"></span>
          </Link>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 h-14 bg-coral-500 hover:bg-coral-600 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-md hover:shadow-lg hover:-translate-y-0.5 border-0 transition-all"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Masuk...</>
          ) : "Masuk ke Akun"}
        </Button>

        {/* Divider */}
        <div className="relative py-4 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="bg-white px-4 text-[13px] text-gray-400 font-medium tracking-wide">ATAU</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Google OAuth Placeholder */}
        <Button 
          type="button" 
          variant="outline"
          onClick={() => signInWithGoogle()}
          className="w-full h-14 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 font-semibold rounded-xl text-[15px] transition-all"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Masuk dengan Google
        </Button>

        {/* Register Link */}
        <p className="text-center text-[15px] text-gray-600 mt-6 pb-6">
          Belum punya akun? <Link href="/register" className="text-teal-600 font-bold hover:text-coral-500 hover:underline transition-colors">Daftar di sini</Link>
        </p>

      </form>
    </div>
  );
}
