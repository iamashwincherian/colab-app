import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routes";

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
