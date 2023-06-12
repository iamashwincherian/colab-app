const data = {
  list: {
    "list-todo": {
      id: "list-todo",
      text: "Todo",
      cardIds: ["card-0", "card-1"],
    },
    "list-inprogress": {
      id: "list-inprogress",
      text: "In progress",
      cardIds: ["card-3"],
    },
    "list-done": {
      id: "list-done",
      text: "Done",
      cardIds: ["card-2"],
    },
  },
  cards: {
    "card-0": {
      id: "card-0",
      text: "Fix authentication",
    },
    "card-1": {
      id: "card-1",
      text: "Create user profile page",
    },
    "card-2": {
      id: "card-2",
      text: "Create a repo",
    },
    "card-3": {
      id: "card-3",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  },
  listOrder: ["list-todo", "list-inprogress", "list-done"],
};

export default data;
