import Link from "next/link";
import { User, Circle, Image as ImageIcon, Info } from "lucide-react";
import { ArticleActionBar } from "./components/ArticleActionBar";
import { ArticleProgressBar } from "./components/ArticleProgressBar";
import { ArticleFeedback } from "./components/ArticleFeedback";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodeSlug = slug.replace(/-/g, ' ');
  return {
    title: `${decodeSlug} | ReproDigital Youth`,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params according to Next.js 15 rules
  const { slug } = await params;
  
  // Simulated article data based on slug (For presentation purposes)
  const article = {
    title: slug === 'merancang-masa-depan' ? "Merancang Masa Depan Tanpa Tekanan" : "Memahami Perubahan Tubuh di Masa Pubertas: Panduan Lengkap",
    category: "Pubertas & Perkembangan",
    date: "12 Okt 2025",
    author: "Dr. Anita Saraswati",
    readTime: "5 min baca",
    views: "2.4k",
  };

  return (
    <>
      <ArticleProgressBar />
      <div className="flex flex-col w-full bg-white pb-32">
        {/* Container utama menggunakan layout asimetris */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1324px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[64px]">
            
            {/* Main Content Area (Max width 960px) */}
            <div className="w-full lg:max-w-[960px]">
              
              {/* Header Area (B.2) */}
              <div className="pt-8 md:pt-12 pb-8">
                
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-8 font-medium flex items-center">
                  <Link href="/" className="hover:text-teal-600 transition-colors">Beranda</Link>
                  <span className="mx-2">/</span>
                  <Link href="/edukasi" className="hover:text-teal-600 transition-colors">Edukasi</Link>
                  <span className="mx-2">/</span>
                  <span className="text-gray-400 truncate hidden sm:inline-block max-w-[200px] xl:max-w-[400px]">
                    {article.title}
                  </span>
                </div>

                {/* Tanda Kategori */}
                <span className="inline-block bg-coral-50 text-coral-600 tracking-wider uppercase text-[12px] font-bold px-4 py-2 rounded-full mb-6">
                  {article.category}
                </span>

                {/* Judul Utama */}
                <h1 className="text-[28px] md:text-[36px] lg:text-[44px] leading-tight font-heading font-bold text-gray-900 mb-6 lg:mb-8 md:pr-12">
                  {article.title}
                </h1>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[13px] md:text-[14px] text-gray-600 font-medium">
                  <div className="flex items-center gap-2 mr-2">
                    <div className="w-8 h-8 rounded-full border-2 border-teal-500 bg-teal-50 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-900 font-bold">{article.author}</span>
                  </div>
                  <Circle className="w-1.5 h-1.5 fill-gray-300 text-gray-300 hidden sm:block" />
                  <span>{article.date}</span>
                  <Circle className="w-1.5 h-1.5 fill-gray-300 text-gray-300 hidden sm:block" />
                  <span>{article.readTime}</span>
                  <Circle className="w-1.5 h-1.5 fill-gray-300 text-gray-300 hidden sm:block" />
                  <span>{article.views} views</span>
                </div>
              </div>

              {/* Action Bar (B.2) */}
              <ArticleActionBar />

              {/* Featured Image (B.3) */}
              <div className="mt-8 md:mt-10 -mx-4 sm:mx-0">
                <div className="relative w-full aspect-16/9 bg-gray-100 sm:rounded-2xl overflow-hidden flex flex-col justify-center items-center shadow-sm">
                  <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                  <span className="text-gray-400 font-medium">Ilustrasi Artikel Utama (16:9)</span>
                </div>
                <p className="text-center text-[13px] text-gray-500 italic mt-4 px-4">
                  Gambar ilustrasi menunjukkan kelompok remaja berbincang secara sehat penuh privasi (Foto: Dummy)
                </p>
              </div>

              {/* Article Content (B.4) */}
              <article className="py-10 md:py-16">
                <div className="text-[16px] leading-[28px] md:text-[18px] md:leading-[32px] text-gray-700 font-body">
                  <p className="mb-6 md:mb-8">
                    Masa pubertas sering kali menjadi periode yang membingungkan bagi banyak remaja. 
                    Tubuh yang selama ini familier rasanya tiba-tiba berubah begitu cepat. Wajar jika 
                    kamu merasa kaget, malu, atau penuh pertanyaan. Ingat, kamu tidak sendirian—setiap 
                    remaja melewati fase ini!
                  </p>

                  <h2 className="text-[26px] md:text-[32px] font-heading font-bold text-gray-900 mt-12 mb-6 md:mt-16 bg-white">
                    1. Perubahan Fisik yang Wajar Terjadi
                  </h2>
                  
                  <p className="mb-6 md:mb-8">
                    Perubahan fisik adalah tanda paling nyata bahwa tubuhmu sedang bersiap untuk 
                    memasuki masa dewasa. Proses ini dikendalikan oleh fluktuasi hormon di dalam tubuh.
                  </p>

                  <ul className="mb-8 space-y-4 md:space-y-5 pl-6 relative">
                    <li className="relative before:content-[''] before:absolute before:-left-6 before:top-2.5 md:before:top-3 before:w-2 before:h-2 before:bg-teal-500 before:rounded-full text-gray-700">
                      <strong className="text-gray-900 font-semibold">Pertumbuhan tinggi badan drastis (Growth Spurt)</strong>: Terjadi percepatan pertumbuhan tulang secara signifikan.
                    </li>
                    <li className="relative before:content-[''] before:absolute before:-left-6 before:top-2.5 md:before:top-3 before:w-2 before:h-2 before:bg-teal-500 before:rounded-full text-gray-700">
                      <strong className="text-gray-900 font-semibold">Tumbuhnya rambut halus</strong>: Mulai muncul di area ketiak, area kemaluan, dan sebagian pada kaki atau wajah.
                    </li>
                    <li className="relative before:content-[''] before:absolute before:-left-6 before:top-2.5 md:before:top-3 before:w-2 before:h-2 before:bg-teal-500 before:rounded-full text-gray-700">
                      <strong className="text-gray-900 font-semibold">Mulai berjerawat</strong>: Produksi minyak berlebih akibat perubahan hormon.
                    </li>
                  </ul>

                  {/* Callout Box */}
                  <div className="my-10 flex gap-4 md:gap-5 p-6 md:p-8 bg-blue-50/80 rounded-2xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-blue-900 text-[15px] md:text-[16px] leading-relaxed">
                      <strong className="font-bold block mb-1">Tips Menjaga Kebersihan</strong>
                      Jaga kebersihan tubuh dengan mandi teratur dan mencuci muka dua kali sehari 
                      menggunakan sabun pembersih yang lembut untuk mengurangi risiko masalah kulit.
                    </div>
                  </div>

                  <h3 className="text-[22px] md:text-[24px] font-heading font-bold text-gray-900 mt-10 md:mt-14 mb-5">
                    Menstruasi dan Perubahan Hormon
                  </h3>

                  <p className="mb-6 md:mb-8">
                    Bagi perempuan, tanda kedewasaan reproduksi ditandai dengan datangnya menstruasi pertama 
                    (<span className="italic">Menarche</span>). Siklus menstruasi pertama umumnya belum teratur dan itu sangat wajar.
                  </p>

                  {/* Blockquote */}
                  <blockquote className="my-12 pl-6 py-2 border-l-4 border-teal-500 italic text-gray-900 text-lg md:text-[22px] font-medium leading-relaxed bg-teal-50/20 pr-6">
                    "Kamu berhak tahu apa yang terjadi pada dirimu sendiri tanpa merasa bersalah.
                    Masa transisi ini hanyalah jembatan menuju pribadimu yang lebih dewasa dan kuat."
                  </blockquote>

                  {/* Interactive Quiz Component placeholder */}
                  <div className="my-12 p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-4 inline-block">Mini Kuis</span>
                    <h4 className="font-heading font-bold text-lg md:text-xl mb-6 text-gray-900">Menurutmu, apa yang memicu pubertas?</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 rounded-xl border border-gray-300 hover:bg-teal-50 hover:border-teal-400 transition-all focus:outline-none">A. Perubahan pola makan dan lingkungan</button>
                      <button className="w-full text-left p-4 rounded-xl border border-teal-500 bg-teal-50 text-teal-800 transition-all font-medium focus:outline-none">C. Kelenjar pituitari di otak mengirimkan sinyal hormon (Jawaban yang Anda pilih)</button>
                    </div>
                    <button className="mt-6 bg-coral-500 hover:bg-coral-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95 border-0">
                      Cek Jawaban
                    </button>
                  </div>

                </div>
              </article>

              {/* Article Footer (B.5) */}
              <div className="pb-10 pt-4 border-t border-gray-100">
                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                  {["Pubertas", "Perubahan Fisik", "Kesehatan Reproduksi", "Remaja"].map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 md:py-2 rounded-full bg-gray-100/80 text-gray-700 text-[13px] md:text-[14px] font-medium hover:bg-teal-50 hover:text-teal-700 cursor-pointer transition-all border border-transparent hover:border-teal-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Feedback Component */}
                <ArticleFeedback />

                {/* Author Bio Card */}
                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start text-center sm:text-left border border-gray-200 shadow-xs">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal-100 flex items-center justify-center shrink-0 border-4 border-white shadow-sm overflow-hidden">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[18px] md:text-[20px] font-heading font-bold text-gray-900 mb-1">
                      Dr. Anita Saraswati
                    </h4>
                    <p className="text-teal-600 font-bold text-[13px] uppercase tracking-wider mb-3">
                      Konselor & Pakar Kesehatan
                    </p>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-4 lg:pr-8">
                      Lebih dari 10 tahun mendampingi ribuan remaja Indonesia melewati pergolakan masa pubertas. Mengajar dengan prinsip empati dan menciptakan ruang yang aman tanpa penghakiman.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Area (Desktop only - B.6) */}
            <div className="hidden lg:block w-[300px] shrink-0 pt-8 md:pt-12">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex justify-center items-center h-full min-h-[600px] sticky top-[100px]">
                <p className="text-gray-400 font-medium text-center px-6">Area Sidebar Artikel (B.6)<br/>Akan Dibangun di Sini</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
