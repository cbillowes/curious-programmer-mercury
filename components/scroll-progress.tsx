'use client';

import { useState, useEffect, ReactNode } from 'react';

export function ScrollProgress({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const progress =
        scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="fixed top-18 right-4 bg-white text-gray-900 text-xs py-1 font-bold px-2 p-0 rounded-md shadow-lg border border-gray-200 z-50">
        {Math.round(scrollProgress)}%
      </div>
      {children}
    </div>
  );
}
