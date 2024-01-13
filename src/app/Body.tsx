"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import { ThemeContextProvider } from "../contexts/ThemeContext";
import { UserContextProvider } from "../contexts/UserContext";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import { BoardContextProvider } from "../contexts/BoardContext";
import { Toaster } from "@/components/ui/toast/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <BoardContextProvider>
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
              <div id="modalEl"></div>
            </ThemeProvider>
            <Toaster />
          </body>
        </BoardContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}
