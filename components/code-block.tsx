'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Badge, useThemeMode } from 'flowbite-react';
import { Mermaid } from '@/components/mermaid';
import { BiCheck, BiCopy } from 'react-icons/bi';
import {
  materialLight,
  materialDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({
  language,
  title,
  children,
}: {
  language: string;
  title?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);
  const { mode } = useThemeMode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (language === 'mermaid') {
    return <Mermaid content={children} />;
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between space-x-2 bg-gray-200! dark:bg-gray-800! rounded-none! px-4 py-2 text-black/40 dark:text-white/40">
        <div className="bg-transparent!">
          {title && (
            <div className="bg-transparent!">
              <span className="text-black/30 dark:text-white/30">File: </span>
              {title}
            </div>
          )}
        </div>
        {language && <Badge>{language}</Badge>}
      </div>
      <div className="relative group my-4">
        {/* Floating copy button - only visible on hover */}
        <button
          onClick={handleCopy}
          className="cursor-pointer absolute top-2 right-2 p-2 rounded-md bg-background/90 hover:bg-accent border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <BiCheck className="w-4 h-4 text-green-500" />
          ) : (
            <BiCopy className="w-4 h-4" />
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
      customStyle={{
        padding: '0.25rem 0.5rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
