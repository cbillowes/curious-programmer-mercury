'use client';

import { useState, useEffect, ReactNode, useRef, useCallback } from 'react';

export function ScrollProgress({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const barRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user is dragging the bar, we are already driving scroll position
      // (optional, but avoids jitter on some browsers).
      if (draggingRef.current) return;

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

  const scrollToRatio = useCallback((ratio: number, smooth: boolean) => {
    const clamped = Math.max(0, Math.min(1, ratio));

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const targetScrollTop = clamped * Math.max(0, scrollableHeight);

    window.scrollTo({
      top: targetScrollTop,
      behavior: smooth ? 'smooth' : 'auto',
    });

    setScrollProgress(clamped * 100);
  }, []);

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = barRef.current;
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = rect.width > 0 ? x / rect.width : 0;

    return ratio;
  }, []);

  // Click (keep smooth scrolling)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const ratio = ratioFromClientX(e.clientX);
      if (ratio == null) return;
      scrollToRatio(ratio, true);
    },
    [ratioFromClientX, scrollToRatio],
  );

  // Drag (pointer events)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only primary button for mouse
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      draggingRef.current = true;

      // Capture pointer so we keep receiving move/up events
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

      const ratio = ratioFromClientX(e.clientX);
      if (ratio == null) return;
      scrollToRatio(ratio, false);
    },
    [ratioFromClientX, scrollToRatio],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;

      const ratio = ratioFromClientX(e.clientX);
      if (ratio == null) return;
      scrollToRatio(ratio, false);
    },
    [ratioFromClientX, scrollToRatio],
  );

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div>
      <div
        ref={barRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="fixed top-16 left-0 w-full h-2 bg-gray-200 z-50 print:hidden cursor-pointer"
        style={{ touchAction: 'none' }} // important for mobile dragging
        role="slider"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        data-tour="page-scroll"
      >
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed top-20 right-4 bg-white text-gray-900 text-xs py-1 font-bold px-2 p-0 rounded-md shadow-lg border border-gray-200 z-50 print:hidden">
        {Math.round(scrollProgress)}%
      </div>

      {children}
    </div>
  );
}
