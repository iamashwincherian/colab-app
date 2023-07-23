import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export default router({
  all: publicProcedure
    .input(
      z.object({
        boardId: z.number(),
        includeCards: z.boolean().optional().default(false),
      })
    )
    .query(({ ctx: { prisma }, input: { includeCards, boardId } }) =>
      prisma.list.findMany({
        where: { boardId },
        include: { cards: includeCards },
      })
    ),
});
