ReproDigital Youth — Halaman Konseling Sebaya
Dokumen ini mendeskripsikan UI/UX lengkap untuk halaman Konseling Sebaya, mencakup tampilan chat list, antarmuka chat, pemilihan konselor, dan fitur-fitur pendukung.

1. Overview Layout
•	Desktop: Two-pane layout — Left pane (chat list, 360px) + Right pane (chat interface)
•	Mobile: Tabbed interface — Tab 'Obrolan' dan Tab 'Konselor'

2. Left Pane — Chat List (Desktop: 360px)
Header
•	Background: Teal 600, padding 24px
•	Title H3 White: 'Konseling Sebaya'
•	Subtitle White 80%: 'Ruang aman & rahasia'
•	Button '+ Mulai Obrolan Baru': Coral 500 bg, White text, full width, 16px margin-top

Search Bar
•	16px padding horizontal, background White, border Gray 200, rounded-lg
•	Placeholder: 'Cari obrolan...'

Chat List
•	Scrollable, setiap item height 80px, padding 16px, border-bottom Gray 200
•	Hover: Gray 50 bg
•	Active/Selected: Teal 50 bg, border-left Teal 500 (4px)

Struktur Chat Item:
•	Avatar 48px circle (foto konselor atau default avatar)
•	Online indicator: 12px green dot di bottom-right avatar
•	Nama konselor: Body 700 weight
•	Pesan terakhir: Body Small Gray 600, 1 baris ellipsis
•	Timestamp: Body Small Gray 500, absolute top-right
•	Unread badge: Teal 600 bg, White text, 20px circle

Empty State (Tidak Ada Chat)
•	Center-aligned, icon chat bubble Gray 400 64px
•	Text: 'Belum ada obrolan', Button: 'Mulai Konseling'

Mobile
•	Full width, tappable item membuka chat full-screen

3. Right Pane — Chat Interface
Chat Header
•	Height 80px, background White, border-bottom Gray 200, padding 16px 24px
•	Kiri: Avatar 40px + Nama Body 700 + Status ('Online' Green 500 / 'Terakhir aktif...' Gray 500)
•	Kanan: Icon buttons — Video call, Phone call, More options (vertical dots), 40px rounded-full, hover Gray 100

Chat Messages Area
•	Background: Gray 50 dengan subtle pattern, padding 24px, auto-scroll ke bawah

Message Bubble — Diterima (Konselor):
•	Align kiri, background White, shadow-sm
•	Rounded-lg (left-bottom corner sm), padding 12px 16px
•	Avatar 32px di kiri bubble, teks Gray 900
•	Timestamp Gray 500 10px di bawah bubble

Message Bubble — Dikirim (User):
•	Align kanan, background Teal 600, teks White
•	Rounded-lg (right-bottom corner sm), padding 12px 16px
•	Timestamp Gray 500 10px di bawah
•	Read receipt: Double checkmark (Blue jika dibaca, Gray jika terkirim)

System Messages:
•	Center-aligned, bg Gray 200, rounded-full, font 12px Gray 600
•	Contoh: 'Obrolan dimulai' atau 'Konselor bergabung'

Date Separators:
•	Center-aligned Gray 500 12px, 24px margin vertikal
•	Contoh: 'Hari Ini', 'Kemarin', '12 Januari 2026'

Typing Indicator:
•	Style pesan diterima, 3 dots animasi bouncing, Gray 400

Chat Input Area
•	Fixed bottom, background White, border-top Gray 200, padding 16px 24px
•	Input flex-grow, border Gray 300, rounded-full, placeholder 'Ketik pesan...'
•	Focus: Border Teal 500
•	Tombol attachment kiri: 40px rounded-full, icon Paperclip
•	Tombol emoji kanan: 40px rounded-full, icon Smile
•	Send button: 48px circle, Teal 600 bg, icon send arrow White
•	Disabled (input kosong): Send button Gray 300

Mobile:
•	Full-screen, back button top-left
•	Input area fixed bottom (di atas bottom nav)
•	Message bubbles max-width 80%

4. Initial State — Pemilihan Konselor
Tampil jika belum ada chat aktif (Desktop: right pane, Mobile: tab 'Konselor')

Desktop — Right Pane
•	Center-aligned: Icon Heart + chat Teal 600 80px
•	H2: 'Pilih Konselor'
•	Subtitle: 'Semua obrolan bersifat rahasia dan aman'
•	Grid konselor: 2 kolom, gap 24px, margin-top 32px, max 4 konselor (scroll untuk lebih)

Desain Counselor Card
•	Background White, border Gray 200, rounded-lg, padding 24px, text-align center
•	Hover: shadow-hover, border Teal 500
•	Avatar: 80px circle, center
•	Nama H4: 16px margin-top
•	Spesialisasi Body Small Coral 500: 'Kesehatan Reproduksi' / 'Hubungan Remaja'
•	Status: Online (Green dot + 'Tersedia') / Offline (Gray dot + 'Offline')
•	Stats row: '124 sesi' + '4.9 ★', Gray 600 12px
•	Button Online: 'Mulai Chat' Teal 600 primary
•	Button Offline: 'Jadwalkan' Gray border secondary

Filter/Sort
•	Dropdown top-right: 'Tersedia Sekarang' / 'Semua Konselor' / 'Berdasarkan Rating'

Mobile
•	1 kolom, tappable card membuka chat

5. Privacy Notice
•	Background Blue 50, border Blue 500, rounded-lg, padding 16px
•	Icon shield check Blue 600 di kiri
•	Teks: 'Semua percakapan dienkripsi dan rahasia. Konselor terlatih dan terikat kode etik.'
•	Link: 'Baca Kebijakan Privasi' Blue 600

6. Fitur Tambahan dalam Chat
Resource Sharing (dari Konselor)
•	Card khusus embedded dalam chat
•	Background White, border Teal 500 2px, rounded-lg, padding 16px
•	Icon + Title H4 (artikel/video), preview text Body Small
•	Button: 'Buka' Teal 600

Quick Replies (User)
•	Tampil di atas input saat konselor mengirim pertanyaan
•	Chip style: White bg, border Teal 500, rounded-full, padding 8px 16px
•	Tap untuk mengirim sebagai pesan, horizontal scroll

Session End
•	System message: 'Sesi berakhir'
•	Feedback prompt card: 'Bagaimana sesi Anda?'
•	Rating bintang 5 + feedback teks opsional
•	Button: 'Kirim Masukan'
