'use client';

import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export function Link(props: React.ComponentProps<'a'>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return null;
  }

  const { href, className, children, ...rest } = props;
  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <a
        {...rest}
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href ?? ''} className={className} {...rest}>
      {children}
    </NextLink>
  );
}
