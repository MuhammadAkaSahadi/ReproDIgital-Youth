"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, Loader2, Camera, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

// Schemas
const profileSchema = z.object({
  fullName: z.string().min(1, "Nama wajib diisi").max(100),
  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, "Hanya huruf, angka, dan garis bawah"),
  bio: z.string().max(160, "Bio maksimal 160 karakter"),
  gender: z.string(),
  schoolName: z.string().min(1, "Nama sekolah wajib diisi"),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
  newPassword: z.string()
    .min(8, "Password baru minimal 8 karakter")
    .regex(/[A-Z]/, "Harus mengandung huruf besar")
    .regex(/[0-9]/, "Harus mengandung angka"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;

export function TabPengaturan() {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isSecurityLoading, setIsSecurityLoading] = useState(false);
  
  // Delete Modal state
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Forms Setup
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Arif Rahman",
      username: "arifrhmn_",
      bio: "Berkomitmen untuk terus belajar dan membagikan informasi edukatif seputar kesehatan remaja.",
      gender: "Laki-laki",
      schoolName: "SMA Negeri 1 Jember",
    }
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
  });

  // Susbmit Handlers
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsProfileLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsProfileLoading(false);
    toast.success("Profil berhasil diperbarui!");
  };

  const onSecuritySubmit = async (data: SecurityFormValues) => {
    setIsSecurityLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSecurityLoading(false);
    securityForm.reset();
    toast.success("Keamanan akun berhasil diperbarui!");
  };

  const onDeleteConfirm = async () => {
    setIsDeleting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsDeleting(false);
    window.location.href = "/";
  };

  return (
    <div className="w-full max-w-4xl space-y-12 animate-in fade-in duration-500">
      
      {/* SECTION 1: Edit Profile */}
      <section>
        <h3 className="text-xl font-heading font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">Edit Profil</h3>
        
        <div className="flex flex-col sm:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-200 overflow-hidden relative group">
              <img src="https://ui-avatars.com/api/?name=Arif+Rahman&background=0D9488&color=fff&size=400" alt="Avatar" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button variant="outline" size="sm" className="w-full text-teal-700 border-teal-600 hover:bg-teal-50">Upload Baru</Button>
              <Button variant="ghost" size="sm" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">Hapus Foto</Button>
            </div>
          </div>

          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="flex-1 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input {...profileForm.register("fullName")} className="h-11 focus-visible:ring-teal-500" />
                {profileForm.formState.errors.fullName && <p className="text-red-500 text-xs">{profileForm.formState.errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">@</span>
                  <Input {...profileForm.register("username")} className="h-11 pl-8 focus-visible:ring-teal-500" />
                </div>
                {profileForm.formState.errors.username && <p className="text-red-500 text-xs">{profileForm.formState.errors.username.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Bio <span className="text-gray-400 font-normal ml-1">({profileForm.watch("bio")?.length || 0}/160)</span></Label>
              <textarea 
                {...profileForm.register("bio")}
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Nama Sekolah</Label>
              <Input {...profileForm.register("schoolName")} className="h-11 focus-visible:ring-teal-500 max-w-sm" />
            </div>

            <div className="pt-4 flex gap-3">
              <Button type="submit" disabled={isProfileLoading} className="bg-coral-500 hover:bg-coral-600 text-white min-w-[120px]">
                {isProfileLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isProfileLoading ? "Menyimpan" : "Simpan Profil"}
              </Button>
              <Button type="button" variant="outline" className="border-gray-300">Batal</Button>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION 2: Keamanan Akun */}
      <section>
        <h3 className="text-xl font-heading font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">Keamanan Akun</h3>
        
        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="max-w-md space-y-5">
          <div className="space-y-2">
            <Label>Password Saat Ini</Label>
            <Input type="password" {...securityForm.register("currentPassword")} className="h-11 focus-visible:ring-teal-500" />
            {securityForm.formState.errors.currentPassword && <p className="text-red-500 text-xs">{securityForm.formState.errors.currentPassword.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Password Baru</Label>
            <Input type="password" {...securityForm.register("newPassword")} className="h-11 focus-visible:ring-teal-500" />
            {securityForm.formState.errors.newPassword && <p className="text-red-500 text-xs">{securityForm.formState.errors.newPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Konfirmasi Password Baru</Label>
            <Input type="password" {...securityForm.register("confirmPassword")} className="h-11 focus-visible:ring-teal-500" />
            {securityForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs">{securityForm.formState.errors.confirmPassword.message}</p>}
          </div>

          <div className="pt-2">
             <Button type="submit" disabled={isSecurityLoading} className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                {isSecurityLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Perbarui Password
             </Button>
          </div>
        </form>
      </section>

      {/* SECTION 3: Danger Zone */}
      <section>
        <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-[20px] font-heading font-bold text-red-600">Hapus Akun Permanen</h3>
            </div>
            <p className="text-gray-600 text-sm max-w-lg mb-0">
              Perhatian: Begitu Anda menghapus akun ini, seluruh data progres, kuis, dan artikel yang tersimpan tidak akan bisa dipulihkan kembali. Lakukan dengan hati-hati.
            </p>
          </div>
          
          {/* Modal Validasi Hapus */}
          <Dialog>
            <DialogTrigger render={<Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white h-12 px-6 shadow-sm" />}>
              <Trash2 className="w-4 h-4 mr-2" /> Hapus Akun
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
               <DialogHeader>
                 <DialogTitle className="text-red-600 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5" /> Peringatan Fatal
                 </DialogTitle>
                 <DialogDescription className="pt-4 text-black text-sm">
                   Aksi ini tidak bisa dibatalkan. Ini akan secara permanen menghapus akun <strong>@arifrhmn_</strong> dan menghapus data Anda dari server kami.
                 </DialogDescription>
               </DialogHeader>

               <div className="my-4">
                 <Label className="text-gray-700 mb-2 block text-sm">
                   Untuk mengkonfirmasi, ketik kata <strong>HAPUS AKUN</strong> di bawah ini:
                 </Label>
                 <Input 
                   value={deleteInput} 
                   onChange={(e) => setDeleteInput(e.target.value)} 
                   placeholder="Ketik HAPUS AKUN"
                   className="h-12 focus-visible:ring-red-500 focus-visible:border-red-500"
                 />
               </div>

               <DialogFooter className="mt-4 sm:justify-between items-center gap-3">
                 <DialogClose render={<Button type="button" variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0" />}>
                   Batalkan
                 </DialogClose>
                 <Button 
                   type="button" 
                   variant="destructive" 
                   disabled={deleteInput !== "HAPUS AKUN" || isDeleting}
                   onClick={onDeleteConfirm}
                   className="w-full sm:w-auto bg-red-600 text-white"
                 >
                   {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                   Ya, Hapus Akun
                 </Button>
               </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </section>

    </div>
  );
}
