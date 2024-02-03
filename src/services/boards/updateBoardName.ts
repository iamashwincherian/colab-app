"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function updateBoardName(name: string, boardId: number) {
  const board = await db.board.findFirst({ where: { id: boardId } });
  if (!board) return;

  await db.board.update({ where: { id: boardId }, data: { name } });
}
