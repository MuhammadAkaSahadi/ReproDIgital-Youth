<div align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-Auth_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />

<br />
<br />

# 🌱 ReproDigital Youth

**Platform Edukasi dan Konseling Kesehatan Remaja Holistik yang interaktif dan adaptif.**

[Demo](#) · [Dokumentasi](#) · [Laporan Bug](../../issues) · [Fitur Baru](../../issues)

</div>

---

## 📌 Tentang Proyek

**ReproDigital Youth** adalah platform ekosistem edukasi dan layanan bimbingan konseling yang dirancang khusus untuk memfasilitasi kebutuhan remaja dalam menjaga rekam jejak kesehatan dan edukasi mereka. Aplikasi ini melayani berbagai pengguna dari mulai remaja (student), hingga konselor profesional dan administrator.

Dibangun dengan stack teknologi modern untuk menawarkan skalabilitas tinggi serta sistem keamanan autentikasi yang canggih secara real-time.

---

## ✨ Fitur Utama

### 📖 Edukasi Terstruktur
- Modul belajar dan bacaan informatif khusus gaya hidup anak muda.
- Sistem tracking progres individual.

### 🎧 Konseling Terintegrasi
- Modul interaksi antara remaja dan konselor profesional.
- Validasi kredensial langsung bagi para konselor yang mendaftar.
- Papan dashboard statistik dan performa setiap konselor (Rating & Sesi).

### 🗺️ Perencanaan & Aktivitas
- Dashboard penetapan tujuan (Goals Planning) dan penjadwalan.
- Interaktif timeline aktivitas keseharian pengguna.

### 👥 Keamanan & Manajemen Akun Canggih
- Pengaturan Profil lengkap (Avatar Cloud Storage, Bio, Kelas, Spesialisasi).
- Sistem pemulihan kata sandi (*Forgot/Reset Password*) via Email terenkripsi.
- Kontrol penuh Data Diri dan fitur *Hapus Akun Permanen* dengan otorisasi ketat.

---

## 👤 Peran Pengguna

| Peran | Akses |
|---|---|
| **Student (Siswa)** | Membaca modul edukasi, membuat perencanaan harian, dan mengatur jadwal sesi bimbingan bersama konselor. |
| **Counselor (Konselor)** | Menyediakan bimbingan tertutup bagi klien, melengkapi spesialisasi profesional, dan melihat statistik kepuasan klien. |
| **Admin** | Memantau lalu lintas sistem, validasi profil pendaftaran dari konselor baru, dan memanajemen basis data menyeluruh. |

---

## 🛠️ Teknologi yang Digunakan

### Core
| Teknologi | Kegunaan |
|---|---|
| [Next.js](https://nextjs.org/) | Framework React full-stack dengan App Router terotomatisasi |
| [React](https://react.dev/) | Library antarmuka pengguna modern |
| [TypeScript](https://www.typescriptlang.org/) | Keamanan Type (Type safety) dan pencegahan *bug* |

### Styling & UI
| Teknologi | Kegunaan |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Kerangka utilitas CSS supercepat dan fleksibel |
| [shadcn/ui](https://ui.shadcn.com/) | Arsitektur komponen visual yang bisa disesuaikan penuh |
| [Lucide React](https://lucide.dev/) | Ratusan ikon beresolusi tajam |

### Backend & Database
| Teknologi | Kegunaan |
|---|---|
| [Supabase](https://supabase.com/) | *Backend-as-a-Service*: Auth, PostgreSQL, Bucket Storage & Realtime |

### State & Validasi
| Teknologi | Kegunaan |
|---|---|
| [Zustand](https://zustand-demo.pmnd.rs/) | Penyimpanan/manajemen state yang luar biasa simpel |
| [Zod](https://zod.dev/) | Skema perlindungan struktur *Form Validation* |
| [Sonner](https://sonner.emilkowal.ski/) | *Toast notifications* pop-up yang elegan |

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat

Pastikan kamu sudah menginstall:
- [Node.js](https://nodejs.org/) v18 atau versi lebih baru
- [npm](https://www.npmjs.com/) atau [pnpm](https://pnpm.io/)
- Akun Database [Supabase](https://supabase.com/)

### Instalasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/MuhammadAkaSahadi/ReproDigital-Youth.git
   cd reprodigital-youth
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Buat file `.env.local` dari contoh yang tersedia dan sesuaikan dengan proyek API Cloud milikmu:
   ```env
   # Supabase Config
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Setup Database (Migration)**

   Proyek ini menangani schema migrasi lewat direktori `/migrations`. Eksekusi secara berurutan kode `.sql` (01, 02, dst) yang ada di dalamnya masuk ke dalam *SQL Editor* Dasbor Supabase milikmu.

5. **Jalankan local server**
   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser untuk memulai aplikasinya.

---

## 📁 Struktur Inti Direktori

```text
reprodigital-youth/
├── app/                    # Routing App Next.js
│   ├── auth/               # Penanganan rute *Callback* Supabase
│   ├── dashboard/          # Area tertutup dengan statistik/navigasi aman
│   ├── edukasi/            # Modul bacaan & artikel interaktif
│   ├── konseling/          # Ruang penghubung (Klien - Konselor)
│   ├── login/              # Portal Log-In
│   ├── profile/            # Pengaturan keamanan pengguna
│   ├── register/           # Skema registrasi
│   ├── reset-password/     # Input *Forgot Password* -> kirim Email
│   └── update-password/    # Modul penggantian/reset password ke Supabase
├── components/             # Reusable UI component (Navbar, Shadcn)
├── migrations/             # Skrip Arsitektur Database (Supabase PostgreSQL)
├── store/                  # Client-side Global State (Zustand)
├── utils/                  # Setup *Server Action* dan Klien Auth Supabase
└── validations/            # Skema validasi objek form Zod
```

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi pengembangan yang lebih baik! Ikuti alur berikut:

1. Fork repositori ini
2. Buat branch fitur barumu (`git checkout -b feature/fitur-baru`)
3. Lakukan Commit (`git commit -m 'feat: menambahkan fitur X'`)
4. Push ke branch milikmu (`git push origin feature/fitur-baru`)
5. Kirimkan permintaan Pull (Pull Request)

---

<div align="center">

Dirancang dan dikembangkan dengan ❤️ untuk kemajuan masa depan remaja

</div>
