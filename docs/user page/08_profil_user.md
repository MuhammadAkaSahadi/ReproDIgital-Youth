ReproDigital Youth
UI/UX Specification — Halaman Profil User (/profile)
1. Profile Header
Cover Area (Desktop)
Height: 280px
Background: Gradient Teal 600 ke Coral 500 (diagonal)
Pattern: Geometric overlay, White opacity 0.1
Avatar
•	160px circle, border 6px White, shadow-lg
•	Position: Absolute, bottom -64px, left 64px
•	Hover: scale 1.05, cursor pointer, edit overlay (kamera 24px, bg hitam 60%)
Edit Profile Button
•	Position: Absolute, bottom 24px, right 64px
•	White bg, Teal 600 border & text, hover: bg Teal 600 text White
Profile Info
•	Padding: 80px 64px 32px (atas menyesuaikan avatar overlap)
•	Margin-left: 192px (ruang avatar)
•	Name (H1): Gray 900
•	Username (Body): Gray 600, prefix "@"
•	Role Badge: Teal 50 bg, Teal 600 text — "Siswa SMA" / "Siswa SMP"
•	Bio (Body): Gray 700, max-width 600px
•	Meta: Sekolah icon, Joined icon — Gray 600
Tablet / Mobile
•	Tablet: Cover 240px, avatar 128px
•	Mobile: Cover 200px, avatar 96px centered, text-align center

2. Tab Navigation
Design
Background: White, Padding: 0 64px
Sticky: top 80px (di bawah nav utama)
•	Tabs: Ikhtisar | Aktivitas | Badge | Pengaturan
•	Inactive: Gray 600, 600 weight
•	Active: Teal 600, border-bottom 3px Teal 600
•	Hover: Gray 900, Gray 50 bg
•	Mobile: Horizontal scroll, snap scroll

3. Tab 1 — Ikhtisar (Overview)
Summary Cards (4 kolom, 24px gap)
•	Height 140px, rounded-xl, gradient bg, shadow-md
•	Hover: translateY(-4px), shadow-lg
•	1. Total Artikel Dibaca — Teal 600→500 — Nilai: "42" (+5 minggu ini)
•	2. Total Kuis Diikuti — Coral 500→Peach 400 — Nilai: "15"
•	3. Streak Harian — Green 500→400 — Nilai: "12 hari berturut-turut"
•	4. Total Goal Aktif — Purple 600→500 — Nilai: "5" (2 hampir selesai)
Goal Aktif Section
•	Section header: H3 "Goal Aktif" + link "Lihat Semua →"
•	3 goal terbaru, vertical stack, 20px gap
Goal Card
•	White bg, border 1px Gray 200, rounded-lg, padding 24px
•	Hover: Border Teal 500, shadow-md
•	Layout: Flex row — Icon (56px) | Content (title, kategori, progress bar) | Date (kanan)
•	Progress bar: 8px, rounded, Gray 200 bg, Teal 500 fill
•	"4 dari 7 langkah (65%)" + target date + "120 hari lagi"
•	Empty state: Icon target + "Belum ada goal aktif" + button "+ Buat Goal"
Badge Terbaru Section
•	5 kolom, 20px gap, 5 badge terakhir
•	Badge card: 1:1 ratio, hover scale 1.05
•	Konten: Icon 64px, name (700w), date "3 hari lalu"

4. Tab 2 — Aktivitas
Filter Chips
•	Semua | Artikel | Kuis | Goal
•	Inactive: White bg, Gray 700, border Gray 300
•	Active: Teal 600 bg, White text
Activity Timeline
•	Border-left 4px: Artikel (Teal 500) | Kuis (Coral 500) | Goal (Green 500)
•	Hover: Border-left 6px, shadow-md
Item Layout: Flex row — Icon | Content | Timestamp
•	Type label: Uppercase, type-based color, margin-bottom 8px
•	Title (H4): Clickable, hover Teal 600
•	Untuk Artikel: Progress bar + waktu baca
•	Untuk Kuis: Score badge (Green/Red/Yellow bg)
•	Untuk Goal: Tanggal selesai + kategori badge
•	Timestamp: kanan, "2 hari lalu" + jam
•	Load More button: Secondary style (White, Teal border)

