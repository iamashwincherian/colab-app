import { trpc } from "../../../../utils/trpc/trpc";
import { CardProp, ListProp } from "../../../../components/kanban/types";

export default function useBoard(boardId: string | null) {
  let list: ListProp | [] = [];
  let cards: CardProp | [] = [];
  let board = null;

  if (boardId) {
    const boardIdAsNumber = parseInt(boardId);

    const boardQuery = trpc.boards.find.useQuery({ id: boardIdAsNumber });
    const listQuery = trpc.lists.all.useQuery({
      boardId: boardIdAsNumber,
      includeCards: true,
    });

    list = listQuery.data || [];
    cards = listQuery.data?.flatMap((list) => list.cards) || [];
    board = boardQuery.data;
  }

  const onChange = (result: any) => {};

  return { board, list, cards, onChange };
}
