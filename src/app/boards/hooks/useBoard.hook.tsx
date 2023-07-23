import { trpc } from "../../../utils/trpc/trpc";
import { CardProp, ListProp } from "../../../components/kanban/types";

export default function useBoard(boardId: string) {
  const query = trpc.lists.all.useQuery({
    boardId: parseInt(boardId),
    includeCards: true,
  });

  const list: ListProp = query.data || [];
  const cards: CardProp = query.data?.flatMap((list) => list.cards) || [];

  const onChange = (result: any) => {};

  return { list, cards, onChange };
}
