'use client';

import { Button } from 'flowbite-react';
import { useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(() => {
    // Check localStorage (client side)
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      return !consent;
    }
    return false;
  });

  function acceptCookies() {
    // Save in localStorage
    localStorage.setItem('cookie-consent', 'true');

    // Tell the server (optional)
    document.cookie = 'cookie-consent=true; path=/; max-age=31536000';

    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-1 left-1 right-1 bg-white dark:bg-black text-black dark:text-white p-4 rounded shadow-lg z-100">
      <div className="max-w-3xl flex justify-between items-center mx-auto">
        <p>
          This website uses cookies to store preferences and enhance your
          browsing experience.
        </p>
        <Button onClick={acceptCookies}>Okay</Button>
      </div>
    </div>
  );
}
