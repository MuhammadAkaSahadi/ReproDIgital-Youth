ReproDigital Youth — Halaman Perencanaan Masa Depan
Dokumen ini mendeskripsikan UI/UX untuk halaman Perencanaan Masa Depan / Goal Tracker, termasuk overview, detail tujuan, form, gamifikasi, dan micro-interactions.

1. Page Layout
•	Desktop: max-width 1200px
•	Two-column 70/30 saat detail view terbuka
•	Single column untuk overview

2. Page Header
Desktop
•	Background: Gradient Peach 50 ke White, padding 48px 0
•	Ilustrasi dekoratif di kanan (tema goal/target)
•	Breadcrumb: 'Beranda / Perencanaan Masa Depan'
•	H1: 'Perencanaan Masa Depanmu'
•	Subtitle Body Large: 'Tetapkan tujuan, lacak kemajuan, dan wujudkan impianmu'
•	CTA Button: '+ Tambah Tujuan Baru' — Coral 500, icon Plus, rounded-lg

Mobile
•	Padding 32px 24px, ilustrasi lebih kecil di tengah-atas

3. Progress Overview Section
Desktop
•	Background White, padding 48px 0, container 1200px
•	3 summary cards, flex row, gap 24px

Desain Card:
•	Card 1: Gradient Teal 600 ke Teal 500 — Icon Target, 'Total Tujuan', '8 tujuan aktif'
•	Card 2: Gradient Coral 500 ke Peach 400 — Icon Trophy, 'Dicapai Bulan Ini', '3 tujuan tercapai'
•	Card 3: Gradient Green 500 ke Green 400 — Icon Fire, 'Streak Harian', '12 hari berturut-turut'
•	Padding 32px, rounded-xl, teks White semua
•	Icon 48px White 50% opacity, Label Body Small uppercase, Number Display 700 weight

Mobile
•	Horizontal scroll, card width 240px, gap 16px, snap scroll

4. Goals Overview Section
Header
•	H2: 'Tujuanmu', filter tabs kanan: Semua / Aktif / Tercapai / Ditunda
•	View toggle: Grid / List icons

Desain Goal Card (Grid 3 kolom desktop)
•	Background White, border 1px Gray 200, rounded-lg, padding 24px
•	Hover: shadow-md, border Teal 500, cursor pointer

Struktur Card:
•	Icon kategori 40px circle:
•	  Pendidikan: Blue | Karir: Purple | Kesehatan: Green | Keuangan: Yellow | Personal: Pink
•	Priority badge top-right: Tinggi (Red) / Sedang (Yellow) / Rendah (Gray), rounded-full
•	Title H3 max 2 baris, Description Body Small Gray 600 max 2 baris

Progress Bar:
•	Label 'Progress' kiri + Persentase '65%' Teal 600 kanan
•	Bar height 8px, rounded-full, fill Teal 500 animasi

Footer Card:
•	Border-top Gray 200, target date + milestone count
•	'Target: 31 Des 2026' (icon Calendar) | '4/7 langkah' (icon Checkmark)

Empty State
•	Icon target+plus Gray 400 80px, H3: 'Belum Ada Tujuan'
•	Button: '+ Tambah Tujuan' Coral 500

List View (Alternatif)
•	Single column, card horizontal: icon kiri, konten tengah, mini progress bar kanan

Mobile
•	1 kolom, gap 24px, footer card stacked

5. Goal Detail View (Modal/Slide-over)
Desktop — Slide-over dari Kanan
•	Width 600px, full viewport height, shadow-xl, animasi slide from right

Modal Header:
•	Icon kategori 48px + Title H2, Close button X, More options (Edit/Delete/Share)

Konten Modal (scrollable, padding 32px):
•	Seksi 1 — Goal Info: Deskripsi, tanggal dibuat, kategori, prioritas
•	Seksi 2 — Progress Overview: Card Teal 50, circular progress 120px, persentase di center, '4 dari 7 tasks', 'X hari tersisa'
•	Seksi 3 — Milestones/Tasks: Daftar langkah, checkbox Teal 500 jika done, due date kanan, teks coret Gray 500 jika selesai
•	Seksi 4 — Notes: Textarea / catatan display, tombol '+ Tambah Catatan'
•	Seksi 5 — Resources: Linked articles/videos mini card, tombol '+ Tambah Sumber'

