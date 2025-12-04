---
title: Using your Neon database
parent: /courses/nextjs-blog
date: 2025-12-01
abstract:
  In this chapter, you will learn how to use your Neon database to get, set and remove likes on your blog.
---

Now that Neon is set up, and you have Stack Auth authentication is enabled with access to a userId, you can start using your database to implement likes.

In this chapter, you're going to do the following:

- Set up the likes db API
- Create a client Post listing component
- Use the Posts component
- Use the Netlify Dev server
- Implement a spinner
- Create a single post preview component
- Use the post preview component
- Render post listings in your blog page
- Ensure that unauthenticated users are handled gracefully
- Show the liked posts in the zone

## Set up the likes db API

Create a new file at `db/likes.ts` to control the likes feature, and add the following code:

```ts:title=db/likes.ts
'use server';

import { db } from '@/db';
import { likes } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function like(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db.insert(likes).values({
    slug,
    userId: user.id,
  });
}

export async function allLikes() {
  const user = await stackServerApp.getUser();
  if (!user) return [];
  return db
    .select()
    .from(likes)
    .where(eq(likes.userId, user.id))
    .orderBy(desc(likes.slug));
}

export async function unlike(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db
    .delete(likes)
    .where(and(eq(likes.userId, user.id), eq(likes.slug, slug)));
}
```

- Your `db` will use Drizzle ORM to interact with your Neon database.
- The `like` function inserts a new like into the `likes` table for the authenticated user and the specified blog post slug.
- The `allLikes` function retrieves all likes for the authenticated user, ordered by slug in descending order.
- The `unlike` function deletes a like from the `likes` table for the authenticated user and the specified blog post slug.

> You could add a date column to the `likes` table to track when a post was liked (so you can order better).

## Create a client Post listing component

Create a Posts component to display the posts with like and unlike buttons.

```ts:title=app/components/posts.tsx
'use client';

import { allPosts } from 'content-collections';
import Image from 'next/image';

export function Posts() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allPosts.map((post) => (
        <li
          key={post.slug}
          className="border-10 border-gray-700 rounded-lg overflow-hidden shadow-lg"
        >
          <a href={post.slug}>
            <Image src={post.hero} alt={post.title} width={600} height={400} />
            <div className="p-4">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p>
                {post.timeToRead} &middot; {post.date}
              </p>
              <p>{post.summary}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
```

## Use the Posts component

You can now use the `Posts` component in your home page or any other page to display the list of blog posts.

```tsx:title=app/blog/page.tsx
import { Posts } from '@/components/posts';

export default function BlogPage() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">Welcome to the Blog</h1>
      <Posts />
    </main>
  );
}
```

## Use the Netlify Dev server

In order to use your Neon database, you are going to have to run your application with the `netlify` CLI command.
This is where your Netlify database environment variables will be picked up from.
Quit your current development server and run:

```bash
npx netlify dev
```

You can configure your `netlify.toml` to use a different port if `3000` is already taken.
The Netlify Dev server will proxy requests to your Next.js development server.

```toml:title=netlify.toml
[dev]
command = "npm run dev" # or your specific dev command
targetPort = 3000       # the port your dev server runs on
port = 8888             # the port Netlify Dev will proxy to
publish = "dist"        # or your build output directory
```

Navigate to <http://localhost:8888> (or the port you configured) to see your website.

## Implement a spinner

Implement a spinner component to show while loading data:

```tsx:title=components/spinner.tsx
export function Spinner() {
  return (
    <div className="rounded-full">
      <svg
        className="text-pink-300 animate-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-900"
        ></path>
      </svg>
    </div>
  );
}
```

## Create a single post preview component

Create a single post component to display an individual post in the listing with like and unlike buttons:

```tsx:title=components/post.tsx
import { useState } from 'react';
import Image from 'next/image';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { Spinner } from '@/components/spinner';

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
  const [busy, setBusy] = useState(false);

  const handleLike = async (slug: string) => {
    setBusy(true);
    await like(slug);
    setBusy(false);
  };

  const handleUnlike = async (slug: string) => {
    setBusy(true);
    await unlike(slug);
    setBusy(false);
  };

  return (
    <li
      key={slug}
      className="border-10 border-gray-700 rounded-lg overflow-hidden shadow-lg"
    >
      <a href={slug}>
        <Image src={hero} alt={title} width={600} height={400} />
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p>
            {timeToRead} &middot; {date}
          </p>
          <p>{summary}</p>
        </div>
      </a>
      <div className="p-4">
        {busy && <Spinner />}
        {!busy && (
          <div>
            {liked ? (
              <BiSolidHeart
                className="cursor-pointer"
                onClick={() => {
                  handleUnlike(slug);
                }}
              />
            ) : (
              <BiHeart
                className="cursor-pointer"
                onClick={() => {
                  handleLike(slug);
                }}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
```

