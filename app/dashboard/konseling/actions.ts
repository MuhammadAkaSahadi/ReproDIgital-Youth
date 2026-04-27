"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMessage(sessionId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase.from("messages").insert([
    {
      session_id: sessionId,
      sender_id: user.id,
      content,
      type: "text",
    },
  ]).select().single();

  if (error) {
    console.error("Gagal mengirim pesan:", error);
    return { success: false, error: error.message };
  }

  return { success: true, message: data };
}
