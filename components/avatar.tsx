import { useAuth } from '@/hooks/use-auth';
import { useStackApp } from '@stackframe/stack';
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Avatar as FlowbiteAvatar,
} from 'flowbite-react';

export function Avatar() {
  const user = useAuth();
  if (!user) return <FlowbiteAvatar rounded bordered size="sm" />;
  return (
    <FlowbiteAvatar img={user.avatar} rounded bordered size="sm">
      <div className="space-y-0 font-medium dark:text-white text-xs">
        <div>{user.displayName}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate w-28">
          {user.email}
        </div>
      </div>
    </FlowbiteAvatar>
  );
}

export function AvatarDropdown() {
  const user = useAuth();
  const app = useStackApp();

  if (!user)
    return (
      <a href={app.urls.signIn}>
        <FlowbiteAvatar rounded bordered size="sm" />
      </a>
    );
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<FlowbiteAvatar img={user.avatar} rounded bordered size="sm" />}
      className="cursor-pointer"
    >
      <DropdownHeader>
        <span className="block text-sm">{user.displayName}</span>
        <span className="block truncate text-xs font-medium">{user.email}</span>
      </DropdownHeader>
      <DropdownItem href={app.urls.accountSettings}>Profile</DropdownItem>
      <DropdownItem href="/my/bookmarks">Bookmarks</DropdownItem>
      <DropdownItem href="/my/likes">Likes</DropdownItem>
      <DropdownDivider />
      <DropdownItem href={app.urls.signOut} className="rounded-lg">Sign out</DropdownItem>
    </Dropdown>
  );
}
