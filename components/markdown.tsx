'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import * as emoji from 'node-emoji';
import { Badge } from 'flowbite-react';
import { GifPlayer } from '@/components/gif-player';
import { HeadingLink, getHeadingId } from '@/components/heading-link';
import { CodeBlock, CodeInline } from '@/components/code-block';
import { ArticleImage } from '@/components/article-image';
import { Link } from '@/components/link';
import { Alert } from '@/components/alert';
import { cn } from '@/lib/utils';

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

function Tag({ tag }: { tag: string }) {
  return (
    <Badge className="bg-pink-600! text-pink-100! text-lg rounded-md px-4 hover:bg-blue-600!">
      {tag}
    </Badge>
  );
}

function getLanguageFromClassName(className: string | undefined) {
  if (!className) return '';
  const match = /language-(\w+)/.exec(className);
  return match ? match[1] : '';
}

function getTitleFromClassName(className: string | undefined) {
  if (!className) return '';
  const match = /:title=([\w\/\.\-\[\]]+)/.exec(className);
  return match ? match[1] : '';
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
            <HeadingLink id={id} className="mb-4">
              <h2>{children}</h2>
            </HeadingLink>
          );
        },
        h3: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <HeadingLink id={id} className="mb-4">
              <h3>{children}</h3>
            </HeadingLink>
          );
        },
        h4: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <HeadingLink id={id} className="mb-4">
              <h4>{children}</h4>
            </HeadingLink>
          );
        },
        p: ({ children }) => (
          <div className="paragraph mb-4 leading-7">{children}</div>
        ),
        a: ({ href, children }) => <Link href={href ?? ''}>{children}</Link>,
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
        table: ({ children }) => (
          <div className="max-w-sm md:max-w-3xl lg:max-w-5xl overflow-x-auto my-4">
            <table className="w-full border-collapse md:table">
              {children}
            </table>
          </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ inline, className, children }: any) => {
          if (typeof children === 'string') {
            if (children.startsWith('youtube:')) {
              return (
                <YouTubeEmbed url={children.replace('youtube:', '').trim()} />
              );
            }
            if (children.startsWith('gif:')) {
              const filename = `/articles/${children.split(':')[1]}`;
              const caption = children.split(':caption=')[1] || 'GIF animation';
              if (!filename) return null;
              return (
                <GifPlayer
                  src={filename}
                  still={filename.replace('.gif', '-still.png')}
                  alt={caption}
                />
              );
            }
            if (children.startsWith('alert:')) {
              const alert = children.replace('alert:', '').trim();
              const type = alert.split(':')[0].split('=')[1];
              const message = alert.split(':').slice(1).join(':').trim();
              return <Alert type={type} message={message} />;
            }
            if (children.startsWith('tags:')) {
              const tags = children.replace('tags:', '').trim().split(',');
              return (
                <div className="flex flex-wrap gap-2 my-4">
                  {tags.map((tag) => (
                    <Tag key={tag.trim()} tag={tag.trim()} />
                  ))}
                </div>
              );
            }
            if (children.startsWith('badge:')) {
              const attributes = children.replace('badge:', '').trim();
              const [className, text] = attributes
                .split(',')
                .map((s) => s.trim());
              return (
                <Badge
                  color={className}
                  className={cn(
                    'inline rounded-md px-2',
                    className.replace('className=', ''),
                  )}
                >
                  {text.replace('text=', '')}
                </Badge>
              );
            }
            if (children.startsWith('pronounce:')) {
              const word = children.replace('pronounce:', '').trim();
              return <CodeInline language="">{word}</CodeInline>;
            }
            if (children.startsWith('img:')) {
              return <ArticleImage attributes={children} />;
            }
          }
          const language = getLanguageFromClassName(className);
          const title = getTitleFromClassName(className);

          return !inline && language ? (
            <div className="mb-4">
              <CodeBlock language={language} title={title}>
                {String(children)
                  .replace(/\n$/, '')
                  .replace(/```.\s*$/, '```')}
              </CodeBlock>
            </div>
          ) : (
            <CodeInline language={language}>{children}</CodeInline>
          );
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
