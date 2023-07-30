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
import { BoardContextProvider } from "../contexts/BoardContext";
import TrpcProvider from "../utils/trpc/trpcProvider";

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
    <TrpcProvider>
      <SessionProvider session={session}>
        <SettingsContextProvider>
          <UserContextProvider>
            <ThemeContextProvider>
              <BoardContextProvider>
                <Body>
                  {children}
                  <div id="modalEl"></div>
                </Body>
              </BoardContextProvider>
            </ThemeContextProvider>
          </UserContextProvider>
        </SettingsContextProvider>
      </SessionProvider>
    </TrpcProvider>
  );
}
