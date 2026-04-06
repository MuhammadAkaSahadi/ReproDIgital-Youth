"use client";

import { useEffect, useState } from "react";

export function ArticleProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      const scrollableHeight = documentHeight - windowHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrollPercent = (scrollY / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial measure
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-[64px] md:top-[80px] left-0 w-full h-[3px] bg-gray-200 z-50">
      <div 
        className="h-full bg-teal-500 transition-all duration-150 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
}
