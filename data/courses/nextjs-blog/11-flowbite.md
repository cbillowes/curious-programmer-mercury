---
title: Style your blog with Flowbite
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to make your blog look pretty with Flowbite components.
---

[Flowbite](https://flowbite.com/) is a popular open-source library of UI components built with Tailwind CSS.
It provides pre-designed components that you can easily integrate into your Next.js blog to enhance its appearance and user experience.
Ir comes with a [React library](https://flowbite-react.com/) that makes it easy to use Flowbite components in your React and Next.js applications.

In this chapter, you're going to do the following:

- Install Flowbite and Flowbite React
- Configure Flowbite in your Next.js project
- Use Flowbite components in your blog

## Installation

Install Flowbite and Flowbite React:

```bash
npm install flowbite flowbite-react
```

Ignore the generated Flowbite React directory:

```text:.gitignore
.flowbite-react/
```

## Configure Flowbite in your Next.js project

### Set up your Next.js configuration

Update your `next.config.ts` to include Flowbite in the content paths:

```ts:title=next.config.ts
import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['flowbite-react'],
};

// withContentCollections must be the outermost plugin
// const plugins = [withFlowbiteReact, withContentCollections];
withContentCollections(nextConfig);

export default withFlowbiteReact(nextConfig);
```

### Configure your Global stylesheet

Update your Global CSS to include Flowbite styles:

```css:title=app/globals.css
@import 'tailwindcss';
@plugin "flowbite-react/plugin/tailwindcss";
@source "../.flowbite-react/class-list.json";

:root {
  --background: #eae8ec;
  --foreground: #09092f;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #09092f;
    --foreground: #eae8ec;
  }
}
```

### Create at theme

Create a theme file configuration file for Flowbite to customize the default theme:

```ts:title=flowbite-theme.ts
export const flowbiteTheme = {};
```

For more information on customizing the theme, check the [Theme documentation](https://flowbite-react.com/docs/customize/theme).

### Update your layout component

Update your layout component to include Flowbite's `Flowbite` provider:

```tsx:title=app/layout.tsx
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import { flowbiteTheme } from '@/flowbite-theme';
...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    {/* Suppress hydration warning for ThemeModeScript */}
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Include the script for dark mode support */}
        <ThemeModeScript />
      </head>
      <body>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense fallback={null}>
              {/* Wrap your children in the ThemeProvider */}
              <ThemeProvider theme={flowbiteTheme}>
                <Navigation />
                {children}
              </ThemeProvider>
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
```

## Use Flowbite components in your blog

Let's refactor the post listing components using Cards from Flowbite.

```tsx:title=components/posts.tsx
'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';

export function Posts({ posts, likes }: { posts: PostType[]; likes: Like[] }) {
  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-2">
      {posts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </div>
  );
}
```

```tsx:title=components/post.tsx
'use client';

import { useState } from 'react';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { useUser } from '@stackframe/stack';
import { Tooltip, Spinner, Card } from 'flowbite-react';
import Link from 'next/link';

export function Post({
  slug,
  hero,
  title,
  timeToRead,
  date,
  summary,
  liked,
}: {
  slug: string;
  hero: string;
  title: string;
  timeToRead: string;
  date: string;
  summary: string;
  liked: boolean;
}) {
  const user = useUser();
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  };

  const handleClick = async (liked: boolean, slug: string) => {
    try {
      setBusy(true);
      if (liked) {
        await unlike(slug);
      } else {
        await like(slug);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="w-full" imgAlt={title} imgSrc={hero}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Link href={slug}>{title}</Link>
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {timeToRead} &middot; {date}
        </p>
        {summary}
      </div>
      <div>
        {!user && (
          <div className="flex items-center gap-2">
            <BiSolidHeart
              className="cursor-pointer"
              onClick={() => {
                window.location.href = '/handler/login';
              }}
            />
            Log in to like this post
          </div>
        )}
        {user && (
          <div>
            {busy && <Spinner size="sm" />}
            {!busy && (
              <div>
                {liked ? (
                  <Tooltip content="Unlike">
                    <BiSolidHeart
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        handleClick(true, slug);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip content="Like">
                    <BiHeart
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        handleClick(false, slug);
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-400 font-bold">{errorMessage}</div>
      )}
    </Card>
  );
}
```

## Conclusion

You have learned about a few components to make your blog look pretty using Flowbite UI components.

In the next chapter, you are going to learn how to add a progress bar to improve user experience when navigating between pages.
