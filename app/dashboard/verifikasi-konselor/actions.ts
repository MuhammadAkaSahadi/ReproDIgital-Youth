"use server";

import { revalidatePath } from "next/cache";

export async function verifyCounselor(userId: string) {
  // Simulasi query: UPDATE profiles SET is_verified = true WHERE id = userId
  console.log(`[Server Action] Verifikasi konselor dengan ID: ${userId} berhasil.`);
  
  // Nanti ganti dengan logika Supabase
  // const supabase = createServerClient(...)
  // await supabase.from('profiles').update({ is_verified: true }).eq('id', userId)

  revalidatePath("/dashboard/verifikasi-konselor");
  return { success: true, message: "Konselor berhasil diverifikasi" };
}

export async function rejectCounselor(userId: string) {
  // Simulasi query: UPDATE profiles SET is_verified = false, role = 'student' WHERE id = userId
  // Atau DELETE FROM profiles WHERE id = userId jika belum diverifikasi
  console.log(`[Server Action] Pendaftaran konselor dengan ID: ${userId} ditolak.`);
  
  // Nanti ganti dengan logika Supabase
  
  revalidatePath("/dashboard/verifikasi-konselor");
  return { success: true, message: "Pendaftaran konselor ditolak" };
}