5. Tab 3 — Badge
Progress Overview
•	Container: White, padding 32px, rounded-xl, border 1px Gray 200
•	Circular progress: 120px, Teal 600 stroke, center: "60% Tercapai"
•	"Kamu telah mendapatkan 12 dari 20 badge"
Badges Grid
•	5 kolom (desktop), 3 (tablet), 2 (mobile), gap 24px
Badge Card
•	Aspect ratio 4:5, rounded-lg, padding 24px, text center
•	Earned: Border Teal 200, hover scale 1.05, border Teal 500
•	Locked: Grayscale 100%, opacity 0.5, overlay lock icon
•	Earned: Date badge "Didapat: 5 Jan 2026" — Teal 50 bg, Teal 600
•	Locked: Requirement + mini progress bar 4px
•	Tooltip hover (locked): Gray 900 bg, White text, 12px, arrow pointer
Contoh Badge
•	1. Pemula — dibuat akun pertama kali
•	2. Pembaca — baca 10 artikel
•	3. Kuis Master — lulus 5 kuis score 80+
•	4. Konsisten — streak 7 hari
•	5. Goal Getter — selesaikan 3 goal
•	6. Inspirasi — bagikan konten 5 kali

6. Tab 4 — Pengaturan
Section 1: Edit Profil
Foto Profil
•	Avatar 96px, Upload button (Teal 600 border/text), Remove (Red 500)
•	File requirements: JPG/PNG/GIF, max 2MB
Text Fields
•	1. Nama Lengkap — required, max 100 char
•	2. Username — prefix "@", alphanumeric+underscore, unique check real-time
•	   Available: Green checkmark, Taken: Red X
•	3. Bio — textarea 4 rows, max 160 char + character count
•	4. Gender — Radio chips: Laki-laki | Perempuan | Tidak ingin menyebutkan
•	   Selected: Teal 600 bg, White
•	5. Tanggal Lahir — date picker, validasi usia 12–19
•	6. Nama Sekolah — text, required
•	7. Kelas/Tingkat — dropdown, Kelas 7–12
Buttons
•	Save: Coral 500, loading "Menyimpan...", success toast "Profil berhasil diperbarui!"
•	Cancel: White, Gray border, margin-left 16px
Section 2: Keamanan Akun
•	Current Password — validasi match
•	New Password — min 8 char, 1 huruf besar, 1 angka, strength indicator
•	Confirm New Password — real-time validasi
•	Update button: Teal 600, padding 12px 24px, toast sukses
Section 3: Danger Zone
•	Card: Red 50 bg, border 2px Red 200, rounded-lg, padding 24px
•	Icon Warning triangle Red 500, heading Red 600 "Hapus Akun Permanen"
•	Delete button: Red 600 bg → modal konfirmasi
Confirmation Modal
•	Overlay 50% opacity, modal 480px White rounded-xl padding 32px
•	Input: ketik 'HAPUS AKUN' untuk unlock tombol konfirmasi
•	Buttons: Cancel (White/Gray) + Confirm (Red 600, disabled hingga valid)

7. Micro-interactions — Profil
Profile Header
•	Cover: Parallax scroll subtle
•	Avatar hover: Scale 1.05, edit overlay fade 200ms
Tab Navigation
•	Active underline slide dari tab sebelumnya 300ms
•	Content: Fade out/in 400ms
Summary Cards
•	On scroll: Stagger fade+slide up (100ms delay per card)
•	Nilai: Count-up animation on first view 1000ms
Goal & Badge Cards
•	Progress bar: Animated fill on load 800ms ease-out
•	Earned badge: Scale 1.05, rotate 2deg on hover
•	Locked badge: Tooltip slide up 200ms
•	Unlock animation: Scale 0→1.2→1, rotate 360deg, confetti burst
Activity Timeline
•	Items: Slide dari kiri on scroll, stagger 80ms
•	Border-left expand: 4px → 6px on hover
Settings Form
•	Username check: Spinner → checkmark/X animation
•	Password strength: Animated width + color transition
•	Success toast: Slide dari atas, auto-dismiss 3s
•	Delete modal: Scale 0.9→1 + fade 300ms
•	Input konfirmasi salah: Shake 300ms
