"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function completeProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const fullName = formData.get("fullName") as string;
  const schoolName = formData.get("schoolName") as string;
  const grade = formData.get("grade") as string;
  const gender = formData.get("gender") as string;
  const birthDate = formData.get("birthDate") as string;

  const { error } = await supabase.from("profiles").update({
    full_name: fullName,
    school_name: schoolName,
    grade: grade,
    gender: gender !== "none" ? gender : undefined,
    birth_date: birthDate || null,
  }).eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  // Refresh cache supaya status school_name yang tadinya kosong terbaca kembali
  revalidatePath("/", "layout");
  
  return { success: true };
}
