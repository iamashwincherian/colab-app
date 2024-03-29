"use client";

import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Board, List as ListType } from "@/types/board";
import onDragEnd, { DropResultType } from "@/services/boards/onDragEnd";
import { StrictModeDroppable } from "../droppable/Droppable";
import { sortList } from "./helpers/sort";
import List from "./List";

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
    <React.Fragment>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex dark:text-white items-start">
          <StrictModeDroppable
            droppableId="lists"
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex h-full"
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
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
      {sortedList.length === 0 && (
        <div className="flex items-center justify-center w-full h-[60vh] text-muted-foreground">
          There are no list/cards. Create one to get started.
        </div>
      )}
    </React.Fragment>
  );
}
