Halaman Overview
ReproDigital Youth — Overview Admin dan Overview Konselor: summary cards, charts, dan tabel/list sesi

Overview — Admin
Summary Cards (Grid 4 kolom)
Card	                        | Icon	        | Warna	    | Value	    | Trend
Total Siswa Aktif	            | Users	        | Teal	    | 1,234	    | +12.5%
Total Konselor Terverifikasi	| UserCheck	    | Coral	    | 48	    | +8.3%
Total Sesi Bulan Ini	        | MessageSquare	| Green	    | 856	    | +15.2%
Konten Dipublikasikan	        | FileText	    | Amber	    | 127	    | -5.1% (merah)

📝  Setiap card: White bg, rounded-xl, padding 24px, shadow-sm. Layout flexbox space-between. Icon di kotak 48×48px rounded-lg dengan background 15% opacity.

Chart 1 — Pertumbuhan Pengguna Baru (Full width)
Tipe	| Area Chart (Recharts)
Height	| 300px
Fill	| Gradient teal 30% opacity ke 0%
Stroke	| Teal #0D9488, width 2px
Grid	| Dashed gray-100
Data	| Jan – Des (12 bulan)

Chart 2 — Sesi Konseling per Minggu (1/2 width)
Tipe	| Bar Chart
Height	| 300px
Bars	| Teal, radius top 8px
Data	| 4 minggu terakhir

Chart 3 — Distribusi Topik Konseling (1/2 width)
Tipe	                | Donut Chart
Inner / Outer Radius	| 60px / 100px
Padding Angle	        | 5 derajat
Legend	                | Bottom, horizontal

Topik	                | Warna
Kesehatan Reproduksi	| Teal
Perkawinan Anak	        | Coral
Hubungan Sehat	        | Green
Lainnya	                | Gray

Tabel — Pendaftaran Konselor Terbaru (Full width)
Kolom	| Keterangan
Nama	| 14px gray-900
Email	| 14px gray-600
Waktu	| 14px gray-600
Status	| Badge "Menunggu" — yellow-100 bg, yellow-800 text
Aksi	| Tombol "Verifikasi" — teal bg, white text, hover opacity 90%

Overview — Konselor
Summary Cards (Grid 4 kolom)
Card	                    | Icon	        | Warna	    | Value	    | Trend
Sesi Aktif Hari Ini	        | MessageSquare	| Teal	    | 12	    | +20.0%
Total Siswa Didampingi	    | Users	        | Coral	    | 38	    | +10.5%
Konten Dipublikasikan	    | FileText	    | Green	    | 15	    | +7.8%
Rating Rata-rata	        | Star	        | Amber	    | 4.8	    | +2.1%

Chart 1 — Grafik Sesi Konseling 8 Minggu Terakhir (Full width)
Tipe    | Line Chart
Line    | Teal stroke width 3px
Dots    | Teal fill, radius 5px
Data    | 8 minggu terakhir

Chart 2 — Distribusi Topik Konsultasi (1/2 width)
Tipe	| Horizontal Bar Chart
Bars	| Coral, radius right 8px
Y-axis	| Kategori, width 150px
Data	| 5 topik konseling

Chart 3 — Progress Goal Siswa / Gauge (1/2 width)
Tipe	                | Radial Bar Chart (Gauge)
Dimensi	                | 250×250px, center aligned
Start / End Angle	    | 90° / -270°
Inner / Outer Radius	| 80% / 100%
Fill	                | Teal
Center Text	            | "68%" 36px bold gray-900 + "Completion Rate" 14px gray-600

Sesi Aktif Terbaru (Full width)
Container	            | White card, rounded-xl, padding 24px, shadow-sm
List Item Layout	    | Flexbox space-between, gray-50 bg, rounded-lg, padding 16px, hover gray-100
Left	                | Avatar 40px + Nama 16px + Topik 14px gray-600
Right	                | Status Badge + Unread Count (coral circle) + Tombol "Buka Chat"

