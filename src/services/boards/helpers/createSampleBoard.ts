import { Card, List } from "@prisma/client";
import { db } from "@/server/db";

type SampleBoardType = Pick<List, "name"> & {
  cards?: Pick<Card, "title">[];
};

const sampleData: SampleBoardType[] = [
  {
    name: "Todo",
    cards: [
      { title: "Create a new card" },
      { title: "Share a board with others" },
    ],
  },
  {
    name: "In Progress",
    cards: [{ title: "Create a new board" }],
  },
  {
    name: "Done",
    cards: [{ title: "Create a Colab account" }],
  },
];

export default async function createSampleBoardData(
  boardId: number,
  userId: string
) {
  const allPromises = await Promise.all(
    sampleData.map(async (list, index) => {
      const newList = await db.list.create({
        data: { name: list.name, position: index, userId, boardId },
      });

      if (list.cards?.length) {
        await db.card.createMany({
          data: [
            ...list.cards.map((card, position) => ({
              title: card.title,
              listId: newList.id,
              position,
              userId,
              boardId,
            })),
          ],
        });
      }
    })
  );
}
