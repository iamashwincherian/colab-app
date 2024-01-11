"use client";

import createList from "@/services/boards/createList";
import { Board } from "@/types/board";
import openModal from "@/utils/openModal";
import React from "react";
import BoardNameEditor from "../input/boardNameEditor/BoardNameEditor";
import MainContent from "../layoutWrapper/MainContent";
import { Button } from "../ui/button";
import CreateBoardModal from "./modals/CreateBoardModal";

interface BoardWrapperProps {
  children: React.ReactNode;
  board: Board;
}

export default function BoardWrapper({ board, children }: BoardWrapperProps) {
  const { id: boardId, name } = board;

  const handleCreateBoard = () => {
    openModal(
      <CreateBoardModal
        onSubmit={async ({ name }: { name: string }) =>
          createList({ name, boardId })
        }
      />
    );
  };

  return (
    <div className="flex flex-col py-6 px-8 flex-1">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <BoardNameEditor name={name} boardId={boardId} />
          <p className="mt-2 text-gray-500 dark:text-zinc-500"></p>
        </div>
        <Button variant="default" onClick={handleCreateBoard}>
          Create
        </Button>
      </div>
      {children}
    </div>
  );
}
