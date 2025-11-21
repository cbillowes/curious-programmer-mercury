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
        <a href={creditLink} target="_blank" rel="noopener noreferrer">
          {credit} {credit && creditSource && " | "} {creditSource}
        </a>
      </div>
    )
  );
}
