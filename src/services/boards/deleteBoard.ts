"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function deleteBoard(boardId: number) {
  const user = await authenticateUser();
  await db.board.delete({ where: { id: boardId, user } });
  redirect("/boards");
}
