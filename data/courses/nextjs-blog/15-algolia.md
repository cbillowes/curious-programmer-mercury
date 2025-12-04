---
title: Implement Algolia autocomplete search
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to add Algolia search to your blog.
---

[Algolia](https://www.algolia.com/) is a powerful hosted search engine that provides real-time search and discovery capabilities.
It offers features like autocomplete searching, typo tolerance, synonyms, and relevance tuning to enhance the search experience for users.

In this chapter, you're going to do the following:

- Register an account at Algolia and create an index.
- Configure your environment variables.
- Create a search API route to get the blog posts to index.
- Create a script to index the blog posts.
- Create an autocomplete search component to query the index.

## Register your account

- Register a free account on [Algolia](https://www.algolia.com/) and create an index for your blog posts.
- [Create](https://dashboard.algolia.com/account/application/new/configure) an application.
- You can start with the free plan which allows up to 10,000 requests per month.
  Attribution is required and there are monthly usage limits.
- You can import your data by connecting with API, using an integration, crawling your website or uploading a file.
  For this tutorial, you are going to use the API to index your blog posts on demand.
- Copy your API keys.

## Configure your environment variables

```text:title:.env.local
# https://dashboard.algolia.com/apps/<APP_ID>/dashboard
NEXT_PUBLIC_ALGOLIA_APP_ID=your-app-id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your-search-only-api-key
# Your Algolia Write API Key - used only on the server side
ALGOLIA_API_KEY=your-admin-api-key
# The name of the index to search in Algolia
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=Posts
# Used in scripts/search.js to index your content
# Used in app/api/search/route.ts to generate absolute URLs
NEXT_PUBLIC_SEARCH_DOMAIN=your-hosted-website-domain
```

Don't forget to add the new environment variables to Netlify.

## Create a search API route

```ts:title=app/api/search/route.ts
import { NextResponse } from 'next/server';
import { allPosts } from 'content-collections';

function getPathWithDomain(path: string) {
  return path.startsWith('http')
    ? path
    : `${process.env.NEXT_PUBLIC_SEARCH_DOMAIN}${path}`;
}

export async function GET() {
  const articles = allPosts.map(
    ({ slug, title, summary, hero, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      tags,
      summary,
      slug,
      content,
      imageUrl: getPathWithDomain(hero),
    }),
  );
  const data = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return NextResponse.json(data);
}
```

## Create a script to index content

Install the `dotenv` and `algoliasearch` packages:

```bash
npm install --save-dev dotenv
npm install algoliasearch
```

```js:title=scripts/search.js
const search = require('algoliasearch');

require('dotenv').config({
  path: '.env.local',
})

const client = search.algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);

fetch(`${process.env.NEXT_PUBLIC_SEARCH_DOMAIN}/api/search`)
  .then((res) => res.json())
  .then((content) => {
    return client.saveObjects({ indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME, objects: content });
  })
  .then(() => {
    console.log('Successfully indexed objects!');
  })
  .catch((err) => {
    console.error(err);
  });
```

Add the script to your `package.json`:

```json:title=package.json
{
  "scripts": {
    "search:index": "node scripts/search.js"
  }
}
```

Execute the script once you have added and deployed your blog posts.
If your SEARCH_DOMAIN is your public website, make sure you have pushed your changes so that the API route is available to fetch the blog posts.

```bash
npm run search:index
```

Go to **Search** on your Algolia dashboard to see the indexed blog posts.
You can safely delete your index and re-run the script to re-index your content.
Each blog post is identified by its `slug` which is used as the `objectID`.

## Create an autocomplete search component

### Installation

Install the Algolia dependencies:

```bash
npm install react-instantsearch
```

### Search component

You're going to create a modal for search with autocomplete.
When you click outside the modal, the modal should close automatically.
To do so, you are going to create a custom hook.

```tsx:title=hooks/use-click-outside.ts
'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
```

Now you are ready to create the search component.

```tsx:title=components/search.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  InstantSearch,
  UseSearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import {
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { FiCommand } from 'react-icons/fi';
import { FaAlgolia } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { useClickOutside } from '@/hooks/use-click-outside';

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;
const ALGOLIA_PAGE_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

function Hit({
  hit,
  onNavigate,
}: {
  hit: {
    slug: string;
    title: string;
    summary?: string;
    imageUrl?: string;
    tags?: string[];
  };
  onNavigate: () => void;
}) {
  const { slug, imageUrl, title, summary, tags } = hit;
  return (
    <div>
      <Link href={slug} onClick={onNavigate}>
        <div className="py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mb-2 flex items-center gap-4 cursor-pointer">
          {imageUrl && (
            <Image
              className="w-40 h-40 mb-1 object-cover rounded-md hidden md:block"
              src={imageUrl}
              alt={title}
              width={80}
              height={80}
            />
          )}
          <div>
            <h2 className="text-lg text-pink-600 font-bold">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {summary?.substring(0, 250)}
            </p>
            <div>
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-500 dark:text-gray-400 mr-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CustomSearchBox(
  props: UseSearchBoxProps & { onNavigate: () => void },
) {
  const { onNavigate } = props;
  const { query, refine } = useSearchBox(props);
  const { status, error, results } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <div
        role="search"
        className="w-full flex items-center gap-2 mb-4 relative"
      >
        <div className="flex items-center gap-2 w-full">
          <TextInput
            ref={inputRef}
            autoComplete="off"
            autoCorrect="on"
            autoCapitalize="off"
            placeholder="Search for something…"
            spellCheck={false}
            maxLength={512}
            type="search"
            className="w-full"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
              refine(event.currentTarget.value);
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                refine(inputValue);
              }
            }}
          />
        </div>
      </div>
      {['loading', 'stalled'].includes(status) ? (
        <Spinner
          aria-label="Loading..."
          className="w-full flex justify-center items-center"
        />
      ) : (
        <div>
          {error && <Alert color="red">Error: {error.message}</Alert>}
          {results && results.hits.length === 0 && (
            <Alert color="yellow">No results found.</Alert>
          )}
          {results && results.hits.length > 0 && (
            <div className="max-h-80 overflow-scroll mb-8">
              {results.hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((x) => !x);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <InstantSearch
      indexName={ALGOLIA_PAGE_INDEX_NAME}
      searchClient={searchClient}
    >
      <button
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
          <FiCommand />
          &nbsp;K
        </div>
        <FaSearch />
      </button>
      {isMounted && (
        <Modal
          ref={modalRef}
          show={isOpen}
          onClose={() => setIsOpen(false)}
          className="text-black dark:text-white"
        >
          <ModalHeader className="border-gray-200 dark:border-gray-800 pb-0">
            Search for something
          </ModalHeader>
          <ModalBody className="max-h-[400px] overflow-hidden px-4 py-2 pb-8">
            <CustomSearchBox onNavigate={() => setIsOpen(false)} />
          </ModalBody>
          <ModalFooter className="px-4 py-4">
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 justify-end w-full text-md">
              Powered by <FaAlgolia /> AlgoliaSearch
            </p>
          </ModalFooter>
        </Modal>
      )}
    </InstantSearch>
  );
}
```

### Configure images from your domain

Register the domains you wish to have images load from:

```ts:title=next.config.js
import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['flowbite-react'],
  images: {
    localPatterns: [{ pathname: '/**' }],
    remotePatterns: [
      {
        protocol: 'https',
        // Replace with your hosted website domain on Netlify (or a custom domain you have configured)
        hostname: "curious-nextjs-blog-template.netlify.app",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// withContentCollections must be the outermost plugin
// const plugins = [withFlowbiteReact, withContentCollections];
withContentCollections(nextConfig);

export default withFlowbiteReact(nextConfig);
```

### Add to Navigation

```tsx:title=components/navigation.tsx
'use client';

import { useStackApp, useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Search } from '@/components/search';

export function Navigation() {
  const app = useStackApp();
  const user = useUser();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/zone">Dashboard</Link>
            </li>
            <li>
              <Link href={app.urls.accountSettings}>Profile</Link>
            </li>
            <li>
              <Link href={app.urls.signOut}>Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={app.urls.signIn}>Login</Link>
          </li>
        )}
      </ul>
      <Search />
    </nav>
  );
}
```

## Conclusion

:rocket: You're all set! You have successfully integrated Algolia search into your Next.js blog.

In the next chapter, you are going to learn how to implement dark mode theming in your Next.js blog.
