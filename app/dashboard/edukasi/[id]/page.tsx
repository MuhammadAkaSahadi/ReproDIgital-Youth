import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye, Tag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default async function ArtikelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Mock data untuk artikel
  const article = {
    id,
    title: "Membangun Kesadaran Diri: Menjaga Kesehatan Reproduksi di Masa Transisi Remaja",
    type: "Artikel",
    category: "Kesehatan Reproduksi",
    date: "14 Agustus 2026",
    author: "Dr. Sarah Admin",
    views: "1.2k",
    status: "Dipublikasikan",
    content: `
      <p>Masa remaja adalah fase transisi yang sangat penting, ditandai dengan berbagai perubahan fisik, emosional, dan psikologis. Salah satu aspek krusial yang sering kali kurang mendapatkan perhatian karena dianggap tabu adalah kesehatan reproduksi.</p>

      <h3>Mengenal Perubahan Tubuh</h3>
      <p>Banyak remaja mengalami kebingungan atau bahkan kecemasan saat tubuh mereka mulai berubah. Edukasi sejak dini bukan hanya tentang mengetahui fungsi biologis, tetapi juga menghargai tubuh sendiri dan memahami batasan pribadi. Pengetahuan yang benar dapat mencegah remaja dari informasi yang salah yang banyak beredar di internet.</p>
      
      <p>Beberapa hal mendasar yang perlu dipahami meliputi:</p>
      <ul>
        <li>Perubahan hormon dan dampaknya pada emosi.</li>
        <li>Pentingnya menjaga kebersihan sistem reproduksi.</li>
        <li>Pemahaman tentang persetujuan (consent) dan batasan tubuh.</li>
      </ul>

      <h3>Dampak Kurangnya Edukasi</h3>
      <p>Tanpa panduan yang tepat, remaja rentan terhadap berbagai risiko seperti infeksi menular seksual (IMS), kehamilan yang tidak diinginkan, hingga dampak psikologis seperti rendahnya harga diri. Oleh karena itu, komunikasi terbuka antara orang tua, konselor, dan remaja menjadi kunci utama.</p>

      <div class="bg-teal-50 rounded-lg p-6 my-6 border-l-4 border-teal-500">
        <p class="font-medium text-teal-800 m-0">"Memahami kesehatan reproduksi bukan berarti mendorong aktivitas pradini, melainkan membekali remaja dengan perisai pengetahuan agar mereka dapat membuat keputusan yang bertanggung jawab."</p>
      </div>

      <p>Kesimpulannya, edukasi kesehatan reproduksi adalah hak setiap remaja. Platform seperti ReproDigital Youth hadir untuk menjembatani kesenjangan informasi ini, memberikan ruang aman bagi remaja untuk belajar dan berkonsultasi secara anonim bersama konselor sebaya.</p>
    `
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Tombol Kembali */}
      <div>
        <Link 
          href="/dashboard/edukasi"
          className={buttonVariants({ variant: "ghost", className: "text-gray-500 hover:text-gray-900 hover:bg-gray-100 -ml-4" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Hub Edukasi
        </Link>
      </div>

      {/* Hero Image Placeholder */}
      <div className="w-full h-48 md:h-[320px] rounded-2xl bg-teal-600 flex items-center justify-center overflow-hidden shadow-sm relative group">
        <div className="absolute inset-0 bg-black/10 transition-opacity"></div>
        <span className="text-white/20 text-6xl md:text-8xl font-bold uppercase tracking-wider font-heading z-10 select-none">
          {article.type}
        </span>
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/20 text-white backdrop-blur-md text-sm font-medium rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {article.status}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {article.type}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 leading-[1.2]">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 pt-2 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-700">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span>{article.views} tayangan</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <span>Kesehatan, Edukasi</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="pt-2">
        <article 
          className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5 prose-li:text-gray-700 prose-li:mb-2 prose-a:text-teal-600 hover:prose-a:text-teal-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
