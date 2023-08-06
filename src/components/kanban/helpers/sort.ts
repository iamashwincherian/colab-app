import { CardProp, ListProp } from "../types";

const sort = (items: CardProp[] | ListProp[] = []) => {
  return items.sort(
    (a: CardProp | ListProp, b: CardProp | ListProp) =>
      (a?.position ?? 0) - (b?.position ?? 0)
  );
};

export const sortCards = sort;
export const sortList = sort;
