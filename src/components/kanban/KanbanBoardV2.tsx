"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { sortList } from "./helpers/sort";
import { Board, List as ListType } from "@/types/board";
import onDragEnd from "@/services/boards/onDragEnd";
import List from "./List";

type KanbanBoardProps = {
  board: Board;
};

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const { id: boardId, lists = [] } = board;
  const sortedList = sortList(lists) as ListType[];

  const handleDragEnd = (payload: DropResult) => {
    onDragEnd(boardId, payload, sortedList);
  };

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex dark:text-white items-start">
          {sortedList.map(({ id, name, cards }: any) => {
            return (
              <List
                id={id}
                key={id}
                name={name}
                boardId={boardId}
                cards={cards}
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
