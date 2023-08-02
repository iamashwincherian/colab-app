"use client";

import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/routes";

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
