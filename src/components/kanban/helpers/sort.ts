import { List } from "@prisma/client";
import { CardProp, ListProp } from "../types";

const sort = (items: CardProp[] | List[] = []) => {
  return items.sort(
    (a: CardProp | List, b: CardProp | List) =>
      (a?.position ?? 0) - (b?.position ?? 0)
  );
};

export const sortCards = sort;
export const sortList = sort;
