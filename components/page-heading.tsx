import { ReactNode } from "react";

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="mb-4 text-center text-4xl font-bold">{children}</h1>;
}
