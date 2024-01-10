"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

export default async function createCard(
  title: string,
  listId: number,
  boardId: number
) {
  const { id: userId } = await authenticateUser();
  await db.card.create({
    data: { title, listId, boardId, userId, position: 0 },
  });
  revalidatePath(`/boardsv2/${boardId}`);
}
