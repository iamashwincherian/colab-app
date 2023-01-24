"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon as HomeIconOutlined,
  Cog6ToothIcon as SettingsIconOutlined,
  ClipboardDocumentListIcon as NotesIconOutlined,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  Cog6ToothIcon as SettingsIconSolid,
  ClipboardDocumentListIcon as NotesIconSolid,
} from "@heroicons/react/24/solid";

type Theme = "dark" | "light";

export default function Sidebar() {
  const menuItems = [
    {
      id: 0,
      name: "Dashboard",
      icon: HomeIconOutlined,
      iconSolid: HomeIconSolid,
      url: "/",
    },
    {
      id: 1,
      name: "Tickets",
      icon: NotesIconOutlined,
      iconSolid: NotesIconSolid,
      url: "/tickets",
    },
    {
      id: 2,
      name: "Settings",
      icon: SettingsIconOutlined,
      iconSolid: SettingsIconSolid,
      url: "/settings",
    },
  ];
  const [theme, setTheme] = useState<Theme>("light");
  const pathname = usePathname();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = window.document.documentElement;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`h-screen w-64 border-r-2 border-gray-100 dark:border-none transition-all`}
    >
      <div className="flex h-screen justify-between flex-col items-start dark:bg-neutral-900 bg-gray-50 transition-all">
        <div className="w-full mt-4">
          <div className="flex items-center mx-6 my-2 p-2 px-4">
            <p className="text-3xl bg-neutral-900 dark:bg-neutral-700 font-semibold text-white tracking-wider p-2 px-4 rounded">
              C
            </p>
          </div>
          <div className="mt-4">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url}>
                <div
                  className={`flex mx-6 my-2 p-2 px-4 hover:text-primary hover:cursor-pointer transition-colors ${
                    pathname === item.url
                      ? "text-primary"
                      : "text-gray-600 dark:text-neutral-300"
                  }`}
                >
                  <div className="w-6 h-6 align-middle mr-3">
                    {pathname === item.url ? <item.iconSolid /> : <item.icon />}
                  </div>
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <hr className="border-gray-200 dark:border-gray-700"></hr>
          <div
            onClick={toggleTheme}
            className="flex mx-6 my-2 p-2 px-4 text-gray-600 dark:text-white hover:text-primary cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 align-middle mr-3">
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </div>
            <p>Toggle Theme</p>
          </div>
        </div>
      </div>
    </div>
  );
}
