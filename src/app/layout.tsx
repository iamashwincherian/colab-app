"use client";

import Body from "./Body";
import Head from "./head";
import { trpc } from "@/utils/trpc/trpc";

import "../styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <Head />
      <Body>{children}</Body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
