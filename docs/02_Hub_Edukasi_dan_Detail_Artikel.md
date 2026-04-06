ReproDigital Youth — Hub Edukasi & Detail Artikel
Dokumen ini mencakup UI/UX untuk dua halaman: Hub Edukasi (perpustakaan konten) dan Halaman Detail Artikel/Modul.

BAGIAN A: Hub Edukasi

A.1 Page Header
Desktop:
•	Height: 280px, background gradient Teal 50 ke White
•	Breadcrumb: 32px dari atas, Gray 600, Body Small — 'Beranda / Edukasi'
•	H1: 'Pusat Edukasi', subtitle Body Large Gray 600
•	Search bar: max-width 600px, h:56px, border Gray 200, rounded-lg, shadow-md
•	Search icon: magnifying glass Teal 600 di kiri
•	Focus: Border Teal 500, shadow-lg

Mobile:
•	Height auto (min 240px), padding 32px 24px
•	Search bar full width, h:48px

A.2 Filter & Category Section
Desktop:
•	Background White, padding 32px 0, sticky top 80px
•	Border-bottom Gray 200, shadow-sm saat scroll

Row 1 — Category Tabs:
•	Horizontal scroll jika dibutuhkan
•	Tab inactive: Gray 50 bg, Gray 600 text, rounded-full
•	Tab active: Teal 600 bg, White text
•	Kategori: Semua | Pubertas & Perkembangan | Kesehatan Reproduksi | Perkawinan Anak | Hubungan Sehat | Hak & Pendidikan | Kesehatan Mental

Row 2 — Filter Controls:
•	Kiri: Content type chips — Artikel / Video / Infografis / Kuis (multi-select)
•	Selected chip: Border Teal 500, bg Teal 50
•	Kanan: Sort dropdown — 'Urutkan: Terbaru / Terpopuler / A-Z'

Mobile:
•	Not sticky (static), category tabs horizontal scroll
•	Filter controls stack vertikal, padding 16px horizontal

A.3 Content Grid
Desktop:
•	Padding 48px 0, container max 1200px
•	3 kolom, gap 32px, load more dengan pagination

Desain Content Card:
•	Image aspect ratio 16:9, background White, border 1px Gray 200, rounded-lg
•	Hover: shadow-hover, translateY(-4px), border Teal 500
•	Badge tipe konten absolute top-left: Video (merah) / Quiz (kuning) / Infografis (ungu) / Artikel (teal)
•	Waktu baca/tonton top-right: White 90% bg, Gray 600, rounded-sm
•	Content area padding 24px:
•	  - Category label: Coral 500, uppercase, 12px, bold
•	  - Title H3: max 2 baris, ellipsis
•	  - Excerpt Body Gray 600: max 3 baris, ellipsis
•	  - Metadata row: Views + Dot + Date, Body Small Gray 500
•	  - Progress bar 4px (jika pernah dibuka): Teal 500 fill, Gray 200 bg

Featured Card (item pertama):
•	Spans 2 kolom, image 16:7 ratio, title H2
•	Badge 'Featured' top-left: Coral 500 bg

Tablet:
•	2 kolom, gap 24px, featured card spans 2 kolom

Mobile:
•	1 kolom, gap 24px, padding 24px horizontal
•	Featured card ukuran normal (sama dengan card lain)
•	Metadata disederhanakan (hapus views)

A.4 Sidebar (Desktop Only)
Widget 1 — Popular Topics:
•	Background Gray 50, padding 24px, rounded-lg
•	Heading H4: 'Topik Populer', list 5 item
•	Number badge: Teal 600, 24px circle, white text

Widget 2 — Quick Quiz:
•	Background Teal 600, padding 24px, rounded-lg
•	Heading H4 White: 'Kuis Cepat', button Coral 500 full width

Widget 3 — Need Help:
•	Border 2px dashed Teal 500, padding 24px, rounded-lg
•	Link: 'Hubungi Konselor', Teal 600, arrow icon

A.5 Loading & Empty States
Loading:
•	Skeleton cards dengan shimmer animation, layout grid sama, Gray 200 bg

