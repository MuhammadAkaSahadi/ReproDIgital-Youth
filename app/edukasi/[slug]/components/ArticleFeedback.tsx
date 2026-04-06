"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function ArticleFeedback() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="py-8 md:py-10 border-t border-b border-gray-200 mt-12 mb-12 flex flex-col items-center justify-center text-center">
      {!feedback ? (
        <>
          <h4 className="text-[18px] md:text-[20px] font-heading font-bold text-gray-900 mb-6">
            Apakah artikel ini membantu?
          </h4>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setFeedback('up')}
              className="group w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Sangat membantu"
            >
              <ThumbsUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button 
              onClick={() => setFeedback('down')}
              className="group w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Kurang membantu"
            >
              <ThumbsDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-4 text-teal-600 transition-transform scale-110">
            {feedback === 'up' ? <ThumbsUp className="w-6 h-6 fill-current" /> : <ThumbsDown className="w-6 h-6 fill-current" />}
          </div>
          <h4 className="text-[18px] md:text-[20px] font-heading font-bold text-gray-900 mb-2">
            Terima kasih atas tanggapanmu!
          </h4>
          <p className="text-gray-600 text-[15px] max-w-md mx-auto">
            Masukanmu sangat berharga dan membantu kami menyajikan konten edukasi yang lebih baik untuk remaja lainnya.
          </p>
        </div>
      )}
    </div>
  );
}
