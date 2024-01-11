"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function deleteList(
  listId: number,
  deleteCards: boolean = true
) {
  const list = await db.list.findFirst({ where: { id: listId } });
  if (!list) return;

  if (deleteCards) {
    await db.card.deleteMany({ where: { listId } });
  }

  await db.list.delete({ where: { id: listId } });
  revalidatePath(`/boardsv2/${list.boardId}`);
}
