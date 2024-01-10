import { db } from "@/server/db";
import { getCurrentUser } from "@/utils/getUser";
import { Board } from "@/types/board";

export default async function getBoardData(boardId: string) {
  const user = await getCurrentUser();
  if (!user) return;

  const boardIdAsNumber = parseInt(boardId);
  const board = await db.board.findUnique({
    where: { id: boardIdAsNumber, userId: user.id },
  });
  const lists = await db.list.findMany({
    where: { boardId: boardIdAsNumber, userId: user.id },
    include: { cards: true },
  });

  return {
    ...board,
    lists,
  } as Board;
}
