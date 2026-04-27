"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize an admin client that bypasses RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function uploadAvatarServer(formData: FormData, userId: string) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("File tidak ditemukan");
  }

  // Format Path wajib tanpa ekstensi: avatars/${userId}
  const path = `avatars/${userId}`;

  // Logika Upsert wajib bernilai true dan sertakan contentType
  const { data, error } = await supabaseAdmin.storage
    .from("images")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error("Storage upload error (admin):", error);
    throw new Error(error.message);
  }

  const { data: publicData } = supabaseAdmin.storage
    .from("images")
    .getPublicUrl(path);

  // Cache Busting: tambahkan ?t=timestamp pada publicURL
  const bustedUrl = `${publicData.publicUrl}?t=${Date.now()}`;

  return bustedUrl;
}
