import { ReactNode } from 'react';

export function Ribbon({ children }: { children?: ReactNode }) {
  if (!children) return <></>;
  return (
    <div className="ribbon absolute right-0 z-40">
      <div className="backdrop absolute overflow-hidden inline-block h-36 w-36 top-0 -right-1">
        <div className="bg-pink-600 w-52 h-10 absolute top-10 -right-12 overflow-hidden transform rotate-45 py-1 text-center font-bold">
          <div className="border-dashed border-b border-l border-r border-t border-white mb-1 pb-1 text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
