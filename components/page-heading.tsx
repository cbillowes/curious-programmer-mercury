import { ReactNode } from 'react';

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl font-bold text-center mb-4">{children}</h1>;
}
