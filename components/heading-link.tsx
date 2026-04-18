import { ReactNode, useState } from "react";
import { Tooltip } from "flowbite-react";
import { FaLink } from "react-icons/fa6";

import { cn } from "@/lib/utils";

export function getHeadingId(children: string | ReactNode) {
  return typeof children === "string"
    ? children.replace(/[^A-Za-z0-9-]+/gi, "-").toLowerCase()
    : "";
}

export function HeadingLink({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: string | ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href.split("#")[0];
    await navigator.clipboard.writeText(`${url}#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="heading flex items-center justify-start gap-1">
      <button
        onClick={handleCopy}
        className="heading-anchor cursor-pointer text-black! dark:text-white!"
        aria-label={copied ? "Link copied!" : "Copy link to heading"}
      >
        <Tooltip content={copied ? "Link copied!" : "Copy link to heading"} className="z-50">
          <a href={`#${id}`}>
            <FaLink
              className={cn(
                "size-4 cursor-pointer text-gray-800 opacity-50 hover:opacity-100 dark:text-gray-100",
                className,
              )}
            />
          </a>
        </Tooltip>
      </button>
      <a id={id} className="heading"></a>
      {children}
    </div>
  );
}
