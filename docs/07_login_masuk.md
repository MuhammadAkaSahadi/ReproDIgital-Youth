ReproDigital Youth
UI/UX Specification — Halaman Login (/login)
1. Page Layout
Desktop (>=1024px)
•	Full viewport height (min 100vh), Two-column grid 50/50
•	No navigation — hanya logo link

2. Left Column — Branding & Motivation
Desktop
Background: Gradient Teal 600 ke Teal 500 (diagonal)
Padding: 64px, Position: Sticky
Logo
•	Position: Absolute, top 48px, left 64px — White version, click → home
Illustration
•	Width: 80% (max 480px), center-aligned
•	Style: Flat illustration remaja merayakan goal, belajar, saling mendukung
Motivational Content
•	"Selamat Datang Kembali!" — H2, White, center
•	"Setiap langkah kecil membawamu lebih dekat ke impianmu" — Body Large, italic, White 0.95
Stats Row (Opsional)
•	"1,200+" — Remaja Bergabung
•	"500+" — Artikel Edukatif
•	"50+" — Konselor Tersedia
Mobile (<768px)
•	Hidden — digantikan Mobile Branding Header di kolom kanan

3. Right Column — Login Form
Desktop
Padding: 64px
Form Container: Max width 480px, margin 0 auto
Form Header
•	"Masuk ke Akun" — H1, Gray 900
•	"Lanjutkan belajar dan mencapai tujuanmu" — Body, Gray 600
Fields
•	1. Email — type email, icon Envelope kiri 16px, padding-left 44px
•	2. Password — type password, Show/Hide Eye icon kanan 24px
•	States: Focus (Teal 500), Error (Red 500 + bg Red 50)
Remember Me & Forgot Password Row
•	Remember Me (kiri): Checkbox 20px, label "Ingat saya"
•	Forgot Password (kanan): Teal 600, hover Coral 500, link ke /reset-password
Login Button
•	Width 100%, height 56px, Coral 500 bg, White text, 16px 600 weight
•	Hover: Coral 400, shadow-lg, translateY(-2px)
•	Loading: Spinner + "Masuk..."
Google Login
•	Width 100%, height 56px, White bg, border Gray 300
•	Google icon 24px + "Masuk dengan Google"
Register Link
•	"Belum punya akun? Daftar di sini" — link Teal 600, hover Coral 500

4. Reset Password Page (/reset-password)
Layout
•	Two-column layout sama dengan login
•	Left: Branding berbeda (ilustrasi tema password/lock)
Form Content
•	"Lupa Password?" — H1
•	"Masukkan email kamu dan kami akan mengirim link reset" — Subtitle
•	Email field + Button "Kirim Link Reset" (Coral 500, full width 56px)
•	Link "← Kembali ke Masuk" — center, Teal 600
Success State
•	Icon email sent 64px Teal 600
•	"Link Terkirim!" — H3
•	"Cek inbox atau folder spam..." — Body + email display
•	Button: "Kembali ke Masuk"

5. Responsive
Tablet (768–1023px)
•	Padding: 48px, form max-width 440px
Mobile (<768px)
•	Mobile header: Teal 600 bg, logo 140px, "Lanjutkan perjalananmu"
•	Padding: 32px 24px, field 48px, button 52px

6. Micro-interactions
•	Page Load: Kolom kiri fade+slide dari kiri 400ms, form fade from bottom 500ms delay 200ms
•	Input Focus: Border → Teal 500 200ms, shadow, icon → Teal 600
•	Password Toggle: Eye morph 200ms
•	Checkbox: Checkmark draw 300ms
•	Button Hover/Click: Sama dengan Register
•	Submit Error: Input shake, error message slide down
•	Submit Success: Fade out form → redirect
•	Forgot Password Link: Underline slide dari kiri 200ms, color transition
