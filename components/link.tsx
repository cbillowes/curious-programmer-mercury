"use client";

import NextLink from 'next/link';

export function Link(props: React.ComponentProps<'a'>) {
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
