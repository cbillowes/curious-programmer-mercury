'use client';

import { ReactNode } from 'react';
import { Backdrop } from '@/components/backdrop';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 pt-16 py-5 print:bg-white print:text-black print:p-0">
        <Backdrop />
        {children}
      </main>
      <Footer />
    </div>
  );
}
