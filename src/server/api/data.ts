import { TRPCError } from "@trpc/server";

import { publicProcedure, router } from "../trpc";
import type { Card, List } from "@prisma/client";

const dataRoutes = router({
  list: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const list = await prisma.list.findMany({
      where: { userId: 1, boardId: 1 },
    });
    if (!list) throw new TRPCError({ code: "NOT_FOUND" });

    return list as List[];
  }),
  cards: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const cards = await prisma.card.findMany({
      where: { userId: 1 },
    });
    if (!cards) throw new TRPCError({ code: "NOT_FOUND" });
    return cards as Card[];
  }),
});

export default dataRoutes;
