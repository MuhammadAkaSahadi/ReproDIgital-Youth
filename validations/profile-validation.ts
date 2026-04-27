import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Nama wajib diisi").max(100),
  username: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_]+$/, "Hanya huruf, angka, dan garis bawah"),
  bio: z.string().max(160, "Bio maksimal 160 karakter").optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  schoolName: z.string().optional(),
  grade: z.string().optional(),
  specialization: z.string().optional(),
});

export const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z
      .string()
      .min(8, "Password baru minimal 8 karakter")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[0-9]/, "Harus mengandung angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export type ProfileSchema = z.infer<typeof profileSchema>;
export type SecuritySchema = z.infer<typeof securitySchema>