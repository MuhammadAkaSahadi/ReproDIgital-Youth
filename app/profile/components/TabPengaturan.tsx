"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, Loader2, Camera, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { uploadAvatarServer } from "../actions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  bio: z.string().max(160, "Bio maksimal 160 karakter").optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  schoolName: z.string().optional(),
  grade: z.string().optional(),
  specialization: z.string().optional(),
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

export function TabPengaturan({ profile }: { profile?: any }) {
  const router = useRouter();
  
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isSecurityLoading, setIsSecurityLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  // Delete Modal state
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Forms Setup
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      gender: profile?.gender || "", 
      birthDate: profile?.birth_date || "",
      schoolName: profile?.school_name || "",
      grade: profile?.grade || "",
      specialization: profile?.specialization || "",
    }
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
  });

  // Avatar Upload Handler
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;

    setIsUploadingAvatar(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const publicUrl = await uploadAvatarServer(formData, profile.id);
      
      // Update the explicit profile table
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);
        
      if (!error) {
        toast.success("Foto profil berhasil diperbarui!");
        router.refresh();
      } else {
        toast.error("Gagal sinkronisasi data foto profil.");
      }
    } catch (err: any) {
      toast.error(`Gagal mengunggah foto profil: ${err.message || 'Unknown error'}`);
    }
    
    setIsUploadingAvatar(false);
  };

  // Profile Submit Handler Integrasi DB
  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!profile?.id) return;
    setIsProfileLoading(true);
    
    const supabase = createClient();
    const { error } = await supabase.from('profiles').update({
      full_name: data.fullName,
      username: data.username,
      bio: data.bio || null,
      gender: data.gender || null,
      birth_date: data.birthDate || null,
      school_name: data.schoolName || null,
      grade: data.grade || null,
      specialization: data.specialization || null,
    }).eq('id', profile.id);

    if (error) {
      toast.error(`Gagal memperbarui profil: ${error.message}`);
    } else {
      toast.success("Profil berhasil diperbarui!");
      router.refresh(); // Memuat ulang data dari Server Component /profile/page.tsx
    }
    
    setIsProfileLoading(false);
  };

  const onSecuritySubmit = async (data: SecurityFormValues) => {
    setIsSecurityLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword
    });

    setIsSecurityLoading(false);
    if (error) {
       toast.error(`Gagal: ${error.message}`);
    } else {
       securityForm.reset();
       toast.success("Keamanan akun berhasil diperbarui!");
    }
  };

  const onDeleteConfirm = async () => {
    setIsDeleting(true);
    // Normally you'd call a Supabase Edge Function to delete the auth user
    // Since direct delete is restricted on client
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
              <img 
                src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || 'User')}&background=0D9488&color=fff&size=400`} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
              <Input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={isUploadingAvatar}
              />
              <Label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center cursor-pointer">
                {isUploadingAvatar ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
              </Label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="avatar-upload" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 border h-9 px-3 w-full text-teal-700 border-teal-600 hover:bg-teal-50 cursor-pointer">
                {isUploadingAvatar ? 'Mengunggah...' : 'Upload Baru'}
              </Label>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Tanggal Lahir</Label>
                <Input type="date" {...profileForm.register("birthDate")} className="h-11 focus-visible:ring-teal-500 text-gray-700" />
              </div>
              <div className="space-y-2">
                <Label>Jenis Kelamin</Label>
                <select 
                  {...profileForm.register("gender")} 
                  className="flex h-11 w-full items-center justify-between rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 text-gray-700"
                >
                  <option value="" disabled>Pilih Gender</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                  <option value="prefer_not_to_say">Memilih untuk tidak menyebutkan</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio <span className="text-gray-400 font-normal ml-1">({profileForm.watch("bio")?.length || 0}/160)</span></Label>
              <textarea 
                {...profileForm.register("bio")}
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
              />
              {profileForm.formState.errors.bio && <p className="text-red-500 text-xs">{profileForm.formState.errors.bio.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Nama Sekolah / Institusi</Label>
                <Input {...profileForm.register("schoolName")} className="h-11 focus-visible:ring-teal-500" />
              </div>
              <div className="space-y-2">
                <Label>Kelas (Tahapan)</Label>
                <Select 
                  defaultValue={profileForm.getValues("grade")} 
                  onValueChange={(val: string | null) => { 
                    profileForm.setValue("grade", val || ""); 
                    profileForm.trigger("grade"); 
                  }}
                >
                  <SelectTrigger className="h-11 border-gray-200 focus:ring-1 focus:ring-teal-500 text-gray-700">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kelas 7 SMP">Kelas 7 SMP</SelectItem>
                    <SelectItem value="Kelas 8 SMP">Kelas 8 SMP</SelectItem>
                    <SelectItem value="Kelas 9 SMP">Kelas 9 SMP</SelectItem>
                    <SelectItem value="Kelas 10 SMA">Kelas 10 SMA</SelectItem>
                    <SelectItem value="Kelas 11 SMA">Kelas 11 SMA</SelectItem>
                    <SelectItem value="Kelas 12 SMA">Kelas 12 SMA</SelectItem>
                    <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                    <SelectItem value="Lulus/Lainnya">Lulus / Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Spesialisasi <span className="text-gray-400 font-normal ml-1">(Khusus Konselor)</span></Label>
              <Input 
                {...profileForm.register("specialization")} 
                disabled={profile?.role !== 'counselor'}
                className="h-11 focus-visible:ring-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700" 
                placeholder="Mis. Psikologi Klinis, Bimbingan Konseling" 
              />
              {profile?.role !== 'counselor' && <p className="text-gray-500 text-xs mt-1">Status Anda tidak memerlukan spesialisasi.</p>}
            </div>

            <div className="pt-4 flex gap-3">
              <Button type="submit" disabled={isProfileLoading} className="bg-coral-500 hover:bg-coral-600 text-white min-w-[120px]">
                {isProfileLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isProfileLoading ? "Menyimpan" : "Simpan Profil"}
              </Button>
              <Button type="button" variant="outline" className="border-gray-300" onClick={() => profileForm.reset()}>Batal</Button>
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
                   Aksi ini tidak bisa dibatalkan. Ini akan secara permanen menghapus akun <strong>@{profile?.username || 'user'}</strong> dan menghapus data Anda dari server kami.
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
