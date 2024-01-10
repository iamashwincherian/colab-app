"use server";

import { db } from "@/server/db";
import { Card } from "@prisma/client";

const updateCardPosition = async (cards: Card[]) => {
  for (const card of cards) {
    await db.card.update({ where: { id: card.id }, data: { ...card } });
  }
};

export default updateCardPosition;
