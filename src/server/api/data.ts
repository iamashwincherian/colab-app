import { publicProcedure, router } from "../trpc";

const list = [
  { id: "0", title: "Todo", position: 0 },
  { id: "1", title: "In progress", position: 1 },
  { id: "2", title: "Done", position: 2 },
];

const cards = [
  { id: "0", text: "Fix authentication", position: 0, listId: "0" },
  { id: "1", text: "Create user profile page", position: 1, listId: "0" },
  { id: "2", text: "Create a repo", position: 0, listId: "1" },
  {
    id: "3",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    position: 0,
    listId: "2",
  },
];

const dataRoutes = router({
  list: publicProcedure.query(() => list),
  cards: publicProcedure.query(() => cards),
});

export default dataRoutes;
