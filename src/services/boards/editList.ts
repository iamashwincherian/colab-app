"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

interface EditListProps {
  name: string;
  listId: number;
}

export default async function editList({ name, listId }: EditListProps) {
  const list = await db.list.findFirst({ where: { id: listId } });
  if (!list) return;

  await db.list.update({ where: { id: listId }, data: { name } });
  revalidatePath(`/boards/${list.boardId}`);
}
