"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { sortList } from "./helpers/sort";
import { Board, List as ListType } from "@/types/board";
import onDragEnd, { DropResultType } from "@/services/boards/onDragEnd";
import List from "./List";
import { StrictModeDroppable } from "../droppable/Droppable";

type KanbanBoardProps = {
  board: Board;
};

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const { id: boardId, lists = [] } = board;
  const sortedList = sortList(lists) as ListType[];

  const handleDragEnd = (payload: DropResult) => {
    onDragEnd(boardId, payload as DropResultType, sortedList);
  };

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex dark:text-white items-start">
          <StrictModeDroppable
            droppableId="lists"
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-x-3 h-full"
              >
                {sortedList.map(({ id, name, cards }: any, index: number) => {
                  return (
                    <List
                      id={id}
                      key={id}
                      name={name}
                      index={index}
                      boardId={boardId}
                      cards={cards}
                    />
                  );
                })}
              </ol>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
    </div>
  );
}
