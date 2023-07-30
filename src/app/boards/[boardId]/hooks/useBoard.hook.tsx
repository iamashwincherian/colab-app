import { useEffect, useState } from "react";

import { trpc } from "../../../../utils/trpc/trpc";
import {
  BoardProp,
  CardProp,
  ListProp,
} from "../../../../components/kanban/types";
import { useBoardContext } from "../../../../contexts/BoardContext";

export default function useBoard(boardId: string | undefined) {
  const boardIdAsNumber = parseInt(boardId || "1");
  const boardQuery = trpc.boards.find.useQuery({ id: boardIdAsNumber });
  const listQuery = trpc.lists.all.useQuery({
    boardId: boardIdAsNumber,
    includeCards: true,
  });

  const [list, setList] = useState<ListProp>(boardQuery.data || []);
  const [cards, setCards] = useState<CardProp>(
    listQuery.data?.flatMap((list) => list.cards) || []
  );
  const [board, setBoardData] = useState<BoardProp | {}>({});
  const { setBoard } = useBoardContext();

  useEffect(() => {
    if (boardId) fetchData();
  }, [boardQuery.isFetched]);

  const fetchData = () => {
    if (!boardId) return;

    setList(listQuery.data || []);
    setCards(listQuery.data?.flatMap((list) => list.cards) || []);
    setBoardData(boardQuery.data || {});
    setBoard({
      board: boardQuery.data || {},
      cards: listQuery.data?.flatMap((list) => list.cards) || [],
      list: listQuery.data || [],
    });
  };

  return { board, list, cards };
}
