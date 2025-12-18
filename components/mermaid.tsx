'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';
import { useThemeMode } from 'flowbite-react';

export function Mermaid({ content }: { content: string }) {
  const { mode } = useThemeMode();

  useEffect(() => {
    mermaid.initialize({
      darkMode: mode === 'dark',
      securityLevel: 'strict',
      startOnLoad: true,
      theme: 'forest',
      look: 'classic',
      fontFamily: 'Open Sans, sans-serif',
      wrap: false,
      flowchart: {
        titleTopMargin: 0,
        subGraphTitleMargin: {
          top: 5,
          bottom: 20,
        },
        nodeSpacing: 10,
        rankSpacing: 10,
        defaultRenderer: 'dagre-wrapper',
        curve: 'stepAfter',
        inheritDir: true,
      },
    });
    mermaid.contentLoaded(); // Re-scans for new mermaid tags
  }, [mode]);

  return <pre className="mermaid">{content}</pre>;
}
