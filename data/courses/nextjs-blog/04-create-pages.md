---
title: Create your post pages
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  In this chapter, you will learn how to create the necessary pages to view your blog listing and posts.
---

You are now ready to render all your posts on a listing page, and create the ability to view each one.

In this chapter, you're going to do the following:

- Create a listing page
- Create a post page
- Render the post content
- Configure SEO metadata for your posts

## Create a listing page

Create a new page at `app/blog/page.tsx`.

Start by importing the following:

```tsx:title=app/blog/page.tsx
// Used to get all your posts
import { allPosts } from 'content-collections';
// Used for your hero image
import Image from 'next/image';
```

Create your blog listing page by iterating over all your posts `allPosts` and rendering their metadata.

```tsx:title=app/blog/page.tsx
// Used to get all your posts
import { allPosts } from 'content-collections';
// Used for your hero image
import Image from 'next/image';

export default function BlogPage() {
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

## Create a post page

Create a new page at `[year]/[month]/[day]/[slug]/page.tsx`.
Start by importing the following:

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
// Used to get all your posts and the schema used to type them
import { allPosts, Post } from 'content-collections';
// Used for your hero image
import Image from 'next/image';
```

You will need to extract the parameters from the URL to find the correct post to render.

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
export default async function BlogPostPage({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string };
}) {
  // The path of the resource to be loaded would look like: /blog/2025/11/30/my-first-post
  // As you are in the blog folder in the app directory, you just need to extract the remaining parameters
  // (Everything after a forward slash becomes a parameter)
  const { year, month, day, slug } = await params;
}
```

Now you can load a post from your content collection by matching the `slug` field you created earlier.

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
...
  const isMatch = (post: Post) =>
    post.slug.endsWith(`${year}/${month}/${day}/${slug}`);

  const post = allPosts.find(isMatch);
...
```

If a match cannot be found, then you can return a simple message,
or redirect to `notFound`.

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
...
  if (!post) {
    return <div>The post cannot be found.</div>;
  }
...
```

## Render the post content

Finally, you can render the post content along with its metadata.

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
...
  return (
    <div>
      <Image
        src={post.hero}
        width={1024}
        height={800}
        alt="Hero image"
        className="object-cover w-full h-128 mb-4"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-7xl font-bold">{post.title}</h1>
        <p className="text-center text-gray-500 mb-8">
          {post.date} &middot; {post.timeToRead}
        </p>
        <div className="prose prose-lg mx-auto">
          <p>{post.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  )
...
```

> Using `dangerouslySetInnerHTML` is not going to be the final approach to rendering content.
> You will explore another method in the next chapter.

A full example of the post page is available below:

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
import { allPosts, Post } from 'content-collections';
import Image from 'next/image';

export default async function BlogPostPage({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string };
}) {
  const { year, month, day, slug } = await params;

  const isMatch = (post: Post) =>
    post.slug.endsWith(`${year}/${month}/${day}/${slug}`);

  const post = allPosts.find(isMatch);
  if (!post) {
    return <div>The post cannot be found.</div>;
  }
  return (
    <div>
      <Image
        src={post.hero}
        width={1024}
        height={800}
        // It's a good idea to add a property in your frontmatter for alt text,
        // and then reference it here.
        // If you are using external links, be sure to configure them in next.config.js
        // under images > remotePatterns.
        alt="Hero image"
        className="object-cover w-full h-128 mb-4"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-7xl font-bold">{post.title}</h1>
        <p className="text-center text-gray-500 mb-8">
          {post.date} &middot; {post.timeToRead}
        </p>
        <div className="prose prose-lg mx-auto">
          <p>{post.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
```

## Configure SEO metadata for your posts

```tsx:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
import { Markdown } from '@/components/markdown';
import { allPosts, Post } from 'content-collections';
import Image from 'next/image';

// You could extract all your env vars into a config file to reference as a statically typed solution
// as opposed to using process.env directly.
const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

type Props = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};

async function isPostMatch(props: Props) {
  const { year, month, day, slug } = await props.params;
  return (post: Post) => post.slug.endsWith(`/${year}/${month}/${day}/${slug}`);
}

export async function generateMetadata({ params }: Props) {
  const post = allPosts.find(await isPostMatch({ params }));
  if (!post) return;

  const canonicalUrl = `${SITE_URL}/${post.slug}`;
  const imageUrl = `${SITE_URL}/${post.hero}`;
  return {
    title: post.title,
    authors: [{ name: 'Clarice Bouwer' }],
    description: `${post.summary.substring(0, 140)}${
      post.summary.length > 140 ? '...' : ''
    }`,
    imageUrl,
    url: canonicalUrl,
    type: 'article',
    openGraph: {
      siteName: 'My Next.js Blog',
      title: post.title,
      description: post.summary,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          // You could create a preprocessor to convert all your images to png for your og:image
          // https://github.com/cbillowes/curious-programmer-mercury/blob/main/scripts/process-webp.js
          type: 'image/png',
        },
      ],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = allPosts.find(await isPostMatch({ params }));
  if (!post) {
    return <div>The post cannot be found.</div>;
  }
  return (
    <div>
      <Image
        src={post.hero}
        width={1024}
        height={800}
        alt="Hero image"
        className="object-cover w-full h-128 mb-4"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-7xl font-bold">{post.title}</h1>
        <p className="text-center text-gray-500 mb-8">
          {post.date} &middot; {post.timeToRead}
        </p>
        <div className="prose prose-lg mx-auto">
          <p>{post.summary}</p>
          <Markdown id="post" content={post.content} />
        </div>
      </div>
    </div>
  );
}
```

## Conclusion

You have successfully created a blog listing page, and an individual post page to render your content.

In the next chapter, you will learn how to render and style the actual Markdown content correctly using a dedicated Markdown component.
