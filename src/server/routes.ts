import { router } from "./trpc";
import listRoutes from "./api/lists";
import boardRoutes from "./api/boards";

export const appRouter = router({
  boards: boardRoutes,
  lists: listRoutes,
});

export type AppRouter = typeof appRouter;
