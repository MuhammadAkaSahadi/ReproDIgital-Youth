import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(3, "Judul rencana minimal 3 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  deadline: z.date({ message: "Tenggat waktu harus dipilih" }),
});

export type GoalSchema = z.infer<typeof goalSchema>;