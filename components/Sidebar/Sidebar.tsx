"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import menuItems from "./menuItems";
import Logo from "../logo/logo";
import { useUserContext } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className={`h-screen w-64 border-r-2 border-gray-100 dark:border-none transition-all`}
    >
      <div className="flex h-screen justify-between flex-col items-start dark:bg-dark-2 bg-gray-50 transition-all">
        <div className="flex flex-col w-full h-full mt-4">
          <div>
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
                      {pathname === item.url ? (
                        <item.iconSolid />
                      ) : (
                        <item.icon />
                      )}
                    </div>
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </div>
  );
}

const Profile = () => {
  const { user, logoutUser } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  if (!Object.keys(user).length) return <></>;

  const getNameInitials = () => {
    const [firstName, ...lastName] = "Ashwin".split(" ");
    const initials =
      firstName[0] + (lastName.length ? lastName[0][0] : firstName[1]);
    return initials;
  };

  const handleLogout = () => {
    enqueueSnackbar(`Logging you out ...`, {
      variant: "default",
    });
    signOut({ callbackUrl: "/auth/signin" });
    logoutUser();
  };

  return (
    <div
      onClick={handleLogout}
      className="flex flex-1 items-end justify-center my-4"
    >
      <div className="flex space-x-2 items-center cursor-pointer">
        <div>
          <div className="dark:bg-dark-3 bg-gray-800 text-white rounded p-3">
            {getNameInitials()}
          </div>
        </div>
        <div className="flex flex-col px-2">
          <p className="text-sm leading-5 dark:text-gray-300 text-gray-600 mb-1">
            {user.name}
          </p>
        </div>
      </div>
    </div>
  );
};
