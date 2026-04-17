ReproDigital Youth
UI/UX Specification — Halaman Register (/register)
1. Page Layout
Desktop (>=1024px)
•	Full viewport height (min 100vh)
•	Two-column grid: 50/50 split
•	No navigation — hanya logo link ke home
•	Background: White

2. Left Column — Branding & Value Proposition
Desktop
Background: Gradient Teal 600 ke Teal 500 (diagonal, top-left ke bottom-right)
Padding: 64px
Position: Sticky
Logo
•	Position: Absolute, top 48px, left 64px
•	White logo version, click → link ke home
Illustration
•	Width: 80% (max 480px), center-aligned
•	Style: Flat illustration remaja Indonesia menggunakan platform
•	Warna: White, Coral 50, Peach 400 accents
Heading & Value Props
•	"Mulai Perjalananmu Hari Ini" — White, H2, center
•	Value Props (4 items):
–	Akses gratis selamanya
–	Ruang aman & rahasia
–	Konselor sebaya terlatih
–	Materi edukatif berkualitas
•	Tiap item: Icon checkmark circle 24px, White 0.95, 16px margin-left
Mobile (<768px)
•	Hidden (display: none) — digantikan Mobile Branding Header di kolom kanan

3. Right Column — Registration Form
Desktop
Background: White
Padding: 64px
Form Container: Max width 480px, margin 0 auto
Form Header
•	"Daftar Akun Baru" — H1, Gray 900, left (desktop), center (mobile)
•	"Bergabung dengan ribuan remaja lainnya" — Body, Gray 600, margin-top 12px
Field Styling (Global)
•	Label: 14px, 600 weight, Gray 700, required indicator: * merah
•	Input: Full width, height 48px, padding 12px 16px, border 1px Gray 300, rounded md
•	Focus: Border Teal 500, shadow-sm
•	Error: Border Red 500, bg Red 50 + pesan error 12px Red 500
•	Success: Border Green 500 + checkmark hijau kanan
Fields
–	1. Nama Lengkap — text, required, min 3 karakter
–	2. Email — email, required, validasi format
–	3. Password — password, min 8 char, 1 huruf besar, 1 angka
–	   Password strength: Lemah (merah) / Sedang (kuning) / Kuat (hijau)
–	   Show/Hide toggle: Eye icon 24px
–	4. Konfirmasi Password — harus cocok, real-time validasi
–	5. Nama Sekolah — text, required
–	6. Kelas/Tingkat — dropdown, Kelas 7 SMP sampai 12 SMA
Terms & Privacy Checkbox
•	Checkbox 20px, rounded-sm, checked: Teal 600 bg + white checkmark
•	Label: "Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi"
•	Wajib dicentang untuk submit
Register Button
•	Width 100%, height 56px, Coral 500 bg, White text
•	Hover: Coral 400, shadow-lg, translateY(-2px)
•	Loading: spinner + "Mendaftar..."
•	Disabled: Gray 300 bg
Google Sign-up
•	Width 100%, height 56px, White bg, border 1px Gray 300
•	Google icon 24px + "Daftar dengan Google"
•	Hover: Gray 50 bg, border Gray 400
Login Link
•	"Sudah punya akun? Masuk di sini" — link Teal 600, hover Coral 500

4. Form Validation Behavior
•	Trigger: on blur (field kehilangan fokus)
•	Password strength: Real-time saat mengetik
•	Submit: cek semua field + checkbox, scroll ke error pertama
Success State
•	Option 1: Redirect ke halaman verifikasi email
•	Option 2: Modal — checkmark hijau + "Akun Berhasil Dibuat!" + button "Lanjut ke Beranda"

5. Responsive
Tablet (768–1023px)
•	Padding: 48px, form max-width 440px
Mobile (<768px)
•	Mobile Branding Header: Teal 600 bg, logo center, tagline white
•	Form padding: 32px 24px, field height 48px, button 52px
•	Spacing antar field: 20px

6. Micro-interactions
•	Page Load: Kolom kiri slide dari kiri 400ms, form fade from bottom 500ms
•	Input Focus: Border color 200ms, shadow, label → Teal 600
•	Validation Error: Shake 300ms, border red pulse
•	Validation Success: Checkmark slide dari kanan 200ms
•	Password Toggle: Eye icon morph 200ms
•	Checkbox: Checkmark draw animation 300ms
•	Button Hover: Lift -2px, shadow expand, color transition
•	Submit: Scale 0.98 → spinner → sukses/error
