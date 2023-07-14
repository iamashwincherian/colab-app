"use client";

import { useEffect, useState } from "react";
import { data } from "../data";

type CardProp = {
  id: string;
  text: string;
  position: number;
  listId: ListProp["id"];
};

type ListProp = {
  id: string;
  title: string;
  position: number;
};

export default function useBoard() {
  const [list, setList] = useState<ListProp[]>([]);
  const [cards, setCards] = useState<CardProp[]>([]);

  const fetchData = () => {
    setList(data.list);
    setCards(data.cards);
  };

  useEffect(() => fetchData(), []);

  const onChange = (result: any) => {};

  return { list, cards, onChange };
}
