'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { Backdrop } from '@/components/backdrop';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Head from 'next/head';
import { getCanonicalUrl } from '@/lib/utils';

export function Page({
  title,
  description,
  slug,
  image,
  type,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  type: 'article' | 'website';
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return null;
  }

  const canonicalUrl = getCanonicalUrl(slug);
  const pageTitle = `${title} | Curious Programmer`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:twitter:image" content={image} />
        <meta property="og:twitter:title" content={pageTitle} />
        <meta property="og:twitter:description" content={description} />
        <meta property="og:twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 pt-16 py-5 print:bg-white print:text-black">
        <Backdrop />
        {children}
      </main>
      <Footer />
    </div>
  );
}
