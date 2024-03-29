import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export default router({
  all: privateProcedure
    .input(
      z.object({
        boardId: z.number(),
        includeCards: z.boolean().optional().default(false),
      })
    )
    .query(({ ctx: { prisma, userId }, input: { includeCards, boardId } }) =>
      prisma.list.findMany({
        where: { boardId, userId },
        include: { cards: includeCards },
      })
    ),
  find: privateProcedure
    .input(z.object({ id: z.number(), boardId: z.number() }))
    .query(({ ctx: { prisma, userId }, input: { id, boardId } }) =>
      prisma.list.findUnique({ where: { id, userId, boardId } })
    ),
  create: privateProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        boardId: z.number(),
      })
    )
    .mutation(async ({ ctx: { prisma, userId }, input: { name, boardId } }) => {
      const nextPosition = await prisma.list.count({
        where: { boardId, userId },
      });
      const newList = await prisma.list.create({
        data: {
          userId,
          name,
          boardId,
          position: nextPosition,
        },
      });

      return newList;
    }),
  edit: privateProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().nonempty(),
      })
    )
    .mutation(({ ctx: { prisma, userId }, input: { id, name } }) =>
      prisma.list.update({
        where: { id, userId },
        data: { name },
      })
    ),
  delete: privateProcedure
    .input(
      z.object({
        listId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma, userId }, input: { listId } }) =>
      prisma.list.delete({
        where: { id: listId, userId },
      })
    ),
});
