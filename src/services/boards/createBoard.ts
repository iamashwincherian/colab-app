"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

export default async function createBoard({ name }: { name: string }) {
  const { id: userId } = await authenticateUser();
  await db.board.create({
    data: { name, userId },
  });
  revalidatePath(`/boards`);
}
