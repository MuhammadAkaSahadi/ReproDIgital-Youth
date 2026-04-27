"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { completeProfile } from "../actions";
import { OnboardingSchema, onboardingSchema } from "@/validations/auth-validation";


export function OnboardingForm({ defaultName }: { defaultName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: defaultName || "",
      schoolName: "",
      grade: "",
      gender: "",
      birthDate: "",
    }
  });

  const onSubmit = async (data: OnboardingSchema) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("schoolName", data.schoolName);
    formData.append("grade", data.grade);
    formData.append("gender", data.gender);
    formData.append("birthDate", data.birthDate);

    const result = await completeProfile(formData);

    setIsLoading(false);

    if (result.error) {
      toast.error("Gagal Menyimpan Data", {
        description: result.error,
      });
    } else {
      toast.success("Profil Berhasil Dilengkapi!", {
        description: "Anda kini bisa mengakses ruang konseling dan edukasi.",
      });
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-[28px] font-heading font-bold text-gray-900 leading-tight">Lengkapi Profilmu</h1>
        <p className="text-[15px] text-gray-600 mt-2">Sedikit lagi! Kami butuh info tambahan untuk menyesuaikan pengalamanmu.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[14px] text-gray-700 font-semibold">Nama Lengkap <span className="text-red-500">*</span></Label>
          <Input 
            id="fullName" 
            className={`h-12 px-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.fullName ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
            {...register("fullName")}
          />
          {errors.fullName && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.fullName.message}</p>}
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

        {/* Group: Gender & Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-[14px] text-gray-700 font-semibold">Jenis Kelamin <span className="text-red-500">*</span></Label>
            <Select onValueChange={(val: string | null) => { setValue("gender", val || ""); trigger("gender"); }}>
              <SelectTrigger className={`h-12 px-4 border focus:ring-1 focus:ring-teal-500 focus:border-teal-500 rounded-lg text-[15px] ${errors.gender ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}>
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-Laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
                <SelectItem value="prefer_not_to_say">Memilih untuk tidak menyebutkan</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.gender.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-[14px] text-gray-700 font-semibold">Tanggal Lahir <span className="text-red-500">*</span></Label>
            <Input 
              id="birthDate" 
              type="date"
              className={`h-12 px-4 border focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-lg text-[15px] ${errors.birthDate ? "border-red-500 bg-red-50/50" : "border-gray-200"}`}
              {...register("birthDate")}
            />
            {errors.birthDate && <p className="text-red-500 text-[12px] font-medium mt-1">{errors.birthDate.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-4 h-14 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold rounded-xl text-[16px] shadow-sm transition-all"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Menyimpan...</>
          ) : "Selesai & Selamat Datang"}
        </Button>
      </form>
    </div>
  );
}
