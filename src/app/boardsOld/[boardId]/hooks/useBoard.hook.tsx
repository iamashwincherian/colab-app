import { useEffect } from "react";

import { trpc } from "../../../../utils/trpc/trpc";
import { useBoardContext } from "../../../../contexts/BoardContext";

const useBoard = (boardId: string) => {
  let boardIdAsNumber = parseInt(boardId);
  const boardQuery = trpc.boards.find.useQuery({ id: boardIdAsNumber });
  const listQuery = trpc.lists.all.useQuery({
    boardId: boardIdAsNumber,
    includeCards: true,
  });

  const { board, cards, list, setBoard } = useBoardContext();

  useEffect(() => {
    if (boardQuery.isFetched) {
      if (boardId) setData();
    }
  }, [boardQuery.isFetched]);

  const setData = () => {
    if (!boardId) return;

    setBoard({
      board: boardQuery.data || null,
      cards: listQuery.data?.flatMap((list) => list.cards) || [],
      list: listQuery.data || [],
    });
  };

  return { board, list, cards };
};

export default useBoard;
