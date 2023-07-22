import { trpc } from "../../../utils/trpc/trpc";
import { CardProp, ListProp } from "../../../components/kanban/types";

export default function useBoard(boardId: number) {
  const query = trpc.lists.all.useQuery({ boardId, includeCards: true });

  const list: ListProp = query.data || [];
  const cards: CardProp = query.data?.flatMap((list) => list.cards) || [];

  const onChange = (result: any) => {};

  return { list, cards, onChange };
}
