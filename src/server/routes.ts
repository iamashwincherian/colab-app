import { publicProcedure, router } from "./trpc";
import dataRoutes from "./api/data";

export const appRouter = router({
  data: dataRoutes,
});

export type AppRouter = typeof appRouter;
