import { Credit } from '@/components/credit';
import { ImageContainer } from '@/components/image-container';

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
      <ImageContainer
        width={1920}
        height={700}
        src={image}
        alt={title ?? 'Hero image'}
        className="h-[250px] md:h-[700px] object-cover"
        containerClassName="w-full!"
        priority={true}
        fill={true}
      />
      <Credit
        credit={credit}
        creditSource={creditSource}
        creditLink={creditLink}
      />
    </div>
  );
}
