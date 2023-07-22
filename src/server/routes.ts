import { router } from "./trpc";
import dataRoutes from "./api/data";
import boardRoutes from "./api/board";

export const appRouter = router({
  data: dataRoutes,
  boards: boardRoutes,
});

export type AppRouter = typeof appRouter;
