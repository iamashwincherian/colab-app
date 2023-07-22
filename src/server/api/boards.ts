import { z } from "zod";
import { trpc } from "../../utils/trpc/trpc";
import { publicProcedure, router } from "../trpc";

export default router({
  find: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx: { prisma }, input: { id } }) =>
      prisma.board.findUnique({ where: { id } })
    ),
});
