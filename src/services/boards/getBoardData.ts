import { db } from "@/server/db";
import { getCurrentUser } from "@/utils/getUser";

export default async function getBoardData(boardId: string) {
  const user = await getCurrentUser();
  if (!user) return;

  const boardIdInNumber = parseInt(boardId);
  const lists = db.list.findMany({
    where: { boardId: boardIdInNumber, userId: user.id },
    include: { cards: true },
  });

  return lists;
}
