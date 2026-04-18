"use client";

import { useState } from "react";
import { Button } from "flowbite-react";

export function CookieBanner({ value }: { value?: string }) {
  const [show, setShow] = useState(value !== "true");

  function acceptCookies() {
    // Save in localStorage
    localStorage.setItem("cookie-consent", "true");

    // Tell the server (optional)
    document.cookie = "cookie-consent=true; path=/; max-age=31536000";

    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed right-1 bottom-1 left-1 z-100 rounded bg-white p-4 text-black shadow-lg dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <p>This website uses cookies to store preferences and enhance your browsing experience.</p>
        <Button onClick={acceptCookies}>Okay</Button>
      </div>
    </div>
  );
}
