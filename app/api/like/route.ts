import { addToLikes, deleteLike } from '@/db/likes';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug, like } = await request.json();
  try {
    const user = await stackServerApp.getUser();
    if (user) {
      if (like) {
        await addToLikes(slug);
        return NextResponse.json({
          message: 'Liked',
          added: true,
        });
      } else {
        await deleteLike(slug);
        return NextResponse.json({
          message: 'Removed',
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
