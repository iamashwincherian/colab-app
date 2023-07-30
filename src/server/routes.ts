import { router } from "./trpc";
import listRoutes from "./api/lists";
import boardRoutes from "./api/boards";
import cardRoutes from "./api/cards";

export const appRouter = router({
  boards: boardRoutes,
  lists: listRoutes,
  cards: cardRoutes,
});

export type AppRouter = typeof appRouter;
