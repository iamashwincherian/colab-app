import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@server/routes";
import { createContext } from "@server/api/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
