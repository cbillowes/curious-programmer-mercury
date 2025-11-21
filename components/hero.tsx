import Image from 'next/image';

export function Hero({
  image,
  title,
  credit,
  creditSource,
  creditLink,
}: {
  image: string;
  title: string;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
}) {
  return (
    <div className="relative">
      <Image
        src={image}
        alt={title}
        width={1200}
        height={600}
        className="w-full h-[600px] object-cover"
      />
      {creditLink && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
          <a href={creditLink} target="_blank" rel="noopener noreferrer">
            {credit && <span>{credit} | </span>}{' '}
            {creditSource || 'Image Source'}
          </a>
        </div>
      )}
    </div>
  );
}
