import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export default router({
  create: publicProcedure
    .input(
      z.object({
        listId: z.number(),
        boardId: z.number(),
        title: z.string().nonempty(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { boardId, listId, title } }) => {
        const nextPosition = await prisma.card.count({
          where: {
            listId,
            boardId,
          },
        });

        return prisma.card.create({
          data: {
            userId: 1,
            listId,
            boardId,
            position: nextPosition,
            title,
          },
        });
      }
    ),
  updatePosition: publicProcedure
    .input(
      z.object({
        boardId: z.number(),
        cards: z
          .object({ id: z.number(), position: z.number(), listId: z.number() })
          .array()
          .default([]),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { boardId, cards } }) => {
      const userId = 1;
      for (const { id, listId, position } of cards) {
        await prisma.card.update({
          where: { boardId, userId, id },
          data: { position, listId },
        });
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        cardId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { cardId } }) =>
      prisma.card.delete({
        where: { id: cardId },
      })
    ),
});
