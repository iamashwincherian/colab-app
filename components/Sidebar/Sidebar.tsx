"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import menuItems from "./menuItems";
import Logo from "../logo/logo";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className={`h-screen w-64 border-r-2 border-gray-100 dark:border-none transition-all`}
    >
      <div className="flex h-screen justify-between flex-col items-start dark:bg-neutral-900 bg-gray-50 transition-all">
        <div className="w-full mt-4">
          <div className="flex items-center mx-6 my-2 p-2 px-4">
            <Logo />
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
      </div>
    </div>
  );
}
