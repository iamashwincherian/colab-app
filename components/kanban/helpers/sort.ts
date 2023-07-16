import { CardProp } from "../types";

type sortItem = {
  position: number;
  [key: string]: any;
};

const sort = (items: CardProp[]) => {
  return items.sort((a: sortItem, b: sortItem) => a.position - b.position);
};

export const sortCards = sort;
export const sortList = sort;
