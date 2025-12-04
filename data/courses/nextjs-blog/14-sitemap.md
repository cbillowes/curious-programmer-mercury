---
title: Create a sitemap
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to create a sitemap for your blog to improve SEO and help search engines crawl your site more effectively.
---

Expose a `sitemap.xml` file to your Next.js blog to help search engines discover your pages more efficiently.

In this chapter, you're going to do the following:

- Create an environment variable to store the base URL of your site.
- Create a function to generate the sitemap XML.
- Preview the sitemap with a Chrome extension.

## Environment variable

```text:title=.env.local
# Make sure you add this to your .env.production file with the correct configuration
# Create this variable on Netlify if it is not there after you deploy
NEXT_PUBLIC_SITE_URL=http://localhost:8888
```

## Sitemap generation

The below code generates a `sitemap.xml` file for your blog.
It iterates over all your blog posts and creates entries for each post, including the homepage.

```ts:title=app/sitemap.ts
import type { MetadataRoute } from 'next';
import { allPosts } from 'content-collections';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

// Ensures the URL is always an absolute URL
function getImageUrl(image: string | undefined) {
  if (!image) return undefined;
  // Determines if the image is an absolute URL or a relative path
  const url = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  // Fix breaking XML characters
  return url.replace(/&/g, '&amp;');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: MetadataRoute.Sitemap = allPosts.map(({ slug, date, hero }) => ({
    url: `${SITE_URL}${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'yearly' as const, // You can adjust as needed
    priority: 0.7, // You can adjust as needed
    images: [getImageUrl(hero)].filter(Boolean) as string[],
  }));

  // Used to get the last modified date of the home page
  const homePageStat = fs.statSync(path.join(process.cwd(), 'app', 'page.tsx'));
  return [
    {
      url: SITE_URL,
      lastModified: new Date(homePageStat.mtime),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...posts,
  ];
}
```

## Preview the sitemap

Navigate to <http://localhost:8888/sitemap.xml> to view your sitemap.

I'm using the [XML Reader](https://chromewebstore.google.com/detail/jfjnhbpihnjjiohhghpmhhgcakkknici) Chrome extension to render my sitemap in a human readable format.

[!Screenshot](https://lh3.googleusercontent.com/4oQjT__7zKqzNEFPfQjsmTww_6Qneb3pOFCfjYSRNMIan-ftvgbfkXI4BpPMxBT5eglvPhhOfIrOt1tzTxvIYcq-hQ=s1280-w1280-h800)

## Conclusion

You've successfully added a sitemap to your Next.js blog, enhancing its SEO and making it easier for search engines to crawl your content.

In the next chapter, you will learn how to add Algolia search to your blog.