Empty State:
•	Center-aligned, icon search X Gray 400 64px
•	H3: 'Tidak Ada Hasil', text: 'Coba kata kunci lain atau ubah filter'
•	Button: 'Reset Filter', secondary style

BAGIAN B: Halaman Detail Artikel/Modul

B.1 Page Layout
•	Desktop: max-width 960px (konten), sidebar 300px kanan, gap 64px, background White
•	Mobile: tidak ada sidebar, konten full width

B.2 Article Header
Desktop:
•	Padding 48px 0 32px
•	Breadcrumb Body Small Gray 600
•	Category badge: Coral 50 bg, Coral 600 text, uppercase 12px, padding 6px 12px, rounded-full
•	Title H1, 24px margin-top
•	Metadata row: Avatar 32px + Nama + Dot + Tanggal + Dot + Waktu baca + Dot + Views

Action Bar:
•	Flex row justify-between, border-top Gray 200
•	Kiri: Share buttons (Facebook / Twitter / WhatsApp / Link) — icon 40px, rounded-full, Gray 100 bg, hover Teal 500
•	Kanan: Bookmark 'Simpan' — border Gray 300, rounded-md, active Teal 500 bg

Mobile:
•	Action bar sticky bottom (di atas bottom nav), hanya icon tanpa label

B.3 Featured Image
•	Desktop: 24px margin-top, aspect ratio 16:9, rounded-xl
•	Caption Body Small italic, center-aligned, margin-top 12px
•	Mobile: Full width edge-to-edge, tanpa rounded corners

B.4 Article Content
Tipografi konten:
•	Body 18px / 32px line-height, Gray 700, paragraph spacing 24px
•	H2 dalam artikel: 48px margin-top, H3: 40px margin-top, H4: 32px margin-top

Elemen konten:
•	Lists: bullet Teal 500, numbered Teal 600, spacing 16px antar item
•	Blockquote: Border-left 4px Teal 500, bg Teal 50, italic, quote icon Teal 500
•	Callout boxes: Blue 50 (info) / Yellow 50 (warning) / Green 50 (tip), icon kiri 24px
•	Images: max-width 100%, center, rounded-lg, caption Gray 600
•	Video: 16:9 container, rounded-lg, iframe responsive
•	Tables: border Gray 200, header Teal 50 bg, alternating rows White/Gray 50
•	Links: Teal 600, dotted underline, hover Coral 500 solid underline

Interactive Quiz (embedded):
•	Background Gray 50, padding 32px, rounded-xl
•	Options: Border Gray 300, hover Teal 50, selected Border Teal 500 + Teal 50 bg
•	Submit button Coral 500, feedback Green/Red bg

Mobile:
•	Body 16px / 28px, reduced margins, padding 0 24px
•	Tables: horizontal scroll, simplified

B.5 Article Footer
Tags Section:
•	Tag chips: Gray 100 bg, Gray 700 text, rounded-full, hover Teal 50 + Teal 600

Author Bio Card:
•	Background Gray 50, padding 32px, rounded-xl
•	Avatar 80px, Nama H4, Role, Bio Body Small Gray 600, social links

Feedback Section:
•	Question H4: 'Apakah artikel ini membantu?'
•	Tombol thumbs up / thumbs down, 48px rounded-full
•	Hover/Selected: Teal 500 bg + white icon
•	Pesan terima kasih setelah klik

B.6 Sidebar (Desktop)
Widget 1 — Table of Contents:
•	Background Gray 50, auto-generated dari H2 di konten
•	Active: Teal 600 bold (berdasarkan posisi scroll), smooth scroll on click

Widget 2 — Related Articles:
•	Thumbnail 80px + Category Coral 500 + Title Body Small + Reading time Gray 500
•	Hover: Background Gray 50

Widget 3 — Quick Actions:
•	Background Teal 600, heading White: 'Masih Ada Pertanyaan?'
•	Button Coral 500 full width: 'Tanya Konselor'

B.7 Reading Progress Bar
•	Fixed top (di bawah nav), height 3px
•	Background Gray 200, fill Teal 500
•	Width sesuai persentase scroll artikel
