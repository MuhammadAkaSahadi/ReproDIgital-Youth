ReproDigital Youth — Design System Foundation
Dokumen ini mencakup fondasi sistem desain yang digunakan di seluruh platform ReproDigital Youth, termasuk palet warna, tipografi, spacing, dan token desain.

1. Color Palette

Primary Colors
•	Teal 600 (#0D9488) — Warna brand utama untuk aksi primer dan header
•	Teal 500 (#14B8A6) — Variasi lebih terang untuk hover states
•	Teal 50 (#F0FDFA) — Latar belakang terang untuk section konten
•	Green 500 (#22C55E) — State sukses, positive reinforcement

Accent Colors
•	Coral 500 (#FF7A5C) — CTA utama, highlight energik
•	Peach 400 (#FFB088) — Aksen sekunder, sentuhan hangat
•	Coral 50 (#FFF5F2) — Latar belakang aksen terang

Neutral Colors
•	White (#FFFFFF) — Latar belakang utama
•	Gray 50 (#F9FAFB) — Latar belakang section alternatif
•	Gray 200 (#E5E7EB) — Border dan divider
•	Gray 600 (#4B5563) — Teks body
•	Gray 900 (#111827) — Heading

Semantic Colors
•	Blue 500 (#3B82F6) — Elemen informasional
•	Yellow 400 (#FBBF24) — Peringatan, item perhatian
•	Red 500 (#EF4444) — Error (digunakan dengan hemat)

2. Typography
Font Pairing
•	Heading: 'Plus Jakarta Sans' (Google Fonts) — Modern, friendly, geometric sans-serif dengan rounded terminals
•	Body Text: 'Inter' (Google Fonts) — Sangat mudah dibaca, profesional, dioptimalkan untuk layar

Type Scale
•	Display — 48px/56px (mobile: 32px/40px) — Hero titles
•	H1 — 36px/44px (mobile: 28px/36px) — Page titles
•	H2 — 30px/38px (mobile: 24px/32px) — Section headers
•	H3 — 24px/32px (mobile: 20px/28px) — Card titles
•	H4 — 20px/28px (mobile: 18px/26px) — Subsections
•	Body Large — 18px/28px — Introductory paragraphs
•	Body — 16px/24px — Standard body text
•	Body Small — 14px/20px — Captions, meta information
•	Label — 12px/16px — Input labels, tags

3. Spacing System
•	Base unit: 4px
•	Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

4. Rounded Corners
•	sm — 4px (elemen kecil, tags)
•	md — 8px (buttons, inputs)
•	lg — 12px (cards)
•	xl — 16px (modals, featured cards)
•	2xl — 24px (hero sections)

5. Shadows
•	sm — 0 1px 2px rgba(0,0,0,0.05) — Elevasi halus
•	md — 0 4px 6px rgba(0,0,0,0.07) — Cards
•	lg — 0 10px 15px rgba(0,0,0,0.1) — Modals, dropdowns
•	hover — 0 12px 24px rgba(13,148,136,0.15) — Card hover states

6. Global Navigation
Desktop (>=1024px) — Top Navigation Bar
•	Height: 80px, fixed, backdrop blur saat scroll
•	Background: White dengan subtle shadow on scroll
•	Kiri: Logo ReproDigital Youth wordmark + icon (180px)
•	Tengah: Beranda | Edukasi | Konseling | Perencanaan Masa Depan | Tentang Kami
•	Kanan: Search icon + Profile/Login button (coral accent)
•	Active state: Teal underline 3px, teal text
•	Hover state: Teal 500 color transition

Tablet (768px–1023px)
•	Logo: 160px, font nav 15px, spacing dikurangi 12px
•	Search dipindah ke hamburger menu

Mobile (<768px)
Top Bar:
•	Height: 64px — Kiri: Hamburger | Tengah: Logo | Kanan: Search

Bottom Navigation (Fixed):
•	Height: 64px, 4 item: Beranda / Edukasi / Konseling / Profile
•	Active state: Teal icon dengan teal background (rounded)
•	Icons 24px, labels 12px

Hamburger Menu:
•	Full-height overlay, 80% screen width
•	Close button top-right, menu items dengan icons 56px height each

7. Design Tokens (CSS Variables)
:root {
  /* Colors */
  --color-teal-600: #0D9488;
  --color-teal-500: #14B8A6;
  --color-teal-50: #F0FDFA;
  --color-coral-500: #FF7A5C;
  --color-peach-400: #FFB088;
  --color-gray-900: #111827;
  --color-gray-600: #4B5563;
  --color-gray-50: #F9FAFB;

  /* Spacing */
  --spacing-xs: 4px;    --spacing-sm: 8px;
  --spacing-md: 16px;   --spacing-lg: 24px;
  --spacing-xl: 32px;   --spacing-2xl: 48px;

  /* Border Radius */
  --radius-sm: 4px;   --radius-md: 8px;
  --radius-lg: 12px;  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

8. Responsive Breakpoints
•	Mobile: < 768px — 1 kolom, bottom nav, stacked content
•	Tablet: 768px–1023px — 2 kolom, beberapa sidebar pindah ke bawah
•	Desktop: >= 1024px — 3 kolom, sidebars, hover states
•	Large Desktop: >= 1440px — Max widths enforced, lebih banyak whitespace

Key Responsive Patterns
•	Navigation: Top links -> Bottom nav with icons
•	Grids: 3-column -> 2-column -> 1-column
•	Sidebars: Right sidebar -> Below content on mobile
•	Hero: Two-column -> Single column (illustration first)
•	Modals: Center overlay -> Full-screen on mobile
•	Cards: Hover effects -> Tap states on mobile
•	Forms: Side-by-side fields -> Stacked fields
