"use client";

import { useState } from "react";
import { Badge, useThemeMode } from "flowbite-react";
import { BiCheck, BiCopy } from "react-icons/bi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Mermaid } from "@/components/mermaid";

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

  if (language === "mermaid") {
    return <Mermaid content={children} />;
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between space-x-2 rounded-none! bg-gray-200! px-4 py-2 text-black/40 dark:bg-gray-800! dark:text-white/40">
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
      <div className="group relative my-4">
        {/* Floating copy button - only visible on hover */}
        <button
          onClick={handleCopy}
          className="bg-background/90 hover:bg-accent border-border absolute top-2 right-2 z-10 cursor-pointer rounded-md border p-2 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <BiCheck className="h-4 w-4 text-green-500" /> : <BiCopy className="h-4 w-4" />}
        </button>

        <SyntaxHighlighter
          style={mode === "dark" ? materialDark : materialLight}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
          showLineNumbers
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export function CodeInline({ language, children }: { language: string; children: string }) {
  const { mode } = useThemeMode();
  return (
    <SyntaxHighlighter
      PreTag="code"
      style={mode === "dark" ? materialDark : materialLight}
      language={language}
      customStyle={{
        padding: "0.25rem 0.5rem",
        borderRadius: "0.375rem",
        fontSize: "1rem",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