Modal Footer:
•	'Tandai Tercapai' Teal 600 full width (disabled jika ada tasks belum selesai + tooltip)
•	'Simpan Perubahan' jika mode editing

Mobile
•	Full-screen, back button top-left, same structure, padding 24px

6. Add/Edit Goal Form (Modal)
Desktop — Center Modal
•	Width 640px, max-height 90vh, rounded-xl, overlay Black 50%

Fields Form:
•	Field 1 — Nama Tujuan: Input full width h:48px, placeholder contoh tujuan
•	Field 2 — Deskripsi: Textarea h:120px
•	Field 3 — Kategori: Chip horizontal (Pendidikan/Karir/Kesehatan/Keuangan/Personal), selected Teal 500
•	Field 4 — Prioritas: Radio buttons Rendah/Sedang/Tinggi dengan indikator warna
•	Field 5 — Target Date: Date picker, calendar icon dropdown
•	Field 6 — Langkah-Langkah: Dynamic list, setiap step ada input + tanggal + remove button
•	Spacing antar field: 24px

Modal Footer:
•	'Batal' secondary Gray border + 'Simpan Tujuan' Coral 500 primary
•	Validasi: Required fields — Red border + error message Red 500 12px

Mobile
•	Full-screen, header fixed top, konten scrollable, footer fixed bottom

7. Gamification Elements
Achievement Badges Section
•	Background Gray 50, padding 48px, rounded-xl
•	H2: 'Pencapaianmu', subtitle: 'Dapatkan lencana dengan menyelesaikan tujuan'
•	Grid: 5 kolom (desktop) / 3 (tablet) / 2 (mobile), gap 24px

Desain Badge Card:
•	Aspect ratio 1:1, background White, border Gray 200, rounded-lg, padding 24px, text-align center
•	Icon 64px berwarna, Nama Body 700, Deskripsi Body Small Gray 600
•	Locked state: Grayscale filter, opacity 50%, lock icon overlay
•	Earned state: Berwarna, shine animation on hover

Contoh Badge:
•	'Pemula' — Tujuan pertama dibuat
•	'Konsisten' — Streak 7 hari
•	'Pencatat' — 3 tujuan tercapai
•	'Inspirasi' — Tujuan dibagikan
•	'Penjelajah' — Semua kategori dicoba

Motivational Quote Section
•	Background: Gradient Coral 500 ke Peach 400, padding 48px, rounded-xl
•	Icon Sparkles White 70%, Quote H3 White, Author/Source Body Small White 80%
•	Button: 'Bagikan Motivasi' — White bg, Coral 500 text, share icon

8. Micro-interactions & Animations
•	Goal Card Hover: translateY(-4px), shadow increase, border change — 200ms ease
•	Progress Bar Fill: Animasi saat load/update, 800ms ease-out, spring effect di akhir
•	Checkbox Check: Scale animation, checkmark draw, confetti burst jika milestone selesai
•	Badge Unlock: Scale 0 ke 1, rotation, shine sweep, toast 'Lencana Baru Didapat!'
•	Milestone Complete: Strikethrough animation, warna ke gray, checkmark bounce
•	Goal Complete: Confetti, success modal 'Selamat! Tujuan Tercapai!', prompt share
•	Streak Counter: Fire animation saat load, pulse saat increment
•	Empty State: Float animation halus, glow pulse pada icon

9. Accessibility Considerations
•	Color contrast: WCAG AAA (7:1 body, 4.5:1 large text)
•	Focus states: High-contrast outline Teal 600 3px
•	Keyboard navigation: Tab-accessible, modal trap focus, Esc untuk tutup
•	Touch targets: Minimum 44x44px mobile, spacing 8px minimum
•	Forms: Label selalu visible, error messages spesifik, autocomplete attributes
•	Reduced motion: Media query prefers-reduced-motion, disable parallax & complex animations
•	Loading states: Skeleton screens, spinner dengan teks 'Loading...' untuk screen reader
