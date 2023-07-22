import { z } from "zod";
import { trpc } from "../../utils/trpc/trpc";
import { publicProcedure, router } from "../trpc";

const boardRoutes = router({
  find: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx: { prisma }, input: { id } }) => {
      return prisma.board.findUnique({ where: { id } });
    }),
});

export default boardRoutes;
