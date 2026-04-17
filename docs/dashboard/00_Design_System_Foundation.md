Design System Foundation
ReproDigital Youth — Panduan sistem desain, token, warna, tipografi, spacing, dan komponen dasar

Color Palette
Token           | Hex Code    | Penggunaan
Primary Teal    | #0D9488     | Elemen utama, menu aktif, buttons, charts
Accent Coral    | #FF7A5C     | CTA sekunder, notifikasi, badges
Success Green   | #10B981     | Status aktif, progress positif
Warning Amber   | #F59E0B     | Status pending, kategori tertentu
Neutral Gray-50 | #F9FAFB     | Background halaman
White           | #FFFFFF     | Card, sidebar, topbar
Gray Borders	| #E5E7EB	  | Garis pembatas
Text Primary	| #111827	  | Teks utama
Text Secondary	| #6B7280	  | Teks deskripsi

Tipografi
Heading Font	| Plus Jakarta Sans — untuk judul halaman, nama brand
Body Font	    | Inter — untuk seluruh teks konten

Font Sizes
Elemen	                | Size	| Weight
Heading Halaman	        | 24px	| Bold
Subheading	            | 18px	| Semibold
Card Title	            | 16px	| Semibold
Body Text	            | 14px	| Regular
Caption / Small Text	| 12px	| Medium

Spacing & Layout
Token	                | Nilai	            | Class Tailwind
Card Border Radius	    | 12px	            | rounded-xl
Button Border Radius	| 8px	            | rounded-lg
Badge Border Radius	    | 16px	            | rounded-full
Card Padding	        | 24px	            | p-6
Grid Gap	            | 24px	            | gap-6
Shadow Card	            | Subtle elevation	| shadow-sm

Komponen UI Umum
Komponen	    | Deskripsi
Buttons	        | Solid dengan hover opacity 90%, padding vertikal 8–12px, rounded-lg
Status Badges	| Rounded-full, padding 8px horizontal, 4px vertikal
Avatar Circle	| Background teal, inisial putih, font medium
Progress Bar	| Height 8px, rounded-full, bg gray-100, fill teal
Input Fields	| Border gray-300, focus ring teal, rounded-lg, padding 8–16px

Breakpoints Responsif
Breakpoint	    | Ukuran Layar	    | Sidebar	                        | Grid Cards
Desktop	        | ≥ 1024px	        | Visible 260px, collapsible 72px	| 4 kolom (summary), 3 kolom (konten)
Tablet	        | 768px – 1023px	| Hidden, hamburger menu	        | 2 kolom
Mobile	        | < 768px	        | Overlay slide-in dengan backdrop	| 1 kolom

Navigation & Interaction States
Buttons
•	Default: Solid color, medium font, rounded-lg
•	Hover: Opacity 90% atau background darkened
•	Active: Slight scale down
•	Disabled: Opacity 50%, cursor not-allowed
Inputs
•	Default: Border gray-300
•	Focus: Ring 2px teal, border transparent
•	Error: Border red-500, ring red-200
•	Disabled: Background gray-100, cursor not-allowed

Animations & Transitions
Elemen	                | Durasi & Easing
Sidebar collapse/expand	| 300ms ease
Modal/Panel slide-in	| 300ms ease-out
Overlay fade	        | 200ms ease-in
Scale dialog	        | 200ms ease-out (95% → 100%)
Hover shadow/bg change	| 150ms ease
Charts initial load	    | 800ms ease-out (dari 0 ke value)
Charts update	        | 400ms smooth
Progress bar	        | 300ms ease

Icons & Avatars
Icon Library: Lucide React
Konteks	                | Size	| Stroke Width
Navigation / Buttons	| 20px	| 2px
Inline / Badge	        | 16px	| 2px
Empty State	            | 48px	| 2px

Avatar Spec
Konteks	                | Ukuran	| Background	Teks
Topbar	                | 32×32px	| Teal #0D9488	White, medium, uppercase initials
List Item	            | 40×40px	| Teal #0D9488	White, medium, uppercase initials
Card	                | 48×48px	| Teal #0D9488	White, medium, uppercase initials
Detail / Profile	    | 64–96px	| Teal #0D9488	White, bold, uppercase initials

