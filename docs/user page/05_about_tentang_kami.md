ReproDigital Youth
UI/UX Specification — Halaman Tentang Kami (/about)
1. Hero Section
Desktop
Height: 480px
Background: Gradient Teal 50 (atas) ke White (bawah)
Container: Max width 1200px, centered
Typography
Heading (H1): "Tentang ReproDigital Youth" — Teal 600, 48px margin-bottom
Tagline: "Memberdayakan remaja Indonesia..." — Gray 600, line-height 1.6, center
Decorative Illustration
•	Position: Absolute, sisi kanan
•	Width: 400px
•	Style: Flat illustration remaja Indonesia dalam setting edukasi
•	Opacity: 0.9, Z-index: lebih rendah dari konten
Tablet (768–1023px)
•	Height: 400px, Illustration: 300px
•	Heading: 36px, Body Large: 16px
Mobile (<768px)
•	Height: auto (min 360px), Padding: 48px 24px
•	Illustration: Disembunyikan atau dipindah ke bawah (200px)
•	Heading: 32px, Tagline: 16px

2. Misi & Visi Section
Desktop
Background: White
Padding: 96px vertical, 64px horizontal
Container: Max width 1200px
Section Header
H2: "Misi & Visi Kami"
Subtitle: "Komitmen kami dalam pencegahan perkawinan anak"
Text-align: Center, spacing: 16px judul ke subtitle, 64px ke konten
Layout Konten
•	Two-column grid, equal width, 64px gap
Card Design
•	Background: White, Border: 2px solid Gray 200, Rounded: xl
•	Padding: 40px, Min-height: 300px
•	Hover: Border Teal 500, shadow-md, translateY(-4px), Transition: 300ms
Card 1 — Visi
•	Icon: Eye/Target, 64px, Teal 600, background Teal 50 circle (80px)
•	Label: "Visi Kami" — H3, Teal 600, uppercase, 14px, 700 weight
•	"Mewujudkan generasi muda Indonesia yang sehat, berdaya..."
Card 2 — Misi
•	Icon: Compass/Rocket, 64px, Coral 500, background Coral 50 circle (80px)
•	Label: "Misi Kami" — H3, Coral 500, uppercase
•	List checkmark Coral 500, 16px spacing:
–	Menyediakan literasi kesehatan reproduksi yang mudah dipahami
–	Membangun ruang aman untuk konseling sebaya
–	Mendorong remaja merencanakan masa depan
–	Menurunkan angka perkawinan anak di pedesaan Indonesia
Tablet (768–1023px)
•	Padding: 80px 48px, 2 kolom tetap, gap 48px, card padding 32px
Mobile (<768px)
•	Padding: 64px 24px, Single column, gap 24px, card padding 24px

3. Tim Section
Desktop
Background: Gray 50
Padding: 96px vertical, 64px horizontal
Grid: 4 kolom, 32px gap
Team Member Card
•	Background: White, Rounded: lg, Overflow: hidden
•	Hover: shadow-lg, translateY(-8px), scale(1.02), Transition: 300ms ease-out
Card Structure
•	Photo: Aspect ratio 4:5, object-fit cover, grayscale 20% → 0% on hover
•	Name (H4): Gray 900, 700 weight
•	Role Badge: Teal 50 bg, Teal 600 text, 12px, rounded-full — "Ketua Tim" / "Anggota Tim"
•	Program Studi (Body Small): Gray 600, icon University/Book 16px
•	Social Icons (opsional): LinkedIn, Email — 24px, Gray 400 → Teal 600 on hover
Contoh Anggota Tim
•	Divacyl Fiana Agustin — Ketua Tim — Kesehatan Masyarakat
•	[Anggota 2–5] — Anggota Tim — [Program Studi]
Tablet (768–1023px)
•	Grid: 2 kolom, gap 24px, Padding: 80px 48px
Mobile (<768px)
•	Grid: 1 kolom, gap 24px, Padding: 64px 24px, card padding 20px

4. Mitra Program Section
Desktop
Background: White
Grid: 2x2 (4 items), 32px gap, equal height
Partner Card
•	Border: 1px Gray 200, Rounded: lg, Padding: 32px, Text-align: center
•	Hover: Border Teal 500, shadow-md, Transition: 200ms
•	Logo container: 80px, Teal 50 bg, Rounded: lg, icon 48px
•	Partner Name (H4): Gray 900
•	Partner Type (Body Small): Coral 500, 600 weight
•	Description (Body Small): Gray 600, max 2–3 baris
Konten Mitra
•	SMP Madinatul Ulum — Sekolah Mitra
•	Puskesmas Jenggawah — Fasilitas Kesehatan
•	Desa Cangkring — Pemerintah Desa
•	Universitas Jember — Perguruan Tinggi
Mobile (<768px)
•	Grid: 1 kolom, gap 20px, Padding: 64px 24px, Logo: 64px

5. Kontak Section
Desktop
Background: Teal 600
Padding: 80px vertical, 64px horizontal
Pattern: Geometric overlay, Teal 700 opacity 0.1
Konten
•	H2: "Hubungi Kami" — White
•	Subtitle: "Punya pertanyaan atau ingin berkolaborasi?" — White opacity 0.9
•	Contact info: Flex row, justify-center, gap 48px
•	Email: info@reprodigitalyouth.id
•	Instagram: @ReproDigitalYouth_PM
•	Lokasi: Jember, Jawa Timur
Social Media Buttons
•	56px circle, border 2px White opacity 0.3, bg White opacity 0.1
•	Hover: bg White, icon Teal 600, Transition: 300ms
•	Platforms: Instagram, Facebook, YouTube, Email
CTA
•	Text: "Tertarik bergabung sebagai mitra atau relawan?"
•	Button: "Hubungi Tim Kami" — Coral 500, padding 14px 32px, rounded-lg
Mobile (<768px)
•	Padding: 56px 24px, contact info: flex column, gap 24px
•	CTA button: full width, max 320px

6. Micro-interactions
Hero Section
•	Decorative shapes: Float animation 3s loop
•	Heading: Fade in from bottom 600ms, delay 200ms
•	Tagline: Fade in from bottom 600ms, delay 400ms
Misi & Visi Cards
•	On scroll: Slide in dari sisi (kiri untuk Visi, kanan untuk Misi, 500ms)
•	Hover: Lift -4px, border transition, icon pulse glow
Team Cards
•	On scroll: Stagger fade in (100ms delay per card)
•	Hover: Photo brightness increase, scale 1.02, shadow expand
•	Photo: Grayscale → color transition 300ms
Partner Cards
•	On scroll: Fade in with scale 0.95 → 1
•	Hover: Border color change, logo rotate 2–3deg
Contact Section
•	Social buttons: Scale 1.1, rotation 5deg on hover
•	CTA button: Pulse shadow, slight lift
