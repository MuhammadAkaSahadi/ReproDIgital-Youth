"use server"

import { createClient } from "@/utils/supabase/server"

// UUID buatan (dummy) yang pura-puranya terdaftar di tabel `profiles`
// Sampai kita ada Supabase Auth yang terhubung
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function sendMessage(sessionId: string, content: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        session_id: sessionId,
        sender_id: MOCK_USER_ID,
        type: "text",
        content: content,
      }
    ])
    .select();

  if (error) {
    console.error("Gagal mengirim pesan:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
