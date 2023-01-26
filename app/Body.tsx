"use client";

import { SessionProvider } from "next-auth/react";

import {
  ThemeContextProvider,
  useThemeContext,
} from "../contexts/ThemeContext";

interface BodyProps {
  children: React.ReactNode;
  session?: any;
}

const Body = ({ children }: BodyProps) => {
  const { theme } = useThemeContext();
  return <body className={theme}>{children}</body>;
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
