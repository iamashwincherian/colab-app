"use client";

import { trpc } from "../utils/trpc";
import Body from "./Body";
import Head from "./head";

import "../styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <Head />
      <Body>{children}</Body>
    </html>
  );
};

export default RootLayout;
