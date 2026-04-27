"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { signUpWithEmail, signInWithGoogle } from "@/app/auth/actions";

const registerSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap harus minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka"),
  confirmPassword: z.string(),
  schoolName: z.string().min(1, "Nama sekolah wajib diisi"),
  grade: z.string().min(1, "Kelas wajib dipilih"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui syarat & ketentuan"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      schoolName: "",
      grade: "",
    }
  });

  const passwordValue = watch("password");
  
  // Calculate password strength
  let pwdStrength = 0;
  if (passwordValue.length >= 8) pwdStrength += 1;
  if (/[A-Z]/.test(passwordValue)) pwdStrength += 1;
  if (/[0-9]/.test(passwordValue)) pwdStrength += 1;

  const getStrengthColor = () => {
    if (pwdStrength === 0) return "bg-gray-200";
    if (pwdStrength === 1) return "bg-red-500 w-1/3";
    if (pwdStrength === 2) return "bg-yellow-500 w-2/3";
    return "bg-green-500 w-full";
  };
  const getStrengthText = () => {
    if (pwdStrength === 0) return "";
    if (pwdStrength === 1) return "Lemah";
    if (pwdStrength === 2) return "Sedang";
    return "Kuat";
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("schoolName", data.schoolName);
    formData.append("grade", data.grade);
    
    const result = await signUpWithEmail(formData);
    
    setIsLoading(false);

    if (result.error) {
      toast.error("Registrasi Gagal", {
        description: result.error,
      });
    } else {
      toast.success("Pendaftaran berhasil!", {
        description: "Akun berhasil dibuat. Silakan cek email Anda atau login.",
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      
      {/* Form Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-[28px] md:text-[32px] font-heading font-bold text-gray-900 leading-tight">Daftar Akun Baru</h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 mt-2">Bergabung dengan ribuan remaja lainnya.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[14px] text-gray-700 font-semibold">Nama Lengkap <span className="text-red-500">*</span></Label>
          <Input 
            id="fullName" 
            placeholder="Ketik nama lengkapmu" 
            className={`h-12 px-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.fullName ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
            {...register("fullName")}
          />
          {errors.fullName && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[14px] text-gray-700 font-semibold">Email <span className="text-red-500">*</span></Label>
          <Input 
            id="email" 
            type="email"
            placeholder="contoh@email.com" 
            className={`h-12 px-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.email ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.email.message}</p>}
        </div>

        {/* Group: School & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="schoolName" className="text-[14px] text-gray-700 font-semibold">Nama Sekolah <span className="text-red-500">*</span></Label>
            <Input 
              id="schoolName" 
              placeholder="Asal sekolahmu" 
              className={`h-12 px-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.schoolName ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("schoolName")}
            />
            {errors.schoolName && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.schoolName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-[14px] text-gray-700 font-semibold">Kelas/Tingkat <span className="text-red-500">*</span></Label>
            <Select onValueChange={(val: string | null) => { setValue("grade", val || ""); trigger("grade"); }}>
              <SelectTrigger className={`h-12 px-4 border focus:ring-1 focus:ring-teal-500 focus:border-teal-500 rounded-lg text-[15px] ${errors.grade ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kelas 7 SMP">Kelas 7 SMP</SelectItem>
                <SelectItem value="Kelas 8 SMP">Kelas 8 SMP</SelectItem>
                <SelectItem value="Kelas 9 SMP">Kelas 9 SMP</SelectItem>
                <SelectItem value="Kelas 10 SMA">Kelas 10 SMA</SelectItem>
                <SelectItem value="Kelas 11 SMA">Kelas 11 SMA</SelectItem>
                <SelectItem value="Kelas 12 SMA">Kelas 12 SMA</SelectItem>
                <SelectItem value="Lulus/Lainnya">Lulus / Lainnya</SelectItem>
              </SelectContent>
            </Select>
            {errors.grade && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.grade.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[14px] text-gray-700 font-semibold">Password <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Buat password (min 8 karakter)" 
              className={`h-12 px-4 pr-12 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.password ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("password")}
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {passwordValue.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} />
              </div>
              <p className="text-[12px] text-gray-500 font-medium text-right capitalize">{getStrengthText()}</p>
            </div>
          )}
          {errors.password && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[14px] text-gray-700 font-semibold">Konfirmasi Password <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ketik ulang password" 
              className={`h-12 px-4 pr-12 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.confirmPassword ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("confirmPassword")}
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2 pb-2">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="terms" 
              className={`mt-1 w-5 h-5 border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 ${errors.termsAccepted ? "border-red-500 ring-2 ring-red-100" : ""}`}
              onCheckedChange={(checked) => { setValue("termsAccepted", checked === true ? true : undefined as any); trigger("termsAccepted"); }}
            />
            <div className="grid leading-tight">
              <label htmlFor="terms" className="text-[13.5px] font-medium text-gray-600 cursor-pointer select-none">
                Saya setuju dengan <Link href="#" className="text-teal-600 hover:underline">Syarat & Ketentuan</Link> serta <Link href="#" className="text-teal-600 hover:underline">Kebijakan Privasi</Link> ReproDigital Youth.
              </label>
              {errors.termsAccepted && <p className="text-red-500 text-[12px] font-medium mt-1.5">{errors.termsAccepted.message}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 bg-coral-500 hover:bg-coral-600 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-md hover:shadow-lg hover:-translate-y-0.5 border-0 transition-all"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Mendaftar...</>
          ) : "Daftar Akun"}
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
          Daftar dengan Google
        </Button>

        {/* Login Link */}
        <p className="text-center text-[14px] text-gray-600 mt-6 pb-6">
          Sudah punya akun? <Link href="/login" className="text-teal-600 font-bold hover:text-coral-500 hover:underline transition-colors">Masuk di sini</Link>
        </p>
      </form>
    </div>
  );
}
