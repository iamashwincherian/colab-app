"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import {
  ThemeContextProvider,
  useThemeContext,
} from "../contexts/ThemeContext";
import clsx from "../helpers/clsx";
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from "../contexts/UserContext";
import { SettingsContextProvider } from "../contexts/SettingsContext";

interface BodyProps {
  children: React.ReactNode;
  session?: any;
}

const inter = Inter({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

const Body = ({ children }: BodyProps) => {
  const { theme } = useThemeContext();

  return (
    <body className={clsx(theme, inter.className)}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={1000 * 3}
        preventDuplicate
      >
        {children}
      </SnackbarProvider>
    </body>
  );
};

export default function ContextProviderWrappers({
  children,
  session,
}: BodyProps) {
  return (
    <SessionProvider session={session}>
      <SettingsContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <Body>{children}</Body>
          </ThemeContextProvider>
        </UserContextProvider>
      </SettingsContextProvider>
    </SessionProvider>
  );
}
