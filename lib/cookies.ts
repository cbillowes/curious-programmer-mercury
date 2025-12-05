import { cookies } from 'next/headers';

export async function getCookieConsent() {
  const cookieStore = await cookies();
  return cookieStore.get('cookie-consent')?.value === 'true';
}
