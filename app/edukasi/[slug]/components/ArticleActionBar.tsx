"use client";

import React, { useState } from "react";
import { Link2, MessageSquare, MessageCircle, Hash, Bookmark } from "lucide-react";

export function ArticleActionBar() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="fixed sm:static bottom-[72px] inset-x-0 bg-white sm:bg-transparent border-t border-gray-200 sm:border-t sm:border-gray-200 px-4 sm:px-0 py-3 sm:py-6 z-40 sm:z-auto sm:mt-2">
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-[960px]">
        
        {/* Share Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline-block text-sm font-bold text-gray-600 mr-2 tracking-wide uppercase">
            Bagikan
          </span>
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-teal-500 hover:text-white hover:shadow-md transition-all active:scale-95" 
            aria-label="Share ke Facebook"
          >
            <Hash className="w-4 h-4" />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-teal-500 hover:text-white hover:shadow-md transition-all active:scale-95" 
            aria-label="Share ke Twitter"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-teal-500 hover:text-white hover:shadow-md transition-all active:scale-95" 
            aria-label="Share ke WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-teal-500 hover:text-white hover:shadow-md transition-all active:scale-95" 
            aria-label="Copy Link"
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bookmark Button */}
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`group flex items-center justify-center gap-2 h-10 px-4 sm:px-5 border rounded-lg transition-all font-bold text-sm active:scale-95 ${
            isBookmarked 
              ? "bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/20" 
              : "bg-white border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50"
          }`}
          aria-label={isBookmarked ? "Batalkan Simpan" : "Simpan Artikel"}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
          <span className="hidden sm:inline-block">{isBookmarked ? "Tersimpan" : "Simpan"}</span>
        </button>

      </div>
    </div>
  );
}
