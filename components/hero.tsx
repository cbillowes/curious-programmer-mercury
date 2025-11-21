import Image from 'next/image';
import { Credit } from '@/components/credit';

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
        width={1600}
        height={600}
        className="w-full h-[800px] object-cover"
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
