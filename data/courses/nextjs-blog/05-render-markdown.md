---
title: Render Markdown in your blog pages
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  In this chapter, you will learn how to elegantly render Markdown content in your Next.js blog post pages.
---

You will notice that your Markdown content is rendered as plain text when using `dangerouslySetInnerHTML`.

In this chapter, you're going to do the following:

- Install dependencies to render Markdown
- Create a Markdown component
- Style your content

## Install dependencies

Install the following packages:

```bash
npm i react-markdown remark-gfm rehype-raw
```

- `react-markdown`: A React component for rendering Markdown content.
- `remark-gfm`: A plugin to support GitHub Flavored Markdown (GFM) features like tables, strikethroughs, and task lists.
- `rehype-raw`: A plugin to allow raw HTML within Markdown content.

## Create a Markdown component

Create a new component that will be used to wrap these dependencies and render your Markdown content.

```tsx:title=components/Markdown.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export function Markdown({ id, content }: { id: string; content: string }) {
  return (
    <div id={id}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

Use the component in your blog post content page as follows:

```diff:title=app/blog/[year]/[month]/[day]/[slug]/page.tsx
- <div dangerouslySetInnerHTML={{ __html: post.content }} />
+ <Markdown id="post" content={post.content} />
```

This will now render your Markdown content correctly.

## Styling your content

To style your Markdown content, you can target the `id` element you provided to the `Markdown` component. Example styling can include:

```css:title=app/globals.css
#post h1,
#post h2,
#post h3,
#post h4,
#post h5,
#post h6 {
  @apply font-bold mt-4 mb-2 text-white;
}
#post p {
  @apply my-2 leading-7 text-white;
}
#post a {
  @apply text-blue-600 underline;
}
#post ul {
  @apply my-4 ml-6 list-disc;
}
#post ol {
  @apply my-4 ml-6 list-decimal;
}
#post blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic text-gray-600;
}
#post pre {
  @apply bg-gray-200 p-4 rounded-md overflow-x-auto text-black;
}
#post code {
  @apply bg-gray-200 rounded px-1 text-black;
}
#post table {
  @apply w-full border-collapse my-4;
}
#post th,
#post td {
  @apply border border-gray-300 px-4 py-2;
}
#post th {
  @apply bg-gray-100 font-bold text-black;
}
```

## Conclusion

You have successfully rendered and styled your Markdown content in your Next.js blog post pages.
You can extend the styling as desired to match your blog's theme and design.

In the next chapter, you will learn how to add rich custom components to your Markdown content to make it more engaging.
