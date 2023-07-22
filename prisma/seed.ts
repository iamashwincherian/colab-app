import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = {
  user: {
    name: "Admin",
    email: "admin@colab.com",
    board: {
      name: "Getting Started",
      lists: [
        {
          name: "Todo",
          position: 0,
          cards: [
            { title: "Fix Authentication", position: 0 },
            { title: "Create user profile page", position: 1 },
          ],
        },
        {
          name: "In Progress",
          position: 1,
          cards: [{ title: "Create a repo", position: 0 }],
        },
        {
          name: "Done",
          position: 2,
          cards: [
            {
              position: 0,
              title:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            },
          ],
        },
      ],
    },
  },
};

async function main() {
  const {
    user,
    user: {
      board,
      board: { lists },
    },
  } = data;

  const {
    id: userId,
    Board: [{ id: boardId }],
  } = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      Board: {
        create: {
          name: board.name,
        },
      },
    },
    select: {
      id: true,
      Board: true,
    },
  });

  await prisma.list.createMany({
    data: lists.map(({ name, position }) => ({
      name,
      position,
      userId,
      boardId,
    })),
  });

  const newLists = await prisma.list.findMany();
  for (const index in newLists) {
    const list = newLists[index];
    const cards = lists.find(({ name }) => name === list.name)?.cards;
    if (!cards) continue;

    await prisma.card.createMany({
      data: cards.map(({ title, position }) => ({
        title,
        position,
        userId,
        boardId,
        listId: list.id,
      })),
    });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error("error", e);
    prisma.$disconnect();
    process.exit(1);
  });
