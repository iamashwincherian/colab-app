import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";

const createSampleBoards = async (prisma: PrismaClient, userId: string) => {
  const SAMPLE_BOARD_NAME = "Getting Started";
  const SAMPLE_LIST_NAME = "Your first List";
  const SAMPLE_CARD_NAME = "Your first Card";
  const newBoard = await prisma.board.create({
    data: { name: SAMPLE_BOARD_NAME, userId },
  });
  await prisma.list.create({
    data: {
      name: SAMPLE_LIST_NAME,
      boardId: newBoard.id,
      position: 0,
      userId,
      cards: {
        create: {
          title: SAMPLE_CARD_NAME,
          position: 0,
          userId,
          boardId: newBoard.id,
        },
      },
    },
  });

  return [newBoard];
};

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
    if (!board.length) return createSampleBoards(prisma, userId);
    return board;
  }),
  create: privateProcedure
    .input(
      z.object({ name: z.string(), createSample: z.boolean().default(false) })
    )
    .mutation(
      async ({ ctx: { prisma, userId }, input: { name, createSample } }) => {
        const newBoard = await prisma.board.create({
          data: { name, userId },
        });
        if (createSample) {
          const sampleListName = "Sample List";
          const sampleCardName = "Sample Card";
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
        }

        return newBoard;
      }
    ),
  updateName: privateProcedure
    .input(z.object({ id: z.number().optional(), name: z.string() }))
    .mutation(({ ctx: { prisma, userId }, input: { id, name } }) => {
      if (!id)
        throw new TRPCError({
          message: "Invalid board",
          code: "BAD_REQUEST",
        });
      return prisma.board.update({ where: { id, userId }, data: { name } });
    }),
});
