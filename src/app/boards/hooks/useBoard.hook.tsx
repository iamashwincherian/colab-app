"use client";

import { trpc } from "../../../utils/trpc/trpc";
import type { inferRouterOutputs } from "@trpc/server";
import { CardProp, ListProp } from "../../../components/kanban/types";
import { useEffect, useState } from "react";
import type { AppRouter } from "../../../server/routes";

export default function useBoard() {
  const [listQuery, cardsQuery] = trpc.useQueries((t) => [
    t.data.list(),
    t.data.cards(),
  ]);

  const list: ListProp = listQuery.data || [];
  const cards: CardProp = cardsQuery.data || [];

  const onChange = (result: any) => {};

  return { list, cards, onChange };
}
