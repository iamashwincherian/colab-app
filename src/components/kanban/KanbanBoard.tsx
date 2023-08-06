"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { BoardProp, ListProp, CardProp } from "./types";
import { useBoardContext } from "../../contexts/BoardContext";
import { sortList } from "./helpers/sort";

type KanbanBoardProps = {
  board: BoardProp;
  list: ListProp[];
  cards: CardProp[];
};

export default function KanbanBoard(props: KanbanBoardProps) {
  const { createList, editList, createCard } = useBoardContext();

  const { list: defaultList, cards: defaultCards } = props;
  let { list, cards, onDragEnd, updateList } = useKanbanBoard(
    defaultList,
    defaultCards
  );
  const sortedList = (sortList(list) as ListProp[]) || [];

  useEffect(() => {
    updateList(defaultList);
  }, [defaultList]);

  if (!props.board) return <></>;
  const {
    board: { id: boardId },
  } = props;

  const handleOnChange = async (result: DropResult) => {
    await onDragEnd(boardId, result);
  };

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={handleOnChange}>
        <div className="flex dark:text-white items-start">
          {sortedList &&
            (sortedList?.length
              ? sortedList.map(({ id, name }: any) => {
                  const cardsInTheListItem = cards.filter(
                    (card) => card?.listId === id
                  );
                  return (
                    <List
                      id={id}
                      key={id}
                      name={name}
                      boardId={boardId}
                      cards={cardsInTheListItem}
                      onEdit={editList}
                      onCardCreate={createCard}
                    />
                  );
                })
              : null)}
        </div>
      </DragDropContext>
    </div>
  );
}
