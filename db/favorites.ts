'use server';

import { db } from '@/db';
import { favorites } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, desc, and } from 'drizzle-orm';

export async function addToFavorites(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db.insert(favorites).values({
    slug,
    userId: user.id,
  });
}

export async function getFavorites() {
  const user = await stackServerApp.getUser();
  if (!user) return [];
  return db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, user.id))
    .orderBy(favorites.order);
}

export async function deleteFavorite(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, user.id), eq(favorites.slug, slug)));
}
