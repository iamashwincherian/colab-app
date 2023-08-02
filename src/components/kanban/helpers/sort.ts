import { CardProp } from "../types";

const sort = (items: CardProp[] = []): CardProp[] => {
  return items.sort(
    (a: CardProp, b: CardProp) => (a?.position ?? 0) - (b?.position ?? 0)
  );
};

export const sortCards = sort;
export const sortList = sort;
