"use client";

import BoardNameEditor from "../../components/input/boardNameEditor/BoardNameEditor";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import FullScreenLayout from "../../components/layouts/FullScreenLayout";
import useBoard from "./hooks/useBoard.hook";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";

const Boards = () => {
  const { list, cards, onChange } = useBoard();
  const [message, setMessage] = useState("");
  const response = trpc.hello.useQuery().data;

  useEffect(() => {
    if (!response) return;
    setMessage(response.message);
  }, [response]);

  return (
    <FullScreenLayout nav>
      <div className="p-10 pt-6">
        <p className="dark:text-white">{message}</p>
        <BoardNameEditor />
        <div className="mt-8">
          <KanbanBoard list={list} cards={cards} onChange={onChange} />
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default trpc.withTRPC(Boards);
