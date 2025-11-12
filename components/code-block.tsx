'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useThemeMode } from 'flowbite-react';
import {
  materialLight,
  materialDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);
  const { mode } = useThemeMode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      {/* Floating copy button - only visible on hover */}
      <button
        onClick={handleCopy}
        className="cursor-pointer absolute top-2 right-2 p-2 rounded-md bg-background/90 hover:bg-accent border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <SyntaxHighlighter
        style={mode === 'dark' ? materialDark : materialLight}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export function CodeInline({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  const { mode } = useThemeMode();
  return (
    <SyntaxHighlighter
      PreTag="code"
      style={mode === 'dark' ? materialDark : materialLight}
      language={language}
      customStyle={{ padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '1rem' }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
