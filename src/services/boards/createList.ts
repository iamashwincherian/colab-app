"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

interface CreateListTypes {
  name: string;
  boardId: number;
}

export default async function createList({ name, boardId }: CreateListTypes) {
  const board = await db.board.findFirst({ where: { id: boardId } });
  if (!board) return;

  const { userId } = board;
  const nextPosition = await db.list.count({ where: { boardId, userId } });

  await db.list.create({
    data: { name, boardId, userId, position: nextPosition },
  });
  console.log("boardId", boardId);
  revalidatePath(`/boards/${boardId}`);
}
