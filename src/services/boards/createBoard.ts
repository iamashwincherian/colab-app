"use server";

import { db } from "@/server/db";
import { authenticateUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";

const SAMPLE_LIST_NAME = "Sample List";
const SAMPLE_CARD_NAME = "Sample Card";

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
    await db.list.create({
      data: {
        name: SAMPLE_LIST_NAME,
        position: 0,
        boardId: newBoard.id,
        userId,
        cards: {
          create: {
            title: SAMPLE_CARD_NAME,
            boardId: newBoard.id,
            position: 0,
            userId,
          },
        },
      },
    });
  }

  revalidatePath(`/boards`);
}
