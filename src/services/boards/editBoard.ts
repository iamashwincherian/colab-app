"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

interface EditBoardProps {
  name: string;
  boardId: number;
}

export default async function editBoard({ boardId, name }: EditBoardProps) {
  const user = await authenticateUser();
  await db.board.update({ where: { id: boardId, user }, data: { name } });
  revalidatePath(`/boards/${boardId}`);
}
