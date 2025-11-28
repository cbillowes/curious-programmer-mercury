'use client';

import { getGroup, sidebarItems } from '@/data/sidebar';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { Link } from '@/components/link';
import { FaCode, FaMoon, FaSun } from 'react-icons/fa6';
import { useThemeMode } from 'flowbite-react';
import { Search } from '@/components/search';
import { useClickOutside } from '@/hooks/use-click-outside';
import { Avatar, AvatarDropdown } from '@/components/avatar';
import { useAuth } from '@/hooks/use-auth';

function MenuItemLink({
  active,
  to,
  icon,
  name,
  className,
}: {
  active: string;
  to: string;
  name: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={to}
      className={cn(
        'w-[255px] text-base text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 group dark:text-gray-200 px-4 space-2 flex items-center py-2 mx-2 gap-2',
        active === to &&
          'bg-primary-600 text-primary-200 hover:bg-pink-500 dark:hover:bg-pink-500 hover:text-white',
        className,
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
}

function MenuItemDropdown({
  icon,
  name,
  items,
  active,
}: {
  icon?: string;
  name: string;
  items: {
    to: string;
    name: string;
    icon?: string;
  }[];
  active: string;
}) {
  const [expand, setExpand] = useState(name === getGroup(active)?.name);
  const id = name.replace(/\s+/g, '-').toLowerCase();

  return (
    <>
      <button
        type="button"
        className={cn(
          'w-[255px] text-base text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 group dark:text-gray-200 space-2 flex items-center justify-between px-4 py-2 ml-2 mr-2 gap-2',
          expand
            ? 'bg-gray-100 dark:bg-gray-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700',
        )}
        aria-controls={id}
        data-collapse-toggle={id}
        onClick={() => setExpand(!expand)}
      >
        {icon}
        <span className="flex-0 text-left whitespace-nowrap">{name}</span>
        <svg
          className={cn('w-6 h-6', expand ? 'transform rotate-180' : '')}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <ul id={id} className={cn('py-2 space-y-2', expand ? 'block' : 'hidden')}>
        {items.map((item) => (
          <div key={item.to}>
            <MenuItemLink {...item} active={active} className="pl-6" />
          </div>
        ))}
      </ul>
    </>
  );
}

function ToggleSidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      aria-expanded="true"
      aria-controls="sidebar"
      className="print:hidden p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      onClick={toggle}
    >
      {!isOpen && (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      {isOpen && (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </button>
  );
}

export function Header() {
  const active = typeof window !== 'undefined' ? window.location.pathname : '';
  const sidebar = localStorage.getItem('sidebar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebar === 'open');
  const { mode, toggleMode } = useThemeMode();
  const user = useAuth();

  const toggleSidebarState = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebar', newState ? 'open' : 'closed');
  };

  const sidebarRef = useClickOutside<HTMLDivElement>(() => {
    setIsSidebarOpen(false);
    toggleSidebarState();
  });

  return (
    <>
      <nav className="print:hidden fixed w-full bg-white border-b border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-2xl z-100">
        <div className="max-w-7xl mx-auto">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <ToggleSidebar
                  isOpen={isSidebarOpen}
                  toggle={toggleSidebarState}
                />
                <Link href="/" className="flex ml-2 md:mr-4">
                  <span className="self-center text-lg sm:text-xl whitespace-nowrap text-gray-900 dark:text-white font-light print:text-black">
                    {`{ `} curious{' '}
                    <strong className="font-bold">programmer</strong> {` }`}
                  </span>
                </Link>
              </div>
              <div className="print:hidden flex items-center gap-2">
                <Search />
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5"
                  onClick={toggleMode}
                >
                  <span className="sr-only">Toggle theme</span>
                  {mode === 'dark' && <FaSun />}
                  {mode === 'light' && <FaMoon />}
                </button>
                <AvatarDropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="print:hidden h-screen w-72 pt-16 fixed top-0 left-0 bottom-0 font-normal duration-75 lg:flex transition-width z-50"
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col flex-1 min-h-0 pt-10 bg-white/50 border-r border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 h-screen backdrop-blur-2xl overflow-scroll">
            <div className="flex flex-col flex-1 pb-28 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-rounded-[0.1667rem] scrollbar-thumb-slate-200 scrollbar-track-gray-400 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-800">
              <div className="flex-1 space-y-1">
                <ul className="px-2 pb-2 space-y-2">
                  {sidebarItems.map(({ items = [], ...rest }) => {
                    return (
                      <li key={rest.name} className="relative">
                        {items.length === 0 && (
                          <MenuItemLink
                            {...rest}
                            active={active}
                            to={rest.to ?? ''}
                          />
                        )}
                        {items.length > 0 && (
                          <MenuItemDropdown
                            {...rest}
                            active={active}
                            items={items}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="py-4 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
                  <MenuItemLink
                    active={active}
                    to="https://github.com/cbillowes/curious-programmer-mercury"
                    name="Source Code"
                    icon={<FaCode />}
                  />
                </div>
                {user && <Avatar />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
