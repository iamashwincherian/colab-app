import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export default router({
  find: privateProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx: { prisma, userId }, input: { id } }) =>
      prisma.board.findUnique({ where: { id, userId } })
    ),
  all: privateProcedure.query(async ({ ctx: { prisma, userId } }) => {
    const board = await prisma.board.findMany({
      where: { userId },
    });
    return board;
  }),
});
