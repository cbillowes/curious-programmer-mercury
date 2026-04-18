import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function StickyHeader({ children }: { children: ReactNode }) {
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is NOT visible, the sticky component is stuck
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: [0], rootMargin: "0px" },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <div
        ref={stickyRef}
        className={cn(
          "sticky:bg-gray-50 dark:sticky:bg-gray-900 sticky top-18 right-0 left-0 z-40 mx-auto max-w-3xl print:hidden",
          isStuck
            ? "block bg-gray-50 outline-3 outline-gray-50 dark:bg-gray-900 dark:outline-gray-900"
            : "hidden",
        )}
      >
        {children}
      </div>
    </>
  );
}
