"use client";

import {
  BreadCrumbs,
  BreadCrumbItem,
} from "../../../components/breadCrumbs/BreadCrumbs";
import KanbanBoard from "../../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import useBoard from "./hooks/useBoard.hook";
import withAuth from "../../../utils/withAuth";
import { FC } from "react";
import { Button } from "@components/ui/button";
import BoardNameEditor from "@components/input/boardNameEditor/BoardNameEditor";
import openModal from "@utils/openModal";
import CreateListModal from "@components/kanban/modals/CreateListModal";
import { useBoardContext } from "@contexts/BoardContext";
import Loading from "@components/loading/Loading";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";

type BoardProps = {
  params: { boardId: string };
};

const Board = (props: BoardProps) => {
  const {
    params: { boardId },
  } = props;
  const { board, list, cards } = useBoard(boardId);
  const { createList } = useBoardContext();

  const breadCrumbs = (
    <BreadCrumbs>
      <BreadCrumbItem text="Boards" link="/boards" />
      <BreadCrumbItem text={board?.name} />
    </BreadCrumbs>
  );

  const createNewListButton = (boardId: number) => {
    if (!boardId) return;
    return (
      <Button
        onClick={() =>
          openModal(
            <CreateListModal
              onSubmit={({ name }: { name: string }) =>
                createList({ boardId, name })
              }
            />
          )
        }
      >
        <PlusIcon className="mr-2" />
        Create New
      </Button>
    );
  };

  const openSettings = () => {};

  if (!board) return <Loading />;

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <div className="flex justify-between items-center">
          <BoardNameEditor name={board.name} />
          <div className="flex justify-center gap-2">
            {createNewListButton(board.id)}
            <Button
              onClick={openSettings}
              variant="outline"
              className="w-9 h-9 px-2"
            >
              <GearIcon />
            </Button>
          </div>
        </div>
        {breadCrumbs}
        <div className="mt-4">
          <KanbanBoard board={board} list={list} cards={cards} />
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default withAuth(Board) as FC;
