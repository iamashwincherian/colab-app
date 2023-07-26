"use client";

import {
  BreadCrumbs,
  BreadCrumbItem,
} from "../../../components/breadCrumbs/BreadCrumbs";
import BoardNameEditor from "../../../components/input/boardNameEditor/BoardNameEditor";
import KanbanBoard from "../../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import { trpc } from "../../../utils/trpc/trpc";
import useBoard from "./hooks/useBoard.hook";

type BoardProps = {
  params: { boardId: string };
};

const Board = (props: BoardProps) => {
  const { params: { boardId = null } = { boardId: null } } = props;
  const { board, cards, list, onChange } = useBoard(boardId);

  const breadCrumbs = (
    <BreadCrumbs>
      <BreadCrumbItem text="Boards" link="/boards" />
      {board ? <BreadCrumbItem text={board?.name} /> : null}
    </BreadCrumbs>
  );

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        {breadCrumbs}
        <BoardNameEditor name={board?.name} />
        <div className="mt-8">
          {board?.id && (
            <KanbanBoard
              boardId={board.id}
              list={list}
              cards={cards}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default trpc.withTRPC(Board);
