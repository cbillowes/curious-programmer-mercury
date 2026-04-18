"use client";

import { RefObject, useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
