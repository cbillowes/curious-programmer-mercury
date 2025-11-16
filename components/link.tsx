'use client';

import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import NextLink from 'next/link';

export function Link(props: React.ComponentProps<'a'>) {
  const { href, className, children, ...rest } = props;
  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <a
        {...rest}
        className={cn('inline-flex items-center gap-1', className)}
        target="_blank"
        rel="noreferrer nofollow"
        href={`${href}?utm_source=curious_programmer.dev&utm_medium=referral&utm_campaign=external_link`}
      >
        {children}
        <ExternalLink className="opacity-50 size-4 text-black dark:text-white cursor-pointer" />
      </a>
    );
  }

  return (
    <NextLink href={href ?? ''} className={className} {...rest}>
      {children}
    </NextLink>
  );
}
