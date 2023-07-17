"use client";

import { trpc } from "../../../utils/trpc/trpc";
import { CardProp, ListProp } from "../../../components/kanban/types";

export default function useBoard() {
  const [cardsQuery, listQuery] = trpc.useQueries((t) => [
    t.data.cards(),
    t.data.list(),
  ]);
  const cards: CardProp[] = cardsQuery.data || [];
  const list: ListProp[] = listQuery.data || [];

  const onChange = (result: any) => {};

  return { list, cards, onChange };
}
