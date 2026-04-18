"use client";

import { ComponentProps } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Tooltip as FlowbiteTooltip } from "flowbite-react";
import NProgress from "nprogress";
import { RiExternalLinkLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & {
  hideExternal?: boolean;
  showTooltip?: boolean;
};

function Tooltip(props: { content?: React.ReactNode; children: React.ReactNode }) {
  const { content, children } = props;
  if (!content) return <>{children}</>;
  return <FlowbiteTooltip content={content}>{children}</FlowbiteTooltip>;
}

export function Link(props: Props) {
  const router = useRouter();
  const {
    href,
    className,
    children,
    hideExternal = false,
    showTooltip = true,
    title,
    ...rest
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    NProgress.start();
    router.push(href);
  };

  if ((typeof href === "string" && href.startsWith("http")) || props.target === "_blank") {
    return (
      <div className="inline-flex">
        <Tooltip content={showTooltip && title}>
          <a
            {...rest}
            aria-label={title}
            title={title}
            className={cn("inline-flex items-center gap-1", className)}
            target="_blank"
            rel="noreferrer nofollow"
            href={`${href}?utm_source=curiousprogrammer.dev&utm_medium=referral&utm_campaign=external_link`}
          >
            {children}
            {!hideExternal && (
              <RiExternalLinkLine className="size-4 cursor-pointer text-black opacity-50 dark:text-white" />
            )}
          </a>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="inline-flex">
      <Tooltip content={title}>
        <NextLink
          {...rest}
          aria-label={title}
          title={title}
          href={href ?? "#"}
          className={className}
          onClick={handleClick}
        >
          {children}
        </NextLink>
      </Tooltip>
    </div>
  );
}
