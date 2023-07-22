"use client";

import BoardNameEditor from "../../components/input/boardNameEditor/BoardNameEditor";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import useBoard from "./hooks/useBoard.hook";
import { trpc } from "../../utils/trpc/trpc";

const Boards = () => {
  const boardId = 1;
  const { list, cards, onChange } = useBoard(boardId);

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <BoardNameEditor />
        <div className="mt-8">
          <KanbanBoard list={list} cards={cards} onChange={onChange} />
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default trpc.withTRPC(Boards);
