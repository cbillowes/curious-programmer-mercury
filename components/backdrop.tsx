import Image from "next/image";

export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden print:hidden">
      <div className="flex w-full flex-none justify-end opacity-70 blur">
        <Image
          src="/backdrop_1.png"
          alt="Gradient background"
          className="w-full max-w-none flex-none dark:hidden"
          priority={true}
          height={1232}
          width={2880}
        />
        <Image
          src="/backdrop_2.png"
          alt="Gradient background"
          className="hidden w-full max-w-none flex-none dark:block"
          priority={true}
          height={1232}
          width={2880}
        />
      </div>
    </div>
  );
}
