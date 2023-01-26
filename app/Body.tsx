"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";

import {
  ThemeContextProvider,
  useThemeContext,
} from "../contexts/ThemeContext";
import clsx from "../helpers/clsx";

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
  return <body className={clsx(theme, inter.className)}>{children}</body>;
};

export default function ContextProviderWrappers({
  children,
  session,
}: BodyProps) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <Body>{children}</Body>
      </ThemeContextProvider>
    </SessionProvider>
  );
}
