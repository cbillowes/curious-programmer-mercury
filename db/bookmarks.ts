'use server';

import { db } from '@/db';
import { bookmarks } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function addToBookmarks(slug: string) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error('Not authenticated');
    await db.insert(bookmarks).values({
      slug,
      userId: user.id,
    });
  } catch (error) {
    console.error('Failed to add bookmark.', error);
    throw new Error('Could not add to bookmarks. Please try again later.');
  }
}

export async function getBookmarks() {
  try {
    const user = await stackServerApp.getUser({
      or: 'anonymous',
    });
    if (!user?.id) return [];
    return db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, user.id))
      .orderBy(desc(bookmarks.dateAdded));
  } catch (error) {
    console.error('Failed to fetch bookmarks.', error);
    return [];
  }
}

export async function deleteBookmark(slug: string) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error('Not authenticated');
    await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.slug, slug)));
  } catch (error) {
    console.error('Failed to delete bookmark.', error);
    throw new Error('Could not delete bookmark. Please try again later.');
  }
}
