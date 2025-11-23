'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { Backdrop } from '@/components/backdrop';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Head from 'next/head';
import { getCanonicalUrl } from '@/lib/utils';

export function Page({
  slug,
  children,
}: {
  slug: string;
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

  return (
    <div>
      <Head>
        <link rel="canonical" href={getCanonicalUrl(slug)} key="canonical" />
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
