'use client';

import { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

type Props = ComponentProps<'a'> & {
  hideExternal?: boolean;
};

function Tooltip(props: {
  content?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { content, children } = props;
  if (!content) return <>{children}</>;
  return <FlowbiteTooltip content={content}>{children}</FlowbiteTooltip>;
}

export function Link(props: Props) {
  const router = useRouter();
  const { href, className, children, hideExternal, title, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    NProgress.start();
    router.push(href);
  };

  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <Tooltip content={title ?? children}>
        <a
          {...rest}
          aria-label={title}
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
      </Tooltip>
    );
  }

  return (
    <Tooltip content={title}>
      <NextLink
        {...rest}
        href={href ?? '#'}
        className={className}
        onClick={handleClick}
      >
        {children}
      </NextLink>
    </Tooltip>
  );
}
