'use server';

import { db } from '@/db';
import { bookmarks } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function addToBookmarks(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db.insert(bookmarks).values({
    slug,
    userId: user.id,
  });
}

export async function getBookmarks() {
  const user = await stackServerApp.getUser({
    or: 'anonymous',
  });
  if (!user?.id) return [];
  return db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, user.id))
    .orderBy(desc(bookmarks.dateAdded));
}

export async function deleteBookmark(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.slug, slug)));
}
