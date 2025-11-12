'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import * as emoji from 'node-emoji';
import { GifPlayer, parseAst } from '@/components/gif-player';
import { Tooltip, useThemeMode } from 'flowbite-react';
import { CodeBlock } from './code-block';
import { Check, Heading, Link } from 'lucide-react';
import { ReactNode, useState } from 'react';

function YouTubeEmbed({ url }: { url: string }) {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="relative w-full pb-[56.25%] my-4">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function getHeadingId(children: string | ReactNode) {
  return typeof children === 'string'
    ? children.replace(/\s+/g, '-').toLowerCase()
    : '';
}

function HeadingLink({
  id,
  children,
}: {
  id: string;
  children: string | ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href.split('#')[0];
    await navigator.clipboard.writeText(`${url}#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-start gap-4">
      <button
        onClick={handleCopy}
        className="text-black! dark:text-white! cursor-pointer"
        aria-label={copied ? 'Link copied!' : 'Copy link to heading'}
      >
        <Tooltip content={copied ? 'Link copied!' : 'Copy link to heading'}>
          <Link className="opacity-50 size-4 mb-4 cursor-pointer hover:opacity-100" />
        </Tooltip>
      </button>
      <a id={id}></a>
      {children}
    </div>
  );
}

export function Markdown({ content }: { content: string }) {
  const processedContent = emoji.emojify(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h2: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <HeadingLink id={id}>
              <h2>{children}</h2>
            </HeadingLink>
          );
        },
        h3: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <HeadingLink id={id}>
              <h3>{children}</h3>
            </HeadingLink>
          );
        },
        p: ({ ...props }) => <p className="mb-4 leading-7" {...props} />,
        a: ({ ...props }) => (
          <a className="text-primary hover:underline" {...props} />
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        img: ({ src, alt }: any) => {
          const imageUrl = src.startsWith('http')
            ? src
            : src.replace('./', '/articles/');
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="max-w-full rounded-lg my-4 mx-auto"
              alt={alt ?? ''}
              src={imageUrl}
            />
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ inline, className, children }: any) => {
          if (typeof children === 'string') {
            if (children.startsWith('youtube:')) {
              return (
                <YouTubeEmbed url={children.replace('youtube:', '').trim()} />
              );
            }
            if (children.startsWith('gif:')) {
              const ast = parseAst(children);
              if (!ast) return null;
              return (
                <GifPlayer
                  src={ast.filename}
                  still={ast.filename.replace('.gif', '-still.png')}
                  alt={ast.caption}
                />
              );
            }
          }
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          return !inline && language ? (
            <div className="mb-4">
              <CodeBlock language={language}>
                {String(children).replace(/\n$/, '')}
              </CodeBlock>
            </div>
          ) : (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
              {children}
            </code>
          );
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
