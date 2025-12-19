'use server';

import { db } from '@/db';
import { favorites } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function addToLikes(slug: string) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error('Not authenticated');
    await db.insert(favorites).values({
      slug,
      userId: user.id,
    });
  } catch (error) {
    console.error('Failed to add like.', error);
    throw new Error('Could not add to likes. Please try again later.');
  }
}

export async function getLikes() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return [];
    return db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, user.id))
      .orderBy(desc(favorites.dateAdded));
  } catch (error) {
    console.error('Failed to fetch likes.', error);
    return [];
  }
}

export async function deleteLike(slug: string) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error('Not authenticated');
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, user.id), eq(favorites.slug, slug)));
  } catch (error) {
    console.error('Failed to delete like.', error);
    throw new Error('Could not delete like. Please try again later.');
  }
}
