import { ReactNode } from "react";

export function Ribbon({ children }: { children?: ReactNode }) {
  if (!children) return <></>;
  return (
    <div className="ribbon absolute right-0 z-40">
      <div className="backdrop absolute top-0 -right-1 inline-block h-36 w-36 overflow-hidden">
        <div className="absolute top-10 -right-12 h-10 w-52 rotate-45 transform overflow-hidden bg-pink-600 py-1 text-center font-bold">
          <div className="mb-1 border-t border-r border-b border-l border-dashed border-white pb-1 text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
