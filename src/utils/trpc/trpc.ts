"use client";

import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routes";

const BASE_URL = `http://localhost:${process.env.PORT ?? 3000}`;

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `${BASE_URL}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
