export type CardProp = {
  id: string;
  text: string;
  position: number;
  listId: ListProp["id"];
};

export type ListProp = {
  id: string;
  title: string;
  position: number;
};
