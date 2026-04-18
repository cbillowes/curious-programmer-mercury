"use client";

import { Link } from "@/components/link";

export function Credit({
  credit,
  creditSource,
  creditLink,
}: {
  credit?: string;
  creditSource?: string;
  creditLink?: string;
}) {
  return (
    creditLink && (
      <div className="bg-opacity-50 absolute right-2 bottom-2 z-50 rounded bg-black text-sm text-white">
        <Link
          href={creditLink}
          className="cursor-pointer px-4 py-2"
          title="Open credit source"
          hideExternal={true}
          showTooltip={false}
        >
          {credit} {credit && creditSource && " | "} {creditSource}
        </Link>
      </div>
    )
  );
}
