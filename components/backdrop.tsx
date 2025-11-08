export default function Backdrop() {
  return (
    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-432 flex-none flex justify-end blur opacity-60">
        <picture>
          <source srcSet="/backdrop_1.webp" type="image/webp" />
          <img
            src="/backdrop_1.png"
            alt="Gradient background"
            className="w-287 flex-none max-w-none dark:hidden"
            decoding="async"
          />
        </picture>
        <picture>
          <source srcSet="/backdrop_2.webp" type="image/webp" />
          <img
            src="/backdrop_2.png"
            alt="Gradient background"
            className="w-360 flex-none max-w-none hidden dark:block"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
