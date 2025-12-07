'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Backdrop } from '@/components/backdrop';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function Page({ children }: { children: ReactNode }) {
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
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 pt-16 py-5 print:bg-white print:text-black">
        <Backdrop />
        {children}
      </main>
      <Footer />
    </div>
  );
}
