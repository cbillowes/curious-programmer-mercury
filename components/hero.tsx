import Image from 'next/image';
import { Credit } from '@/components/credit';

export function Hero({
  image = 'default-01.jpg',
  title,
  credit,
  creditSource,
  creditLink,
}: {
  image?: string;
  title?: string;
  credit?: string;
  creditSource?: string;
  creditLink?: string;
}) {
  return (
    <div className="relative print:hidden">
      <Image
        src={image}
        alt={title ?? 'Hero image'}
        width={1920}
        height={700}
        className="w-full h-[250px] md:h-[700px] object-cover"
        priority={true}
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
