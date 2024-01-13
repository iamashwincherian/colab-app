"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";
import createSampleBoardData from "./helpers/createSampleBoard";

interface CreateBoardProps {
  name: string;
  createSample: boolean;
}

export default async function createBoard({
  name,
  createSample = false,
}: CreateBoardProps) {
  const { id: userId } = await authenticateUser();
  const newBoard = await db.board.create({
    data: { name, userId },
  });

  if (createSample) {
    createSampleBoardData(newBoard.id, userId);
  }

  revalidatePath(`/boards`);
}
