'use client';

import { useEffect, useRef } from 'react';
import { useThemeMode } from 'flowbite-react';

export function Comments() {
  const { mode } = useThemeMode();
  const commentsRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!commentsRef.current || isInitializedRef.current) return;
    isInitializedRef.current = true;

    const currentCommentsRef = commentsRef.current;
    const theme = mode === 'dark' ? 'github-dark' : 'github-light';
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.setAttribute('repo', 'cbillowes/curious-programmer-mercury');
    scriptEl.setAttribute('issue-term', 'title');
    scriptEl.setAttribute('theme', theme);

    currentCommentsRef.appendChild(scriptEl);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (currentCommentsRef) {
        currentCommentsRef.innerHTML = '';
      }
    };
  }, [mode]);

  return <div className="mt-4" ref={commentsRef} />;
}
