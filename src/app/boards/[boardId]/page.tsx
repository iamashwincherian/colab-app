"use client";

import {
  BreadCrumbs,
  BreadCrumbItem,
} from "../../../components/breadCrumbs/BreadCrumbs";
import KanbanBoard from "../../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import useBoard from "./hooks/useBoard.hook";
import withAuth from "../../../utils/withAuth";

type BoardProps = {
  params: { boardId: string };
};

const Board = (props: BoardProps) => {
  const {
    params: { boardId },
  } = props;
  const { board, list, cards } = useBoard(boardId);

  const breadCrumbs = (
    <BreadCrumbs>
      <BreadCrumbItem text="Boards" link="/boards" />
      <BreadCrumbItem text={board?.name} />
    </BreadCrumbs>
  );

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        {board && breadCrumbs}
        <div className="mt-4">
          {board && <KanbanBoard board={board} list={list} cards={cards} />}
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default withAuth(Board);
