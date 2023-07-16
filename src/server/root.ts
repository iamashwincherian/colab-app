import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello world" };
  }),
});

export type AppRouter = typeof appRouter;
