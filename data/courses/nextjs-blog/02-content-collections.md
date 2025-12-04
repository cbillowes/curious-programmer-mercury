---
title: Create content with Content Collections
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  You can now get started with writing content in Markdown.
  In this chapter, you will learn how to set up Content Collections - a powerful content management system (CMS) for Next.js.
---

Content Collections is a powerful content management system (CMS) for Next.js.
It lets you transform your content into type-safe data collections.
No more manual data fetching and parsing.

Write your content in Markdown, configure your collections, and Content Collections will generate the content at build time
so that you can access it synchronously in your components.

In this chapter, you're going to do the following:

- Install Content Collections.
- Configure a content collection for blog posts.
- Create content files for the blog posts.
- Render the content in a Next.js component.

## Installation

To get set up quickly for Next.js:

```bash
npm i @content-collections/core @content-collections/next zod -D
```

> There are detailed [instructions](https://www.content-collections.dev/docs/quickstart/next) on their website.

Adjust your `tsconfig.json` to require a path alias for the generated files.
This is necessary because you will generate the files in the `.content-collections/generated` folder and import it from `content-collections`:

```json
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": ["./*"],
      "content-collections": ["./.content-collections/generated"]
    }
  }
}
```

Modify your `next.config.js` to include the Content Collections plugin.
This will add content collections to the build of your Next.js app.

```js
import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  /* config options here */
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
```

Create the new `.content-collections` directory.

```bash
mkdir .content-collections
```

Add it to your project's `.gitignore` file. The files are always regenerated and can be safely ignored by Git.

```text:title=.gitignore
.content-collections/
```

## Configuration

Create a `content-collections.ts` file at the root of your project.
This file will define the schema of your blog posts in the directory of your choice.
The below example will include all `**/*.md` files from the `./data/posts` folder.

```ts:title=/content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'data/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    hero: z.string().optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [posts],
});
```

You are not restricted to one type of collection.
You can add more by defining them and referencing the definition in the `defineConfig` export.

## Create content

Create your first blog post in the `data/posts` folder.
There is no limit to the number of content files you can create.
They are validated against the schema that you have defined above.
If the files are valid, they will be automatically added to the collection.

```md:title=/data/posts/2025-11-30-first-post.md
---
title: My first blog post
date: 2025-11-30
summary: This is the summary of my first blog post.
tags:
  - introduction
  - getting started
---

Welcome to my first blog post using Content Collections in Next.js!
```

> Name your posts in such a way that it is easy to sort and identify what is the latest.
> My convention is to use the `YYYY-MM-DD-short-title.md` format.
> If you have multiple posts in a day, you can add a numbering suffix to the date like `YYYY-MM-DD-01-short-title.md`.

## Render your content

To access your posts, you will import them as follows:

```ts:title=app/blog/page.tsx
import { allPosts } from "content-collections";

export default function Posts() {
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post._meta.path}>
          <a href={`/posts/${post._meta.path}`}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
```

> If the `content-collections` import path is not found during development time (warning in your IDE or editor),
> make sure you have run started your Next.js development server (example `npm run dev`).

## Conclusion

You have successfully set up Content Collections in your Next.js project.
You have created a content collection for blog posts, added your first post, and learned how to render the list of posts in a Next.js page.

In the next chapter, you will learn how to enrich your content metadata with additional fields like slug, next & previous navigation, reading time, and hero image.
