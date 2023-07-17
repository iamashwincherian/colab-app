"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";

type BoardProps = {
  list: ListProp[];
  cards: CardProp[];
  onChange: Function;
};

export default function KanbanBoard(props: BoardProps) {
  const { list: defaultList, cards: defaultCards, onChange } = props;
  const { list, cards, onDragEnd } = useKanbanBoard(defaultList, defaultCards);

  const handleChange = (payload: DropResult) => {
    const result = onDragEnd(payload);
    onChange(result);
  };

  return (
    <DragDropContext onDragEnd={handleChange}>
      <div className="flex dark:text-white items-start">
        {list.length &&
          list.map(({ id, title }: ListProp) => {
            const cardsInTheListItem = cards.filter(
              (card) => card.listId === id
            );
            return (
              <List id={id} key={id} title={title} cards={cardsInTheListItem} />
            );
          })}
      </div>
    </DragDropContext>
  );
}
