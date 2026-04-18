"use client";

import { ReactNode } from "react";

import { Backdrop } from "@/components/backdrop";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="bg-gray-50 py-5 pt-16 dark:bg-gray-900 print:bg-white print:p-0 print:text-black">
        <Backdrop />
        {children}
      </main>
      <Footer />
    </div>
  );
}
