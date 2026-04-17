Konseling Sebaya
ReproDigital Youth — Verifikasi Konselor (Admin) dan Sesi Konseling (Konselor): chat interface, detail panel, konfirmasi

Halaman Verifikasi Konselor (Admin)
Page Header
Title	        | "Verifikasi Konselor" — 24px bold Plus Jakarta Sans
Subtitle	    | "Kelola dan verifikasi pendaftaran konselor baru" — 16px gray-600

Filter Tabs
Tab	                | Active Style	                                    | Inactive Style
Semua	            | Border-bottom 2px teal, text teal	                | Border transparent, text gray-600
Menunggu Verifikasi	| Border-bottom 2px teal, text teal	                | Border transparent, text gray-600
Terverifikasi	    | Border-bottom 2px teal, text teal	                | Border transparent, text gray-600
Ditolak	            | Border-bottom 2px teal, text teal	                | Border transparent, text gray-600

Tabel Daftar Konselor
Kolom	                    | Deskripsi
Nama	                    | Avatar 40×40px teal + Name 14px medium gray-900
Email	                    | 14px gray-600
Spesialisasi	            | 14px gray-600
Tanggal Daftar	            | 14px gray-600, format DD/MM/YYYY
Status Badge	            | Menunggu: yellow-100/yellow-800, Terverifikasi: green-100/green-800, Ditolak: red-100/red-800
Aksi	                    | "Lihat Detail" + "Verifikasi" (teal) + "Tolak" (red-500), hanya untuk status pending

Pagination Bar
Flexbox space-between. Kiri: "Menampilkan 1-5 dari X konselor" 14px gray-600. Kanan: Previous/Next dengan icon ChevronLeft/Right.

Detail Panel Slide-over
Overlay	        | Black 50% opacity, full screen
Panel	        | Fixed right, max 448px desktop, full mobile, scroll, shadow-xl
Header	        | "Detail Konselor" 20px bold + Close button (icon X)
Profile         | Section	Avatar 96×96px + Name 18px bold + Spesialisasi 14px, center aligned
Info Fields	    | Email, Pendidikan, Pengalaman, Bio, Status
Action Buttons	| "Verifikasi Sekarang" (teal) + "Tolak" (red-500), flex-1 masing-masing, hanya saat status pending

Confirmation Dialog
Overlay	            | Black 50% opacity, center aligned
Dialog	            | White bg, rounded-xl, padding 24px, max-width 448px, shadow-xl
Title	            | "Verifikasi Konselor" atau "Tolak Konselor" — 18px bold
Tombol Batal	    | Flex-1, gray-100 bg, gray-700 text
Tombol Konfirmasi	| Flex-1, teal/red bg, white text

Halaman Sesi Konseling (Konselor)
Summary Cards (Grid 3 kolom)
Card	                | Value	| Progress Bar Fill
Sesi Aktif	            | 3	    | Teal 75%
Menunggu Respons	    | —	    | Amber
Selesai Bulan Ini	    | —	    | Green

📝  Progress bar: Height 4px, gray-100 bg, rounded-full, margin-top 12px.

Tabs
Tabs: "Aktif", "Menunggu", "Selesai" — style sama seperti halaman Verifikasi Konselor.

Session List View
Container	| White, rounded-xl, padding 16px, shadow-sm, hover shadow-md, cursor pointer
Left	    | Avatar 48×48px + Student Name 16px semibold + Topik 14px + Last Message Time 12px gray-500
Right	    | Status Badge + Unread Badge (coral circle 24px) + Tombol "Buka Chat"

Chat View (saat sesi dipilih)
Area	        | Deskripsi
Container	    | White, rounded-xl, shadow-sm, height 600px, flexbox
Left Sidebar	| Width 320px, border-right gray-200. Header dengan link "← Kembali". Session list scrollable dengan active state teal-50
Chat Header	    | Padding 16px, flexbox space-between: Avatar + Name + Topik (kiri), Status Badge (kanan)
Pesan Siswa	    | Justify start (kiri). Bubble max-width 448px, bg gray-100, text gray-900, 14px. Time 12px gray-500
Pesan Konselor	| Justify end (kanan). Bubble max-width 448px, bg teal, text white, 14px. Time 12px teal-100
Input Area	    | Flexbox gap 12px: Attachment icon + Text input (flex-1, focus ring teal) + Send button (teal bg, icon Send 20px)

