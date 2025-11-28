'use client';

import { useUser } from '@stackframe/stack';

export function useAuth() {
  const user = useUser();
  if (!user) return;
  return {
    userId: user.id!,
    avatar: user.profileImageUrl!,
    email: user.primaryEmail!,
    displayName: user.displayName!,
  };
}
