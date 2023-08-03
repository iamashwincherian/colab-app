import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export default router({
  find: privateProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx: { prisma, userId }, input: { id } }) =>
      prisma.board.findUnique({ where: { id, userId } })
    ),
  all: privateProcedure.query(async ({ ctx: { prisma, userId } }) => {
    console.log("userId", userId);
    const board = await prisma.board.findMany({
      where: { userId },
    });
    return board;
  }),
  create: privateProcedure
    .input(
      z.object({ name: z.string(), createSample: z.boolean().default(false) })
    )
    .mutation(
      async ({ ctx: { prisma, userId }, input: { name, createSample } }) => {
        const sampleListName = "Sample List";
        const sampleCardName = "Sample Card";
        const newBoard = await prisma.board.create({
          data: { name, userId },
        });
        await prisma.list.create({
          data: {
            name: sampleListName,
            position: 0,
            boardId: newBoard.id,
            userId,
            cards: {
              create: {
                position: 0,
                title: sampleCardName,
                boardId: newBoard.id,
                userId,
              },
            },
          },
        });

        return newBoard;
      }
    ),
});
