import Image from 'next/image';

export function Backdrop() {
  return (
    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none print:hidden">
      <div className="w-432 flex-none flex justify-end blur opacity-70">
        <Image
          src="/backdrop_1.png"
          alt="Gradient background"
          className="w-287 flex-none max-w-none dark:hidden"
          decoding="async"
          priority={true}
          height={287}
          width={432}
        />
        <Image
          src="/backdrop_2.png"
          alt="Gradient background"
          className="w-360 flex-none max-w-none hidden dark:block"
          decoding="async"
          priority={true}
          height={287}
          width={432}
        />
      </div>
    </div>
  );
}
