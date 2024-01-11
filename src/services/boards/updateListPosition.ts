"use server";

import { db } from "@/server/db";
import { List as ListWithCardsType } from "@/types/board";
import { List } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateListPosition(
  list: ListWithCardsType[],
  boardId: number
) {
  for (const listItem of list) {
    delete listItem.cards;
    await db.list.update({
      where: { id: listItem.id },
      data: { ...(listItem as List) },
    });
  }
  revalidatePath(`/boards/${boardId}`);
}
