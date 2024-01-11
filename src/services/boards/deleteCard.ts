"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function deleteCard(cardId: number) {
  const card = await db.card.findFirst({ where: { id: cardId } });
  if (!card) return;

  await db.card.delete({ where: { id: cardId } });
  revalidatePath(`/boards/${card.boardId}`);
}
