"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import {
  ThemeContextProvider,
  useThemeContext,
} from "../contexts/ThemeContext";
import clsx from "../helpers/clsx";
import { UserContextProvider } from "../contexts/UserContext";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import { BoardContextProvider } from "../contexts/BoardContext";
import { Toaster } from "@components/ui/toast/toaster";

interface BodyProps {
  children: React.ReactNode;
  session?: any;
}

const inter = Inter({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function ContextProviderWrappers({
  children,
  session,
}: BodyProps) {
  const { theme } = useThemeContext();
  return (
    <SessionProvider session={session}>
      <SettingsContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <BoardContextProvider>
              <body className={clsx(theme, inter.className)}>
                {children}
                <div id="modalEl"></div>
                <Toaster />
              </body>
            </BoardContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </SettingsContextProvider>
    </SessionProvider>
  );
}
