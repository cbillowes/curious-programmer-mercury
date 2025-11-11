import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 py-12">{children}</div>;
}
