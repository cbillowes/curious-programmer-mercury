'use server';

import { db } from '@/db';
import { favorites } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function addToLikes(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db.insert(favorites).values({
    slug,
    userId: user.id,
  });
}

export async function getLikes() {
  const user = await stackServerApp.getUser();
  if (!user) return [];
  return db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, user.id))
    .orderBy(desc(favorites.dateAdded));
}

export async function deleteLike(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, user.id), eq(favorites.slug, slug)));
}
