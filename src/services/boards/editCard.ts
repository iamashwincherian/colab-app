"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

interface EditCardProps {
  title: string;
  cardId: number;
}

export default async function editCard({ title, cardId }: EditCardProps) {
  const card = await db.card.findFirst({ where: { id: cardId } });
  if (!card) return;

  await db.card.update({ where: { id: cardId }, data: { title } });
  revalidatePath(`/boards/${card.boardId}`);
}
