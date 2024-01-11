"use client";

import React from "react";

import MainContent from "@/components/layoutWrapper/MainContent";
import CreateBoardModal from "@/components/kanban/modals/CreateBoardModal";
import openModal from "@/utils/openModal";
import createBoard from "@/services/boards/createBoard";

interface BoardsTopbarProps {
  children: React.ReactNode;
}

export default function BoardsTopbar({ children }: BoardsTopbarProps) {
  const handleCreateBoard = () => {
    openModal(<CreateBoardModal onSubmit={createBoard} />);
  };

  return (
    <MainContent
      title="Boards"
      buttons={[{ label: "Create", onClick: handleCreateBoard }]}
    >
      {children}
    </MainContent>
  );
}
