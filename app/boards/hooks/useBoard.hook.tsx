// "use client";

import { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";

const BASE_URL = "http://localhost:8000/api";

const SAMPLE_LIST = [
  {
    id: 1,
    created_at: "2023-05-09T00:18:57.213335Z",
    updated_at: "2023-05-09T00:18:57.223829Z",
    name: "List 1",
    board: 1,
  },
  {
    id: 2,
    created_at: "2023-05-09T02:24:39.300675Z",
    updated_at: "2023-05-09T02:24:39.309119Z",
    name: "List 2",
    board: 1,
  },
];

const SAMPLE_CARDS = [
  {
    id: 1,
    created_at: "2023-05-09T00:41:27.231120Z",
    updated_at: "2023-05-09T00:41:27.238708Z",
    name: "Card 1",
    board: 1,
    list: 1,
  },
  {
    id: 2,
    created_at: "2023-05-09T02:24:49.931562Z",
    updated_at: "2023-05-09T02:24:49.933624Z",
    name: "Card 2",
    board: 1,
    list: 2,
  },
  {
    id: 3,
    created_at: "2023-05-09T02:24:54.887248Z",
    updated_at: "2023-05-09T02:24:54.890201Z",
    name: "Card 3",
    board: 1,
    list: 2,
  },
];

export default function useBoard(boardId: string = "1") {
  const { user } = useUserContext();
  const [cards, setCards] = useState({});
  const [list, setLists] = useState({});
  const data = {};

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const list = await fetchList();
    const cards = await fetchCards();
    console.log(list);
    // populateListAndCards(list, cards);
  };

  const fetchList = async () => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => res.json());
    return response;
  };

  const fetchCards = async () => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/cards`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => res.json());
    return response;
  };

  const populateListAndCards = (listProps: [], cardProps: []) => {
    const findCards = (listId: number) => {
      return cardProps
        .filter((cardItem) => cardItem.list === listId)
        .map((cardItem) => cardItem.id);
    };

    const newList: ListProp = {};
    const newListOrder: number[] = [];
    listProps.forEach(({ id, name }: { id: number; name: string }) => {
      newList[id] = {
        id,
        name,
        cardIds: findCards(id),
      };
      newListOrder.push(id);
    });
    setList(newList);
    setListOrder(newListOrder);

    const newCards: CardProp = {};
    cardProps.forEach(({ id, name }: { id: number; name: string }) => {
      newCards[id] = {
        id,
        name,
      };
    });
    setCards(newCards);
  };

  // const fetchData = () => {
  //   fetch(`http://localhost:3000/api/boards/${boardId}/`);
  // };

  return { data };
}
