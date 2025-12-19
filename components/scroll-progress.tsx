'use client';

import { useState, useEffect, ReactNode, useRef, useCallback } from 'react';

export function ScrollProgress({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      const progress =
        scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = barRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // px from left edge of bar
    const ratio = rect.width > 0 ? clickX / rect.width : 0; // 0..1

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const targetScrollTop = Math.max(
      0,
      Math.min(scrollableHeight, ratio * scrollableHeight),
    );

    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div>
      <div
        ref={barRef}
        onClick={handleBarClick}
        className="fixed top-16 left-0 w-full h-1 bg-gray-200 z-50 print:hidden cursor-pointer"
        role="slider"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed top-18 right-4 bg-white text-gray-900 text-xs py-1 font-bold px-2 p-0 rounded-md shadow-lg border border-gray-200 z-50 print:hidden">
        {Math.round(scrollProgress)}%
      </div>

      {children}
    </div>
  );
}