## Use the post preview component

Update your Posts component to use the new Post component. The likes need to be passed down by a server component:

```tsx:title=app/components/posts.tsx
'use client';

import { allPosts } from 'content-collections';
import { Post } from '@/components/post';

export function Posts({ likes }: { likes: { slug: string }[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allPosts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </ul>
  );
}
```

## Render post listings in your blog page

Update your BlogPage to fetch the likes from the database and pass them to the Posts component:

```tsx:title=app/blog/page.tsx
import { Posts } from '@/components/posts';
import { allLikes } from '@/db/likes';

export default async function BlogPage() {
  const likes = await allLikes();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">Welcome to the Blog</h1>
      <Posts likes={likes} />
    </main>
  );
}
```

## Fix unauthenticated user issue

You have a problem now. When a user is unauthenticated, an error is thrown and the spinner spins indefinitely.
Let's fix that.
Update your Post component to handle unauthenticated users gracefully:

```tsx:title=components/post.tsx
import { useState } from 'react';
import Image from 'next/image';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { Spinner } from '@/components/spinner';
import { useUser } from '@stackframe/stack';

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
  // Add the user hook to determine if the user is authenticated or not
  const user = useUser();
  const [busy, setBusy] = useState(false);

  // Add a handler to handle errors gracefully.
  // This handler will set the error message state which can be displayed to the user.
  // Be careful of the error messages you expose to the user.
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  };

  // Bundle the click event in one to avoid duplication of code
  const handleClick = async (liked: boolean, slug: string) => {
    // Include a try-catch block to catch errors from the like function
    // Always set busy to false in the finally block to avoid an infinite spinner
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
    <li
      key={slug}
      className="border-10 border-gray-700 rounded-lg overflow-hidden shadow-lg"
    >
      <a href={slug}>
        <Image src={hero} alt={title} width={600} height={400} />
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p>
            {timeToRead} &middot; {date}
          </p>
          <p>{summary}</p>
        </div>
      </a>
      {/* Let the user know they need to log in */}
      {!user && (
        <div className="p-4 text-gray-500 flex items-center gap-2">
          <BiSolidHeart
            className="cursor-pointer"
            onClick={() => {
              window.location.href = '/handler/login';
            }}
          />
          Log in to like this post
        </div>
      )}
      {/* Show like and unlike buttons only when authenticated */}
      {user && (
        <div className="p-4">
          {busy && <Spinner />}
          {!busy && (
            <div>
              {liked ? (
                <BiSolidHeart
                  className="cursor-pointer"
                  onClick={() => {
                    // Use new handler
                    handleClick(true, slug);
                  }}
                />
              ) : (
                <BiHeart
                  className="cursor-pointer"
                  onClick={() => {
                    // Use new handler
                    handleClick(false, slug);
                  }}
                />
              )}
            </div>
          )}
          {/* Render an error message when something goes wrong */}
          {errorMessage && (
            <div className="text-red-400 font-bold">{errorMessage}</div>
          )}
        </div>
      )}
    </li>
  );
}
```

## Show the liked posts in the zone

You now want to show the liked posts on the users dashboard in their zone.
The Posts component can be reused with minor modifications.
Let's start by passing the posts to the Posts component instead of fetching them there.

The first adjustment is to create a `Like` type in the schema.

```ts:title=db/schema.ts
export type Like = {
  id: number;
  userId: string;
  slug: string;
};
```

Update your Posts component to accept posts as a prop:

```tsx:title=app/components/posts.tsx
'use client';

import { Post as PostType } from '@/.content-collections/generated';
import { Post } from '@/components/post';
import { Like } from '@/db/schema';

export function Posts({ posts, likes }: { posts: PostType[]; likes: Like[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <Post
          {...post}
          key={post.slug}
          liked={!!likes.find((l) => l.slug === post.slug)}
        />
      ))}
    </ul>
  );
}
```

Go to your Blog Page to pass in the posts:

```tsx:title=app/blog/page.tsx
import { allPosts } from '@/.content-collections/generated';
import { Posts } from '@/components/posts';
import { allLikes } from '@/db/likes';

export default async function BlogPage() {
  const likes = await allLikes();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to the Blog
      </h1>
      <Posts posts={allPosts} likes={likes} />
    </main>
  );
}
```

Update your Zone Page to use the Posts component with only the liked posts:

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
      <Posts posts={likedPosts} likes={likes} />
    </main>
  );
}
```

## Conclusion

In this chapter, you have learned how to get, set and remove likes on your blog posts using your Neon database.
You've set up the UI, handled unauthenticated users gracefully, and displayed liked posts in the user's zone.

In the next chapter, you will learn how to make your blog look really good with Flowbite UI components.
