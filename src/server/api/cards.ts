import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export default router({
  create: privateProcedure
    .input(
      z.object({
        listId: z.number(),
        boardId: z.number(),
        title: z.string().nonempty(),
      })
    )
    .mutation(
      async ({
        ctx: { prisma, userId },
        input: { boardId, listId, title },
      }) => {
        const nextPosition = await prisma.card.count({
          where: {
            listId,
            boardId,
          },
        });

        return prisma.card.create({
          data: {
            userId,
            listId,
            boardId,
            position: nextPosition,
            title,
          },
        });
      }
    ),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .mutation(({ ctx: { prisma, userId }, input: { id, title } }) =>
      prisma.card.update({
        where: { id, userId },
        data: { title },
      })
    ),
  updatePosition: privateProcedure
    .input(
      z.object({
        boardId: z.number(),
        cards: z
          .object({ id: z.number(), position: z.number(), listId: z.number() })
          .array()
          .default([]),
      })
    )
    .mutation(
      async ({ ctx: { prisma, userId }, input: { boardId, cards } }) => {
        for (const { id, listId, position } of cards) {
          await prisma.card.update({
            where: { boardId, userId, id },
            data: { position, listId },
          });
        }
      }
    ),
  delete: privateProcedure
    .input(
      z.object({
        cardId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma, userId }, input: { cardId } }) =>
      prisma.card.delete({
        where: { id: cardId, userId },
      })
    ),
});
