"use client";

import { ReactNode, useState } from "react";
import { getGroup, sidebarItems } from "@/data/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useStackApp } from "@stackframe/stack";
import { useThemeMode } from "flowbite-react";
import { FaCode, FaMoon, FaSun } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Avatar, AvatarDropdown } from "@/components/avatar";
import { Link } from "@/components/link";
import { Search } from "@/components/search";

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
        "group space-2 mx-2 flex w-[255px] items-center gap-2 rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900",
        active === to &&
          "bg-primary-600 text-primary-200 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500",
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
  const id = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      <button
        type="button"
        className={cn(
          "group space-2 mr-2 ml-2 flex w-[255px] items-center justify-between gap-2 rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900",
          expand ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700",
        )}
        aria-controls={id}
        data-collapse-toggle={id}
        onClick={() => setExpand(!expand)}
      >
        {icon}
        <span className="flex-0 text-left whitespace-nowrap">{name}</span>
        <svg
          className={cn("h-6 w-6", expand ? "rotate-180 transform" : "")}
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
      <ul id={id} className={cn("space-y-2 py-2", expand ? "block" : "hidden")}>
        {items.map((item) => (
          <div key={item.to}>
            <MenuItemLink {...item} active={active} className="pl-6" />
          </div>
        ))}
      </ul>
    </>
  );
}

function ToggleSidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      aria-expanded={isOpen}
      className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 print:hidden"
      onClick={toggle}
    >
      {!isOpen && <HiMenuAlt1 aria-label="Open side menu" className="size-6" />}
      {isOpen && <MdClose aria-label="Close side menu" className="size-6" />}
    </button>
  );
}

export function Header() {
  const app = useStackApp();
  const active = typeof window !== "undefined" ? window.location.pathname : "";
  const sidebar = typeof window !== "undefined" && localStorage.getItem("sidebar");
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebar === "open");
  const { mode, toggleMode } = useThemeMode();
  const user = useAuth();

  const toggleSidebarState = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebar", newState ? "open" : "closed");
  };

  const sidebarRef = useClickOutside<HTMLDivElement>(() => {
    setIsSidebarOpen(false);
    toggleSidebarState();
  });

  return (
    <>
      <nav className="fixed z-100 w-full border-b border-gray-200/50 bg-white backdrop-blur-2xl dark:border-gray-700 dark:bg-gray-800/50 print:hidden">
        <div className="mx-auto max-w-sm md:max-w-3xl lg:max-w-5xl">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <ToggleSidebar isOpen={isSidebarOpen} toggle={toggleSidebarState} />
                <Link href="/" className="ml-2 flex md:mr-4">
                  <span className="hidden self-center text-lg font-light whitespace-nowrap text-gray-900 sm:block sm:text-xl dark:text-white print:text-black">
                    {`{ `} curious <strong className="font-bold">programmer</strong> {` }`}
                  </span>
                  <span className="block text-3xl font-black sm:hidden">{"{ }"}</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <Search />
                <button
                  className="mr-2 rounded-lg p-2.5 text-lg text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  onClick={toggleMode}
                >
                  <span className="sr-only">Toggle theme</span>
                  {mode === "dark" && <FaSun />}
                  {mode !== "dark" && <FaMoon />}
                </button>
                <div>
                  <AvatarDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="transition-width fixed top-1 bottom-0 left-0 z-50 h-screen w-72 pt-17 font-normal duration-75 lg:flex print:hidden"
          aria-label="Sidebar"
        >
          <div className="relative flex h-screen min-h-0 flex-1 flex-col overflow-scroll border-r border-gray-200 bg-white/50 pt-10 backdrop-blur-2xl dark:border-gray-700 dark:bg-gray-800/50">
            <div className="scrollbar scrollbar-w-2 scrollbar-thumb-rounded-[0.1667rem] scrollbar-thumb-slate-200 scrollbar-track-gray-400 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-800 flex flex-1 flex-col overflow-y-auto pb-28">
              <div className="flex-1 space-y-1">
                <ul className="space-y-2 px-2 pb-2">
                  {sidebarItems.map(({ items = [], ...rest }) => {
                    return (
                      <li key={rest.name} className="relative">
                        {items.length === 0 && (
                          <MenuItemLink {...rest} active={active} to={rest.to ?? ""} />
                        )}
                        {items.length > 0 && (
                          <MenuItemDropdown {...rest} active={active} items={items} />
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-b border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
                  <MenuItemLink
                    active={active}
                    to="https://github.com/cbillowes/curious-programmer-mercury"
                    name="Source Code"
                    icon={<FaCode />}
                  />
                </div>
                {user && (
                  <Link className="flex justify-start px-4 py-4" href={app.urls.accountSettings}>
                    <Avatar />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
