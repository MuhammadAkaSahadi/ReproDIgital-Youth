import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
  rememberMe: z.boolean().optional(),
});

export const onboardingSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap harus minimal 3 karakter"),
  schoolName: z.string().min(1, "Nama sekolah wajib diisi"),
  grade: z.string().min(1, "Kelas wajib dipilih"),
  gender: z.string().min(1, "Gender wajib dipilih"),
  birthDate: z.string().min(1, "Pilih tanggal lahir Anda"),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap harus minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka"),
  confirmPassword: z.string(),
  schoolName: z.string().min(1, "Nama sekolah wajib diisi"),
  grade: z.string().min(1, "Kelas wajib dipilih"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui syarat & ketentuan"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export const updatePasswordSchema = z.object({
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;