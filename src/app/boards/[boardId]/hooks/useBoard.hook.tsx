import { trpc } from "../../../../utils/trpc/trpc";
import { CardProp, ListProp } from "../../../../components/kanban/types";

export default function useBoard(boardId: string) {
  const boardIdAsNumber = parseInt(boardId);

  const boardQuery = trpc.boards.find.useQuery({ id: boardIdAsNumber });
  const listQuery = trpc.lists.all.useQuery({
    boardId: boardIdAsNumber,
    includeCards: true,
  });

  const list: ListProp = listQuery.data || [];
  const cards: CardProp = listQuery.data?.flatMap((list) => list.cards) || [];
  const board = boardQuery.data;

  const onChange = (result: any) => {};

  return { board, list, cards, onChange };
}
