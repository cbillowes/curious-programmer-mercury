---
title: Asynchronous likes with Next.js API routes
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to asynchronously like and unlike components using Next.js API routes.
---

The page currently refreshes after you have liked a post. :confused:
This is because you are connecting to the like db directly from the client side.
To improve the user experience, you can leverage the Next.js API routes to handle the like functionality on the server side.

In this chapter, you're going to do the following:

- Create the API routes
- Update the single post component
- Update the posts (listing) component
- Update the zone page

## Create the API route

Create a new API route with two verbs: one for liking a post (`POST`) and another for unliking a post (`DELETE`).

Your API route is are accessible via `/api/like` and follows the REST principles (`GET`, `POST`, `PATCH`, and `DELETE`).

```tsx:title=app/api/like/route.ts
import { like, unlike } from '@/db/likes';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await like(slug);
    return NextResponse.json({
      message: 'Liked',
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
    });
  }
}

export async function DELETE(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await unlike(slug);
    return NextResponse.json({
      message: 'Unliked',
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
    });
  }
}
```

## Update the single post component

You need to use the fetch API to call the endpoint when the user clicks the action button.
This will give you a smoother user experience without page refreshes once it's configured in the post listing component.

You can leverage the `liked` prop to set the initial state of the like button and set that state when the button is clicked.

You're also adding, a somewhat useless, toast notification. It is obviously more useful when there is an error. :smile:

```tsx:title=app/components/post.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { Tooltip, Spinner, Card, Toast, ToastToggle } from 'flowbite-react';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { HiCheck } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';

export function Post({
  slug,
  hero,
  title,
  timeToRead,
  date,
  summary,
  liked,
  onUnlike,
}: {
  slug: string;
  hero: string;
  title: string;
  timeToRead: string;
  date: string;
  summary: string;
  liked: boolean;
  onUnlike?: (slug: string) => void;
}) {
  const user = useUser();
  const [isLiked, setIsLiked] = useState(liked);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    isError: false,
  });

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setToast({ show: true, message: error.message, isError: true });
    }
  };

  const handleAction = async (method: string, slug: string) => {
    try {
      const response = await fetch('/api/like', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message || 'Something went wrong');
      }
      setToast({ show: true, message, isError: false });
    } catch (error) {
      throw error;
    }
  };

  const like = (slug: string) => handleAction('POST', slug);
  const unlike = (slug: string) => handleAction('DELETE', slug);

  const handleClick = async (liked: boolean, slug: string) => {
    try {
      setBusy(true);
      if (liked) {
        await unlike(slug);
        setIsLiked(false);
        onUnlike?.(slug);
      } else {
        await like(slug);
        setIsLiked(true);
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
                {isLiked ? (
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
      {toast.show && (
        <Toast className="absolute bottom-2 right-2">
          {!toast.isError && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          )}
          {toast.isError && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          )}
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <ToastToggle />
        </Toast>
      )}
    </Card>
  );
}
```

## Update the posts (listing) component

You are going to pass in the posts and store that in state so that you can filter out the unliked posts when the `filterOnChange` prop is set to true.

```tsx:title=app/components/posts.tsx
'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';
import { useState } from 'react';

export function Posts({
  posts,
  likes,
  filterOnChange,
}: {
  posts: PostType[];
  likes: Like[];
  filterOnChange?: boolean;
}) {
  const [data, setData] = useState(posts);

  const onUnlike = (slug: string) => {
    if (!filterOnChange) return;
    setData((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-2">
      {data.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
          onUnlike={onUnlike}
        />
      ))}
    </div>
  );
}
```

## Update the zone page

You need to add the `filterOnChange` prop to the Posts component in the zone page so that it filters out the likes that have been removed.

```tsx:title=app/zone/page.tsx
import { allPosts } from '@/.content-collections/generated';
import { Posts } from '@/components/posts';
import { allLikes } from '@/db/likes';

export default async function ZonePage() {
  const likes = await allLikes();
  const likedPosts = allPosts.filter((post) =>
    likes.find((like) => like.slug === post.slug),
  );

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to the Blog
      </h1>
      <Posts posts={likedPosts} likes={likes} filterOnChange />
    </main>
  );
}
```

## Conclusion

You have successfully implemented asynchronous like and unlike functionality using Next.js API routes.
This improves the user experience by eliminating page refreshes when interacting with the like button.

In the next chapter, you will learn how to create a sitemap for your blog to improve SEO and help search engines crawl your site more effectively.
