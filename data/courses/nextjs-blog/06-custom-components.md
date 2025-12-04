---
title: Add rich custom components in your Markdown
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  In this chapter, you will learn how to create rich custom components that you can embed directly from your Markdown files to make your pages more engaging.
---

Let's say you want to add emojis, custom alerts, render tags as badges, add callouts, or even embed interactive components directly in your blog posts in pure Markdown.

In this chapter, you're going to do the following:

- Add slack-inspired emojis
- Add headings with anchor links
- Create alert components
- Embed YouTube videos
- Look at other ideas for custom components

## Getting started

You are going to override components in ReactMarkdown.
You do so by extending components in your `Markdown` component.

```tsx:title=components/markdown.tsx
export function Markdown({ content }: { content: string }) {
  const processedContent = emoji.emojify(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // extend your components here
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
```

## Slack-inspired emojis

Install the package:

```bash
npm install node-emoji
```

Import the package in your Markdown component:

```tsx:title=components/markdown.tsx
import * as emoji from 'node-emoji';
```

Process your content in your Markdown component by extracting the references below:

```tsx:title=components/markdown.tsx
export function Markdown({ id, content }: { id: string; content: string }) {
  // Process your content with the emojis
  const processedContent = emoji.emojify(content);
  return (
    <ReactMarkdown>
      {/* Use the processed content instead */}
      {processedContent}
    </ReactMarkdown>
  )
}
```

For more information on this package, check out their [repository](https://github.com/omnidan/node-emoji) on GitHub.

## Headings with anchor links

You can create a custom `Heading` component that adds anchor links to your headings.
I'm sure there is a plugin for this, but it's so simple that you can create your own.

Install an icons package. Let's use `react-icons`:

```bash
npm install react-icons
```

Create a `HeadingLink` component:

```tsx:title=components/heading-link.tsx
import { ReactNode } from 'react';
import { BiLink } from 'react-icons/bi';

export function HeadingLink({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`#${id}`}
        className="ml-2 text-white"
        aria-label="Link to heading"
      >
        <BiLink className="text-white size-4" />
      </a>
      {children}
    </div>
  );
}

```

Add a heading in your markdown file like this:

```md:title=data/example.md
## My heading
```

Extend your `h2` component in your `Markdown` component to use the `HeadingLink` component:

```tsx:title=components/markdown.tsx
export function Markdown({ id, content }: { id: string; content: string }) {
  function getHeadingId(children: string | ReactNode) {
    return typeof children === 'string'
      ? children.replace(/\s+/g, '-').toLowerCase()
      : '';
  }

  return (
    <div id={id}>
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

## Add an alert component

For example, you can create a custom `Alert` component and use it in your Markdown files like this:

```tsx:title=components/alert.tsx
import { BiError, BiInfoCircle } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';

export function Alert({ type, message }: { type: string; message: string }) {
  let bgColor = '';
  let textColor = '';
  let badge = <></>;

  switch (type) {
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      badge = <BiInfoCircle className="inline mr-2" />;
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      badge = <CiWarning className="inline mr-2" />;
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      badge = <BiError className="inline mr-2" />;
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <div
      className={`flex items-center p-4 rounded-md ${bgColor} ${textColor} my-4`}
    >
      {badge}
      {message}
    </div>
  );
}

```

Register an alert in your markdown as using the `alert` protocol:

```md:title=data/example.md
`alert:type=info:Message here`
```

Configure your markdown component to render the alert:

```tsx:title=components/markdown.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { HeadingLink } from './heading-link';
import { ReactNode } from 'react';
import { Alert } from './alert';

export function Markdown({ id, content }: { id: string; content: string }) {
  function getHeadingId(children: string | ReactNode) {
    return typeof children === 'string'
      ? children.replace(/\s+/g, '-').toLowerCase()
      : '';
  }

  return (
    <div id={id}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ children }: any) => {
            if (typeof children === 'string') {
              if (children.startsWith('alert:')) {
                const alert = children.replace('alert:', '').trim();
                const type = alert.split(':')[0].split('=')[1];
                const message = alert.split(':').slice(1).join(':').trim();
                return <Alert type={type} message={message} />;
              }
            }
            return <code>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

`alert:type=success:Example of a success alert`
`alert:type=info:Example of an info alert`
`alert:type=warning:Example a warning alert`
`alert:type=error:Example of an error alert`
`alert:type=other:Example of a default alert`

Using the protocol approach, you can just about render any custom component directly from your Markdown files!

## Embed YouTube videos

Let's look at one more example with embedding YouTube videos.

```tsx:title=components/youtube.tsx
export function YouTubeEmbed({ url }: { url: string }) {
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
```

Register the embedded link in your markdown as using the `youtube` protocol:

```md:title=data/example.md
`youtube:https://www.youtube.com/embed/dQw4w9WgXcQ`
```

Configure your markdown component to render the YouTube embed:

```tsx:title=components/markdown.tsx
import { YouTubeEmbed } from './youtube';

export function Markdown({ id, content }: { id: string; content: string }) {
  function getHeadingId(children: string | ReactNode) {
    return typeof children === 'string'
      ? children.replace(/\s+/g, '-').toLowerCase()
      : '';
  }

  return (
    <div id={id}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ children }: any) => {
            if (typeof children === 'string') {
              if (children.startsWith('youtube:')) {
                return (
                  <YouTubeEmbed url={children.replace('youtube:', '').trim()} />
                );
              }
            }
            return <code>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

## Other ideas for custom components

For more examples and ideas, refer to the [markdown.tsx](https://github.com/cbillowes/curious-programmer-mercury/blob/main/components/markdown.tsx) file in my Curious Programmer Mercury blog repository.

I will write up tutorials on some of these ideas in the future, but for now, here are some ideas you can explore:

- Add gif embeds that play on demand
- Creating badges for things like tags, categories, or difficulty levels
- Embedding tweets or other social media posts
- Adding callout boxes for important notes or tips
- Embedding code sandboxes or interactive coding examples
- Creating collapsible sections for FAQs or additional information
- Adding image galleries or carousels
- Embedding audio players for podcasts or music tracks
- Creating progress bars or skill meters for tutorials

## Conclusion

In this chapter, you have learned how to create rich custom components that you can embed directly from your Markdown files to make your pages more engaging.

In the next chapter, you will learn how to get started with Netlify - a popular platform for deploying Next.js applications with ease.
