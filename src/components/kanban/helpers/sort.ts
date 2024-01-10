import { List, Card } from "@prisma/client";
import { CardProp, ListProp } from "../types";

const sort = (items: Card[] | List[] = []) => {
  return items.sort(
    (a: Card | List, b: Card | List) => (a?.position ?? 0) - (b?.position ?? 0)
  );
};

export const sortCards = sort;
export const sortList = sort;
