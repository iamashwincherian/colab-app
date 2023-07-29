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
        position: z.number(),
        boardId: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { name, position, boardId } }) =>
      prisma.list.create({
        data: {
          name,
          position,
          boardId,
          userId: 1,
        },
      })
    ),
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
        id: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { id } }) =>
      prisma.list.delete({
        where: { id },
      })
    ),
});
