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
  create: publicProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        boardId: z.number(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { name, boardId } }) => {
      const nextPosition = await prisma.list.count({
        where: { boardId, userId: 1 },
      });
      const newList = await prisma.list.create({
        data: {
          name,
          boardId,
          position: nextPosition,
          userId: 1,
        },
      });

      return newList;
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().nonempty(),
        boardId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { id, name, boardId } }) =>
      prisma.list.update({
        where: { id, boardId },
        data: { name },
      })
    ),
  delete: publicProcedure
    .input(
      z.object({
        listId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { listId } }) =>
      prisma.list.delete({
        where: { id: listId },
      })
    ),
});
