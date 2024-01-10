"use server";

import { db } from "@/server/db";
import { Card } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateCardPosition = async (cards: Card[], boardId: number) => {
  for (const card of cards) {
    await db.card.update({ where: { id: card.id }, data: { ...card } });
  }
  revalidatePath(`/boardsv2/${boardId}`);
};

export default updateCardPosition;
