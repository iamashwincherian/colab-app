"use client";

import createList from "@/services/boards/createList";
import { Board } from "@/types/board";
import openModal from "@/utils/openModal";
import React from "react";
import MainContent from "../layoutWrapper/MainContent";
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
    <MainContent
      title={name}
      buttons={[{ label: "Create", onClick: handleCreateBoard }]}
    >
      {children}
    </MainContent>
  );
}
