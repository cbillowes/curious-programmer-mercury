'use client';

import { Link } from '@/components/link';

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
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded z-50">
        <Link
          href={creditLink}
          className="cursor-pointer px-4 py-2"
          title="Open credit source"
          hideExternal={true}
          showTooltip={false}
        >
          {credit} {credit && creditSource && ' | '} {creditSource}
        </Link>
      </div>
    )
  );
}
