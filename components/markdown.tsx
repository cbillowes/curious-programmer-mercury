'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import * as emoji from 'node-emoji';
import { GifPlayer, parseAst } from '@/components/gif-player';

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

export function Markdown({ content }: { content: string }) {
  const processedContent = emoji.emojify(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />
        ),
        p: ({ ...props }) => <p className="mb-4 leading-7" {...props} />,
        a: ({ ...props }) => (
          <a className="text-primary hover:underline" {...props} />
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        img: ({ src, ...props }: any) => {
          const imageUrl = src.startsWith('http')
            ? src
            : src.replace('./', '/articles/');
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="max-w-full rounded-lg my-4 mx-auto"
              alt={props.alt || ''}
              src={imageUrl}
              {...props}
            />
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ inline, children, ...props }: any) => {
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
          return inline ? (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          ) : (
            <code
              className="block bg-muted p-4 rounded-lg my-4 overflow-x-auto"
              {...props}
            >
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
