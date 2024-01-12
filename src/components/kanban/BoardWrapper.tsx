"use client";

import createList from "@/services/boards/createList";
import deleteBoard from "@/services/boards/deleteBoard";
import editBoard from "@/services/boards/editBoard";
import { Board } from "@/types/board";
import openModal from "@/utils/openModal";
import { GearIcon } from "@radix-ui/react-icons";
import React from "react";
import { BreadCrumbItem, BreadCrumbs } from "../breadCrumbs/BreadCrumbs";
import BoardNameEditor from "../input/boardNameEditor/BoardNameEditor";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast/use-toast";
import BoardSettingsModal from "./modals/BoardSettingsModal";
import CreateListModal from "./modals/CreateListModal";

interface BoardWrapperProps {
  children: React.ReactNode;
  board: Board;
}

export default function BoardWrapper({ board, children }: BoardWrapperProps) {
  const { id: boardId, name } = board;
  const { toast } = useToast();

  const handleCreateBoard = () => {
    openModal(
      <CreateListModal
        onSubmit={async ({ name }: { name: string }) =>
          createList({ name, boardId }).then(() =>
            toast({ description: "Created list successfully!" })
          )
        }
      />
    );
  };

  return (
    <div className="flex flex-col py-6 px-8 flex-1">
      <div className="flex justify-between">
        <div className="mb-5">
          <BreadCrumbs>
            <BreadCrumbItem text="Boards" link="/boards" />
            <BreadCrumbItem text={board.name} />
          </BreadCrumbs>
          <BoardNameEditor name={name} boardId={boardId} />
          <p className="mt-2 text-gray-500 dark:text-zinc-500"></p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              openModal(
                <BoardSettingsModal
                  board={board}
                  onSubmit={(payload: any) =>
                    editBoard(payload).then(() =>
                      toast({ description: "Updated board successfully!" })
                    )
                  }
                  onDelete={() =>
                    deleteBoard(board.id).then(() =>
                      toast({ description: "Deleted board successfully!" })
                    )
                  }
                />
              )
            }
            variant="outline"
            className="w-9 h-9 px-2"
          >
            <GearIcon />
          </Button>
          <Button variant="default" onClick={handleCreateBoard}>
            Create
          </Button>
        </div>
      </div>

      {children}
    </div>
  );
}
