'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});

export function ProgressBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();

    // Start progress on link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const currentUrl = window.location.href;

      if (href !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick as EventListener);
      });
    };

    // Initial setup
    handleMutation();

    // Watch for new links being added
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}
