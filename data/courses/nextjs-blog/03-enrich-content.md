---
title: Enrich your content
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  Enrich your Content Collections metadata with additional metadata fields.
  In this chapter, you will learn how to generate a slug, and configure next & previous navigation, reading time, and a hero image.
---

If you want to generate your slug, add back and forth navigation, reading time, or any other metadata to your articles, you can [transform](https://www.content-collections.dev/docs/transform) your content directly from your schema.

In this chapter, you're going to do the following:

- Generate the slug
- Add next & previous navigation
- Add reading time
- Add the hero image

## Generate the slug

```ts:title=content-collections.ts
function slugify(filePath: string, title: string) {
  // The posts are titled like `2025-11-30-my-first-post.md`
  // You may want to create a slug like `/blog/2025/11/30/my-first-post`
  // You can start by splitting the filePath and extracting the year, month, and day
  const [year, month, day] = filePath.split('-');
  // You can then lower the title, replace special characters with dashes, and trim dashes from the start and end
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `/blog/${year}/${month}/${day}/${slug}`;
}

const posts = defineCollection({
  ...
  transform: async (doc, { collection }) => {
    return {
      ...doc,
      slug: slugify(doc._meta.filePath, doc.title),
    };
  },
  ...
});
```

## Add next & previous navigation

```ts:title=content-collections.ts
const posts = defineCollection({
  ...
  transform: async (doc, { collection }) => {
    const docs = await collection.documents();
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);
    const prev = idx > 0 ? docs[idx - 1] : null;
    const next = idx < docs.length - 1 ? docs[idx + 1] : null;
    return {
      ...doc,
      prev: prev ? { ...prev, slug: slugify(prev._meta.filePath, prev.title) } : null,
      next: next ? { ...next, slug: slugify(next._meta.filePath, next.title) } : null,
    };
  },
  ...
});
```

## Add reading time

You can use the `reading-time` [package](https://www.npmjs.com/package/reading-time) to calculate the estimated reading time for your articles.

```bash
npm i reading-time
```

```ts:title=content-collections.ts
import readingTime from 'reading-time';

const posts = defineCollection({
  ...
  transform: async (doc, { collection }) => {
    return {
      ...doc,
      timeToRead: readingTime(doc.content).text,
    };
  },
  ...
});
```

## Add the hero image

Place your images in the `./public` folder and reference the image name in your yaml frontmatter.
Then you can transform your hero image path to a URL.

> In the below example, I've created a `hero` directory in the `./public` folder and placed all my hero images there.

```ts:title=content-collections.ts
const posts = defineCollection({
  ...
  transform: async (doc, { collection }) => {
    return {
      ...doc,
      // All hero images are placed in the ./public/hero folder and referenced by the hero image name.
      // You can fallback to an existing known image if the hero is not available.
      hero: doc.hero ? `/hero/${doc.hero}` : `/hero/fallback.jpg`,
    };
  },
  ...
});
```

## Conclusion

You have successfully enriched your content with additional fields like slug, next & previous navigation, reading time, and a hero image.

In the next chapter, you will learn now to create the necessary pages to view your content.
