Manajemen Konten
ReproDigital Youth — Content library, filter, cards, modal buat konten baru (Admin & Konselor)

Page Header
Title	        | "Manajemen Konten" — 24px bold Plus Jakarta Sans
Subtitle	    | "Kelola konten edukasi untuk siswa" — 16px gray-600
Tombol Kanan	| "Buat Konten Baru" — Coral bg, white text, icon Plus 20px, rounded-lg, padding 8px 16px

Filter Bar
Container	| White card, rounded-xl, padding 16px, shadow-sm
Layout	    | Flexbox wrap, gap 16px

Filter 1 — Tipe Konten
Opsi	            | State Aktif	                | State Inactive
Semua	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Artikel	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Video	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Kuis	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Infografis	        | Teal bg, white text	        | Gray-100 bg, gray-700 text

Filter 2 — Status
Opsi	            | State Aktif	                | State Inactive
Semua	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Draft	            | Teal bg, white text	        | Gray-100 bg, gray-700 text
Dipublikasikan	    | Teal bg, white text	        | Gray-100 bg, gray-700 text
Diarsipkan	        | Teal bg, white text	        | Gray-100 bg, gray-700 text

Content Grid
Grid: 3 kolom desktop, 2 tablet, 1 mobile, gap 24px.
Struktur Content Card
Area	                            | Deskripsi
Thumbnail	                        | Height 128px. Background sesuai tipe: Artikel=Teal, Video=Coral, Kuis=Green, Infografis=Amber. Inisial 36px bold white, center.
Badge Row	                        | Flexbox space-between: Type Badge + Status Badge + MoreVertical icon
Type Badge	                        | Rounded-full, 12px medium, icon 12px, bg sesuai tipe, white text
Status Badge — Dipublikasikan	    | green-100 bg / green-800 text
Status Badge — Draft	            | yellow-100 bg / yellow-800 text
Status Badge — Diarsipkan	        | gray-100 bg / gray-800 text
Title	                            | 16px semibold gray-900, line-clamp 2 baris
Footer	                            | Tanggal DD/MM/YYYY + Icon Eye + jumlah views, 14px gray-600

📝  Card hover: shadow-md smooth transition. Border gray-100, overflow hidden.
Empty State
Icon	| FileText 48px gray-300
Teks	| "Tidak ada konten yang sesuai dengan filter" — 16px gray-600
Tombol	| "Buat Konten Baru" — coral bg, white text

Modal — Buat Konten Baru
Overlay	    | Black 50% opacity, full screen
Modal Width	| Full mobile, max 768px desktop
Header	    | "Buat Konten Baru" 20px bold + tombol Close (icon X)

Form Fields
Field	        Tipe	Detail
Judul	        | Text input	Full width, border gray-300, focus ring teal, placeholder "Masukkan judul konten"
Tipe Konten	    | Dropdown	        | Artikel, Video, Kuis, Infografis
Status	        | Dropdown	        | Draft, Dipublikasikan
Kategori	    | Dropdown	        | Kesehatan Reproduksi, Perkawinan Anak, Hubungan Sehat, Mental Health, Lainnya
Cover Image	    | Upload area	    | Border dashed 2px gray-300, icon ImageIcon 32px, drag & drop, PNG/JPG max 10MB
Konten	        | Textarea	        | 6 rows, placeholder "Tulis konten di sini..."
Tags	        | Text input	    | Placeholder "Pisahkan dengan koma"

Footer Buttons
Tombol	        | Style
"Batal"	        | Flex-1, gray-100 bg, gray-700 text, rounded-lg
"Simpan"	    | Flex-1, teal bg, white text, rounded-lg

