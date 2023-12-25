"use client";

import { useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import List from "./List";
import useKanbanBoard from "./hooks/useKanbanBoard";
import { ListProp, CardProp } from "./types";
import { useBoardContext } from "../../contexts/BoardContext";
import { sortList } from "./helpers/sort";
import onDragEnd from "./helpers/onDragEnd";

interface BoardProp {
  id: number;
  name: string;
  position: number;
  boardId: number;
  userId: string;
  cards: [object];
}

type KanbanBoardProps = {
  id: string;
  board: BoardProp[];
};

export default function KanbanBoard({ id: boardId, board }: KanbanBoardProps) {
  // const { createList, editList, createCard } = useBoardContext();

  // const { list: defaultList, cards: defaultCards } = props;
  // let { list, cards, onDragEnd, updateList } = useKanbanBoard(
  //   defaultList,
  //   defaultCards
  // );

  const sortedList = (sortList(board) as ListProp[]) || [];

  // useEffect(() => {
  //   updateList(defaultList);
  // }, [defaultList]);

  // if (!props.board) return <></>;
  // const {
  //   board: { id: boardId },
  // } = props;

  // const handleOnChange = async (result: DropResult) => {
  //   await onDragEnd(boardId, result);
  // };

  // return (
  //   <div className="mt-8">
  //     <DragDropContext onDragEnd={handleOnChange}>
  //       <div className="flex dark:text-white items-start">
  //         {sortedList &&
  //           (sortedList?.length
  //             ? sortedList.map(({ id, name }: any) => {
  //                 const cardsInTheListItem = cards.filter(
  //                   (card) => card?.listId === id
  //                 );
  //                 return (
  //                   <List
  //                     id={id}
  //                     key={id}
  //                     name={name}
  //                     boardId={boardId}
  //                     cards={cardsInTheListItem}
  //                     onEdit={editList}
  //                     onCardCreate={createCard}
  //                   />
  //                 );
  //               })
  //             : null)}
  //       </div>
  //     </DragDropContext>
  //   </div>
  // );

  const handleDragEnd = (payload: DropResult) => {
    // onDragEnd(boardId, payload, sortedList);
  };

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex dark:text-white items-start">
          {sortedList.map(({ id, name, cards }: any) => {
            const cardsInTheListItem = cards.filter(
              (card: any) => card?.listId === id
            );
            return (
              <List
                id={id}
                key={id}
                name={name}
                boardId={boardId}
                cards={cardsInTheListItem}
                onEdit={() => {}}
                onCardCreate={() => {}}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
