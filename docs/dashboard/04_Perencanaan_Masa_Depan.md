Perencanaan Masa Depan
ReproDigital Youth — Pantauan Goal Siswa (Konselor) dan Manajemen Siswa (Admin): goals, progress, gamifikasi, aksesibilitas

Halaman Pantauan Goal Siswa (Konselor)
Page Header
Title	        | "Pantauan Goal Siswa" — 24px bold
Subtitle	    | "Pantau perkembangan goal siswa yang sedang didampingi" — 16px gray-600
Sort Dropdown	| Opsi: "Progress Tertinggi", "Progress Terendah", "Mendekati Deadline"

Students Grid (3 kolom desktop, 2 tablet, 1 mobile)
Area Card	    | Deskripsi
Avatar	        | 48×48px teal circle dengan inisial
Name	        | 16px semibold gray-900
Active Goals	| "X goal aktif" — 14px gray-600
Streak Badge	| Orange-100 bg, rounded-lg. Icon Flame 14px orange-500 + angka 14px orange-700
Progress Label	| Flexbox space-between: "Progress Rata-rata" (14px gray-600) + persentase (14px medium gray-900)
Progress Bar	| Height 8px, gray-100 bg, teal fill, rounded-full, smooth transition
Tombol	        | "Lihat Detail Goal" — full width, teal text, teal-50 bg, hover teal-100

Detail Panel Slide-over
Panel Width	    | Full mobile, max 512px desktop
Header	        | "Detail Goal Siswa" 20px bold + Close button

Student Info Card (dalam panel)
Background	    | Gradient teal-50 to teal-100, rounded-xl, padding 24px
Avatar	        | 64×64px teal circle, inisial 24px bold
Progress Bar	| Label "Progress Rata-rata" 14px + Persentase 18px bold teal + Bar height 12px white bg teal fill
Streak Badge	| Orange-100 bg, icon Flame 16px + teks

Goal Item Card
Elemen	            | Deskripsi
Container	        | gray-50 bg, rounded-xl, padding 16px
Header	            | Icon Target 16px teal + Title 16px medium + Category Badge (teal-100), Persentase 24px bold teal
Progress Bar	    | Height 8px, gray-200 bg, teal fill, rounded-full
Milestone Label	    | "Milestone (X/Y)" — 12px medium gray-600
Milestone — Selesai	| Circle 20×20px, border teal, bg teal, white checkmark. Teks 14px gray-900
Milestone — Belum	| Circle 20×20px, border gray-300, no fill. Teks 14px gray-500
Target Date	        | Icon Calendar 14px + "Target: DD/MM/YYYY" — 14px gray-600, border-top gray-200

Note Box (Catatan Konselor)
blue-50 bg, rounded-xl, padding 16px, margin-top 24px. Teks 14px gray-700 dengan bold "Catatan:". Isi: "Sebagai konselor, Anda hanya dapat memantau progress goal siswa..."

Halaman Manajemen Siswa (Admin)
Page Header
Title	    | "Manajemen Siswa" — 24px bold
Subtitle	| "Kelola dan pantau data siswa terdaftar" — 16px gray-600

Search & Filter Bar
Search Input	| Flex-1, min-width 256px. Icon Search absolute left + input padding-left 40px. Placeholder "Cari nama atau sekolah..."
Status Filters	| "Semua", "Aktif", "Tidak Aktif". Active: teal bg white text. Inactive: gray-100 bg gray-700 text.

Tabel Siswa
Kolom	            | Deskripsi
Nama	            | Avatar 40×40px teal + Name 14px medium gray-900
Sekolah	            | 14px gray-600
Tanggal Daftar	    | 14px gray-600, DD/MM/YYYY
Status Akun	        | Aktif: green-100/green-800 , Tidak Aktif: gray-100/gray-800
Jumlah Sesi	        | 14px gray-600
Aksi	            | "Lihat Profil" (gray-100) + "Nonaktifkan" (red-500, hanya status aktif)

Student Detail Panel (Slide-over)
Bagian	                | Deskripsi
Profile	                | Avatar 96×96px + Name 18px bold + School 14px + Status Badge, center aligned
Basic Info	            | Tanggal Daftar — label 14px medium gray-600, value format DD MMMM YYYY
Statistik Penggunaan	| gray-50 bg, rounded-xl, grid 3 kolom: Sesi (teal 24px bold) + Konten Dibaca (coral) + Kuis Diikuti (green)
Badge yang Diraih	    | Flex wrap gap 8px. Item: gradient yellow-100 to orange-100, border yellow-200, icon Award 16px orange-500 + nama badge 14px
Empty State Badge	    | Icon Award 32px gray-300, "Belum ada badge" 14px gray-500, gray-50 bg rounded-xl padding 32px vertikal
Action Button	        | "Nonaktifkan Akun" — full width, red-500 bg, white text, icon UserX 18px, padding 12px, rounded-lg

Deactivate Confirmation Dialog
Title	            | "Nonaktifkan Akun" — 18px bold gray-900
Message	            | Konfirmasi dengan nama siswa + warning text
Tombol Batal	    | Flex-1, gray-100 bg, gray-700 text
Tombol Konfirmasi	| "Ya, Nonaktifkan" — Flex-1, red-500 bg, white text

Struktur Layout Global — Sidebar & Topbar
Komponen	                | Spec
Sidebar Width	            | Expanded 260px, Collapsed 72px, Fixed left, White bg
Logo Area	                | "ReproDigital Youth" teal 20px bold. Role Badge: rounded-full teal-100/coral-100
Menu Item Active	        | bg-teal-50, border-left 4px solid teal, icon+text teal
Menu Item Inactive	        | bg transparent, hover bg-gray-50, icon+text gray-700
Topbar Height	            | 64px, sticky top, white bg, border-bottom gray-200, padding 24px horizontal
Topbar Search	            | Desktop only, width 256px, gray-100 bg, rounded-lg
Topbar Bell	                | Icon 20px + red dot badge (coral 8×8px) + hover bg-gray-100 rounded-lg
Topbar Avatar	            | 32×32px teal rounded-full + nama role dropdown 14px semibold

