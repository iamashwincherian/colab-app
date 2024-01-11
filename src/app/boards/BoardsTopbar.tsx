"use client";

import React from "react";

import MainContent from "@/components/layoutWrapper/MainContent";
import CreateBoardModal from "@/components/kanban/modals/CreateBoardModal";
import openModal from "@/utils/openModal";
import createBoard from "@/services/boards/createBoard";
import { useToast } from "@/components/ui/toast/use-toast";

interface BoardsTopbarProps {
  children: React.ReactNode;
}

export default function BoardsTopbar({ children }: BoardsTopbarProps) {
  const { toast } = useToast();

  const handleCreateBoard = () => {
    openModal(
      <CreateBoardModal
        onSubmit={(payload: any) =>
          createBoard(payload).then(() =>
            toast({ description: "Created new board successfully!" })
          )
        }
      />
    );
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
