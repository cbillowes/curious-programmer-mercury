'use client';

import { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import NextLink from 'next/link';
import NProgress from 'nprogress';

type Props = ComponentProps<'a'> & {
  hideExternal?: boolean;
};

export function Link(props: Props) {
  const router = useRouter();
  const { href, className, children, hideExternal, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    NProgress.start();
    router.push(href);
  };

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
        {!hideExternal && (
          <ExternalLink className="opacity-50 size-4 text-black dark:text-white cursor-pointer" />
        )}
      </a>
    );
  }

  return (
    <NextLink
      {...rest}
      href={href ?? '#'}
      className={className}
      onClick={handleClick}
    >
      {children}
    </NextLink>
  );
}
