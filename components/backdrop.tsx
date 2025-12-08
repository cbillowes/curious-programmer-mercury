import Image from 'next/image';

export function Backdrop() {
  return (
    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none print:hidden">
      <div className="w-full flex-none flex justify-end blur opacity-70">
        <Image
          src="/backdrop_1.png"
          alt="Gradient background"
          className="w-full flex-none max-w-none dark:hidden"
          priority={true}
          height={668}
          width={2296}
        />
        <Image
          src="/backdrop_2.png"
          alt="Gradient background"
          className="w-full flex-none max-w-none hidden dark:block"
          priority={true}
          height={668}
          width={2296}
        />
      </div>
    </div>
  );
}
