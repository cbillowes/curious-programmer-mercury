import { addToBookmarks, deleteBookmark } from '@/db/bookmarks';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug, bookmark } = await request.json();
  try {
    const user = await stackServerApp.getUser();
    if (user) {
      if (bookmark) {
        await addToBookmarks(slug);
        return NextResponse.json({
          message: 'Added to your bookmarks',
          added: true,
        });
      } else {
        await deleteBookmark(slug);
        return NextResponse.json({
          message: 'Removed from your bookmarks',
          added: false,
        });
      }
    } else {
      return NextResponse.json({
        message: 'You need to be signed in',
        added: false,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        added: false,
      });
    }
  }
}
