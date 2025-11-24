'use client';

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
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        <button
          onClick={() => window.open(creditLink, '_blank')}
          className="cursor-pointer"
        >
          {credit} {credit && creditSource && ' | '} {creditSource}
        </button>
      </div>
    )
  );
}
