"use client";

import BoardNameEditor from "../../../components/input/boardNameEditor/BoardNameEditor";
import KanbanBoard from "../../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import { trpc } from "../../../utils/trpc/trpc";
import useBoard from "../hooks/useBoard.hook";

type BoardProps = {
  params: { boardId: string };
};

const Board = (props: BoardProps) => {
  const {
    params: { boardId },
  } = props;

  const { cards, list, onChange } = useBoard(boardId);

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <BoardNameEditor boardId={boardId} />
        <div className="mt-8">
          <KanbanBoard list={list} cards={cards} onChange={onChange} />
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default trpc.withTRPC(Board);
