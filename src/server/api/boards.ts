import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export default router({
  find: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx: { prisma }, input: { id } }) =>
      prisma.board.findUnique({ where: { id } })
    ),
  all: publicProcedure.query(({ ctx: { prisma } }) => prisma.board.findMany()),
});
