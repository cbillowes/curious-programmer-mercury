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
    <div className="relative print:hidden">
      <Image
        src={image}
        alt={title}
        width={1920}
        height={1280}
        className="w-full h-[700px] object-cover"
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
